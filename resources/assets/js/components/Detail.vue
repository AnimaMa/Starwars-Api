<template>

    <div class="flex">
        <div class="box prop">
            <h1 class="h2">Detail</h1>
            <div class="row bold " v-for="prop in properties"  >
                <span v-text="prop"></span>: <span v-text="data[prop]"></span>
            </div>
        </div>

        <!--<div class="box">-->
            <!--<div class="row" v-for="da in noArrayData">-->
                <!--<span v-text="da"></span>-->

            <!--</div>-->

            <!--<div class="row">-->
                <!--<div v-for="home in data.data_homeworld">-->
                    <!--<span v-text="home.name"></span>,-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="row">-->
                <!--<div v-for="film in data.data_films">-->
                    <!--<span v-text="film.title"></span>,-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="row">-->
                <!--<div v-for="speci in data.data_species">-->
                    <!--<span v-text="speci.name"></span>,-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="row" v-for="vehi in data.data_vehicles">-->
                <!--<span  v-text="vehi.name"></span>,-->
            <!--</div>-->

            <!--<span>{{id}}</span>-->
            <!--<span>{{category}}</span>-->

        <!--</div>-->


    </div>

</template>

<script>
    import $ from 'jquery';

    export default {
        name: 'Detail',
        props:
            ['inputIdValue', 'inputCategoryValue'],

        data() {
            return {
                error: false,
                errorMessage: [],
                properties: [],
                noArrayData: [],

                // inputCategoryValue: '',
                // inputIdValue: '',
                data: '',
            }
        },

        computed: {
            urlApi() {
                const startUrlApi = 'https://swapi.co/api/';

                if (this.inputCategoryValue && this.inputIdValue) {

                    let end = this.inputCategoryValue + '/' + this.inputIdValue;
                    let wholeUrl = startUrlApi + end;
                    return wholeUrl;
                } else {
                    this.error = true;
                    return this.errorMessage = 'Skontrolujte, ci ste zadali vsetky udaje.'
                }

            },

        },

        created() {
            this.getData();
        },

        methods: {

            getData(url) {

                axios.get(this.urlApi)
                    .then((response) => {
                        console.log('getcategory');

                        this.data = response.data;

                        this.setPropertiesFromObject();

                        this.error = false;

                    });
                // })
                // .catch( function (error) {
                //     console.log('nieco je zle');
                //     console.log(error);
                // });
            },
            getDataFromArray(url, property) {
                axios.get(url)
                    .then((response) => {

                        let destination = 'data_' + property;

                        if (this.data[destination] === undefined) {
                            this.$set(this.data, destination, []);
                        }

                        this.data[destination].push(response.data);
                        console.log(this.data);
                    })
            },
            //
            // clearData() {
            //     this.table = false;
            //     this.properties = [];
            //     this.noArrayData = [];
            // },



            setPropertiesFromObject() {
                for (let property in this.data) {

                    if (this.data.hasOwnProperty(property)) {

                        if (!(property === 'created') && !(property === 'edited') && !(property === 'url')) {

                            let regexHttp = /^(http).*/;
                            let prop = this.data[property];
                            let propertyIsArray = Array.isArray(prop);

                            if (!propertyIsArray && !prop.match(regexHttp)) {
                                this.properties.push(property);
                            }

                        }


                    }
                }
            }

    }
    }


</script>