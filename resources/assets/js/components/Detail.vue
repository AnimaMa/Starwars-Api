<template>

    <div>

        <!--<div class="notification is-danger" v-if="error" v-for="error in errorMessage">-->
        <div class="notification is-danger">
            <p v-text="errorMessage"></p>
        </div>

        <div class="flex">


            <div class="box prop">
                <h1 class="h2">Detail</h1>
                <div>
                    <div class="loading" v-if="loading">
                        <img src="img/load.gif" alt="">
                    </div>

                    <div v-if="errorLoad">
                        <img src="img/tenor.gif" alt="">
                    </div>
                </div>

                <div class="row bold " v-for="prop in properties">

                    <span v-text="prop" class="highlight"></span> :

                    <div v-if=" Array.isArray(data[prop])">
                    <span v-for="url in data[prop]">
                        |
                        <router-link :to="detailUrl(getCategoryFromUrl(url), getValueFromUrl(url))"
                                     v-text="getValueFromUrl(url)">
                        </router-link>
                    </span>
                    </div>

                    <div v-else-if="typeof data[prop] === 'string' && data[prop].includes('https')">
                        <a :href="data[prop]" v-text="data[prop].slice(-2, -1)"></a>
                    </div>

                    <div v-else>
                        <span v-text="data[prop]"></span>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import VueHeader from './VueHeader.vue';


    export default {
        components: {
            VueHeader
        },
        name: 'Detail',

        data() {
            return {
                error: false,
                errorMessage: '',
                properties: [],
                noArrayData: [],
                forbiddenProperties: ['created', 'edited', 'url'],
                category: this.$route.params.category,
                value: this.$route.params.id,
                data: '',
                errorDetail: '',
                loading: false,
                errorLoad: false,
                people: [],
                valueWithoutSpaces: '',
                startUrlApi: 'https://swapi.co/api/',
                regexOnlyNumbers: '^[0-9]+$',
                endOfUrlOfUrl: '',
                name: '',
                url: '',
                neededUrl: '',
                replacementOfSpace: '%20',
                valueIsId: false
            }
        },

        watch: {
            '$route'(to, from) {
                this.category = this.$route.params.category;
                this.value = this.$route.params.id;
                this.getData();
            }
        },

        computed: {

            urlApi: function () {
                console.log('URLAPI');


                if (this.category && this.value) {
                    this.error = false;

                    if (!this.value.match(this.regexOnlyNumbers)) {
                        console.log('VALUE IS NOT NUMBER');

                        if (this.value.indexOf(' ') >= 0) {
                            this.valueWithoutSpaces = this.value.split(' ').join(this.replacementOfSpace);
                            console.log('space' );

                        } else {
                            this.valueWithoutSpaces = this.value;

                        }

                        this.endOfUrl = this.category + '/?search=' + this.valueWithoutSpaces;

                        console.log('URLAPI IF IS NOT ID:  ' + this.startUrlApi + this.endOfUrl);
                        // return this.startUrlApi + this.endOfUrl;
                        // this.getData(this.startUrlApi + this.endOfUrl);
                    } else {
                        console.log('value is number');

                        this.endOfUrl = this.category + '/' + this.value;
                        console.log('URL WITH ID: ' + this.startUrlApi + this.endOfUrl);
                        return this.startUrlApi + this.endOfUrl;
                    }

                } else {
                   return this.errorMessage = 'vyplnte udaje';
                }
            },

        },

        created() {
            this.getData();
        },

        methods: {

            errorHandle(detail) {
                this.error = true;

                if (detail === 'Not found') {
                    this.errorMessage = ' Adresa nebola nájdená';
                    this.properties = [];
                } else if (detail === 'urlapi') {
                    this.errorMessage = ' ';
                }

            },

            detailUrl(category, id) {
                return '/' + category + '/' + id;
            },

            getValueFromUrl(url) {
                console.log( 'id ' + this.valueIsId);
                if (this.value.match(this.regexOnlyNumbers)) {
                    let urlWithoutSlash = url.substring(0, url.length - 1);
                    this.valueIsId = true;
                    return urlWithoutSlash.substring(urlWithoutSlash.lastIndexOf('/') + 1);
                }
            },

            getCategoryFromUrl(url) {
                if (this.value.match(this.regexOnlyNumbers)) {
                    console.log('getcat');
                    let splitUrl = url.split('/');
                    return splitUrl[4];
                }
            },

            getData(url) {
                console.log(this.urlApi);

                console.log('SME V GET');
                console.log(url);
                console.log('val ' + this.value);
                if (this.valueIsId) {
                    if (this.category && this.value) {
                        console.log(this.value + ' value');
                        console.log('GEEEEEEEEEET Id');
                        this.loading = true;
                        axios.get(this.urlApi)
                            .then((response) => {
                                this.loading = false;
                                console.log(response);
                                console.log('set');

                                this.error = false;
                                this.data = response.data;
                                this.setProperties();
                            })
                            .catch((error) => {
                                this.loading = false;
                                this.errorLoad = true;

                                if (error.response.data.detail) {
                                    this.errorDetail = error.response.data.detail;
                                    this.errorHandle(this.errorDetail);
                                }

                            });
                    } else {
                        this.erro = true;
                        this.errorMessage = 'error v getData';
                        return;
                    }


                } else {
                    console.log(url);
                    console.log('MAME URL ' + url);
                    axios.get(url)
                        .then((response) => {
                            console.log(response);
                            this.loading = false;
                            this.error = false;
                            this.data = response.data.results;
                            this.neededUrl = response.data.results[0]['url'];
                            this.getData(this.neededUrl);
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.errorLoad = true;
                            this.errorMessage = 'errorisko';

                            // if (error.response.data.detail) {
                            //     this.errorDetail = error.response.data.detail;
                            //     this.errorHandle(this.errorDetail);
                            // }

                        });

                }

                // {{--<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=2.0, initial-scale=1.0">--}}

            },

            setProperties() {
                this.properties = [];
                for (let property in this.data) {
                    if (this.data.hasOwnProperty(property)) {
                        if (!this.forbiddenProperties.includes(property)) {
                            this.properties.push(property);
                        }
                    }
                }
            }

        }
    }


</script>