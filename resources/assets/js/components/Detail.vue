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
                onlyNum: '^[0-9]*$'
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
                console.log(this.category);
                console.log(this.value);
                console.log('urlappi');

                if (this.category && this.value) {

                    let end;
                    this.error = false;
                    console.log(typeof this.value);

                    if ( ! this.value.match(this.onlyNum)) {
                        console.log('value is not number');

                        if (this.value.indexOf(' ') >= 0) {
                            console.log('space');
                            this.valueWithoutSpaces = this.value.split(' ').join('%');
                        }
                        console.log('this.valueWithoutSpaces ' + this.valueWithoutSpaces);
                        let end = this.category + '/?' + this.valueWithoutSpaces;
                        console.log(this.startUrlApi + end);
                        this.getData(this.startUrlApi + end);
                        console.log('hore');
                        return this.startUrlApi + end;

                    } else {
                        let end = this.category + '/' + this.value;
                        console.log(this.startUrlApi + end);
                        console.log('url id');
                        return this.startUrlApi + end;
                    }

                } else {
                    this.errorMessage = 'vyplnte udaje';
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
                console.log(url + "VAL");

                let urlWithoutSlash = url.substring(0, url.length - 1);
                console.log('URL' + urlWithoutSlash);
                return urlWithoutSlash.substring(urlWithoutSlash.lastIndexOf('/') + 1);

            },

            getCategoryFromUrl(url) {
                console.log(url  );
                let splitUrl = url.split('/');
                return splitUrl[4];
            },

            getData(url) {


                console.log('detail data');
                console.log('DATAURL' + url);
                // console.log(this.urlApi + 'APII');s
                console.log('detail data');
                console.log('CATEGORY' + this.category);
                // console.log(' APIURL' + this.urlApi);

                if(url){

                    console.log('MAME URL');
                } else {


                    if (this.category && this.value) {
                        console.log(this.value + ' value');
                        console.log('GEEEEEEEEEET');
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
                }


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