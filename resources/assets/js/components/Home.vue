<template>
    <div>

        <h1>HOME</h1>
        <!--<div class="notification is-danger" v-show="error" v-for="error in errorMessage">-->
            <!--<p v-text="error"></p>-->
        <!--</div>-->

        <vue-header> </vue-header>
        <detail :idValue="1" categoryValue="people"> </detail>


    </div>
</template>

<script>
    import Detail from './Detail.vue';
    import VueHeader from './VueHeader.vue';


    export default {
        template: 'Home',
        props: [],
        components: {
            Detail,
            VueHeader
        },

        data() {
            return {}
        },


    }


</script>