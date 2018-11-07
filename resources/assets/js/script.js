import Vue from 'vue';
import VueRouter from 'vue-router';

const axios = require('axios');

import Home from './components/Home.vue';
import Detail from './components/Detail.vue';
import Film from './components/Film.vue';
import VueHeader from './components/VueHeader.vue';

window.Vue = Vue;
window.axios = axios;
Vue.config.debug = true;
Vue.use(VueRouter);
const startUrlApi = 'https://swapi.co/api/';
const routes = [
    {path: '/', component: Home},
    {path: '/:category/:id', component: Detail},


];


const router = new VueRouter({
    routes

});


// const urlForAxios = 'https://swapi.co/api/people/10';




const app = new Vue({

    el: '#app',
    // template: '#app',

    router,


    // data: {
    //
    //     hasShip: false,
    //     inputValue: '',
    //     value: false,
    //     errors: [],
    //     error: false,
    //     inputCategoryValue: 'people',
    //     endOfUrl: '',
    //     inputIdValue: '1',
    //
    //     mainUrl: '',
    //     //do mainurl sa ulozi funkcia z computed!
    //     allData: '',
    //     urlFromCategory: false,
    //     films: [],
    //
    //     myData: '',
    //     myAllData: [],
    //     homeWorld: '',
    //
    //     table: false,
    //
    //     dates: [],
    //
    //     properties: [],
    //     noArrayData: [],
    //
    //     currentRoute: window.location.pathname
    // },
    components: {
        VueHeader: require('./components/VueHeader.vue'),
        Detail: require('./components/Detail.vue'),
        Home: require('./components/Home.vue'),
        Film: require('./components/Film.vue'),
    },

    // computed: {
    //
    //     // ViewComponent(){
    //     //
    //     //     console.log(routes[this.currentRoute]);
    //     //     return routes[this.currentRoute]
    //     // },
    //
    //     //
    //     // mainUrl() {
    //     //     if (this.inputCategoryValue && this.inputIdValue) {
    //     //
    //     //         let end = this.inputCategoryValue + '/' + this.inputIdValue;
    //     //         let wholeUrl = urlApi + end;
    //     //         this.urlFromCategory = false;
    //     //         return wholeUrl;
    //     //     } else {
    //     //         this.error = true;
    //     //         return this.errors = 'Skontrolujte, ci ste zadali vsetky udaje.'
    //     //     }
    //     //
    //     //
    //     // },
    //
    // },

    // render(h) {
    //     return h(this.ViewComponent)
    // },

    // methods: {
    //
    //     getDataFromArray(url, property) {
    //         axios.get(url)
    //             .then((response) => {
    //                 this.table = true;
    //
    //                 let destination = 'data_' + property;
    //
    //                 if (this.allData[destination] === undefined) {
    //                     this.$set(this.allData, destination, []);
    //                 }
    //
    //                 this.allData[destination].push(response.data);
    //                 console.log(this.allData);
    //             })
    //     },
    //     getU(one) {
    //         console.log(one);
    //         this.getCategory(one);
    //
    //         if (one) {
    //             this.mainUrl = one;
    //         }
    //
    //     },
    //
    //     clearData() {
    //         this.table = false;
    //         this.properties = [];
    //         this.noArrayData = [];
    //     },
    //
    //     getCategory(url) {
    //         this.clearData();
    //
    //
    //         axios.get(this.mainUrl)
    //             .then((response) => {
    //                 console.log('getcategory');
    //
    //                 this.allData = response.data;
    //                 // console.log(this.allData);
    //
    //                 for (let property in this.allData) {
    //
    //                     if (this.allData.hasOwnProperty(property)) {
    //
    //                         if (!(property === 'created') && !(property === 'edited') && !(property === 'url')) {
    //                             this.properties.push(property);
    //
    //                             // let regexHttp = /^(?!http).*/;
    //                             let regexHttp = /^(http).*/;
    //                             let prop = this.allData[property];
    //                             let propIsArray = Array.isArray(prop);
    //
    //                             if (!propIsArray && !prop.match(regexHttp)) {
    //
    //                                 this.noArrayData.push(this.allData[property]);
    //                                 console.log(this.noArrayData);
    //                             }
    //
    //                             if (!propIsArray && prop.match(regexHttp)) {
    //                                 // this.allData[property].forEach((urlFromArrayProperty) => {
    //                                 // this.getDataFromArray(urlFromArrayProperty, property);
    //                                 this.getDataFromArray(this.allData[property], property);
    //                                 // });
    //                                 // console.log((this.allData[property]));
    //                             }
    //                             if (propIsArray) {
    //                                 this.allData[property].forEach((urlFromArrayProperty) => {
    //                                     this.getDataFromArray(urlFromArrayProperty, property);
    //                                 });
    //                                 // console.log(this.allData.property);
    //
    //                             }
    //
    //                         }
    //
    //
    //                     }
    //                 }
    //
    //                 this.value = true;
    //                 this.error = false;
    //                 this.table = true;
    //             });
    //         // })
    //         // .catch( function (error) {
    //         //     console.log('nieco je zle');
    //         //     console.log(error);
    //         // });
    //     },
    //
    // }


}).$mount('#app');


