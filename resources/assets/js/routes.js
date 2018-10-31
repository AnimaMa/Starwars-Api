import Main from './main.js';

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from './components/Home.vue';


const routes = [
    {path: '/home', component: Home}

];


const router = new VueRouter({
    routes

});

