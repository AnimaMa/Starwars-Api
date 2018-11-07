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
                        <router-link :to="detailUrl(getCategoryFromUrl(url), getIdFromUrl(url))"
                                     v-text="getIdFromUrl(url)">
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
                categoryValue: this.$route.params.category,
                idValue: this.$route.params.id,
                data: '',
                errorDetail: '',
                loading: false,
                errorLoad: false,
                people: []
            }
        },

        watch: {
            '$route'(to, from) {
                this.categoryValue = this.$route.params.category;
                this.idValue = this.$route.params.id;
                this.getData();
            }
        },

        computed: {



            urlApi: function () {
                const startUrlApi = 'https://swapi.co/api/';

                if (this.categoryValue && this.idValue) {
                    this.error = false;
                    let end = this.categoryValue + '/' + this.idValue;
                    return startUrlApi + end;
                } else {
                    this.errorMessage = 'vyplnte udaje';
                }
            },

        },

        created() {
            this.getData();
            this.getNames();

        },

        methods: {


            getNames() {
                let url = 'https://swapi.co/api/people/';
                axios.get(url)
                    .then((response) => {
                        let results = response.data.results;
                        console.log(results);


                        for(let pro  in results) {
                            this.people.push(results[pro].name);
                            console.log(this.people);

                            console.log(results[pro].name);


                            if (results.hasOwnProperty(pro )) {
                                console.log(pro.name);
                            }
                        }


                    })
                    .catch((error) => {


                    });

            },


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

            getIdFromUrl(url) {
                let urlWithoutSlash = url.substring(0, url.length - 1);
                return urlWithoutSlash.substring(urlWithoutSlash.lastIndexOf('/') + 1);

            },

            getCategoryFromUrl(url) {
                let splitUrl = url.split('/');
                return splitUrl[4];
            },

            getData(url) {

                if (!this.categoryValue && !this.idValue) {
                    return;
                }

                if (this.categoryValue && this.idValue) {
                    this.loading = true;
                    axios.get(this.urlApi)
                        .then((response) => {
                            this.loading = false;

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