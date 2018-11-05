<template>
    <div>

        <h1>HOME</h1>

        <!--<p v-if="error" v-text="errorMessage" class="notification is-danger"></p>-->

        <!--<hr>-->
        <!--<label for="id">-->

            <!--<select class="attribute" v-model="inputCategoryValue">-->

                <!--<option value="">-&#45;&#45;</option>-->

                <!--<option value="people"> people</option>-->
                <!--<option value="starships">starships</option>-->
                <!--<option value="species">species</option>-->
                <!--<option value="films">films</option>-->
                <!--<option value="planets">planets</option>-->
                <!--<option value="vehicles">vehicles</option>-->
            <!--</select>-->

            <!--<input type="number" v-model="inputIdValue" id="id" class="id">-->

            <!--<button @click="getCategory">find</button>-->

        <!--</label>-->


        <router-link to="/detail">Detail</router-link>

        <detail :inputIdValue="1" inputCategoryValue="people"> </detail>


        <!--<div class="notification is-danger" v-for="error in errorMessage">-->
            <!--<p v-text="error"></p>-->
        <!--</div>-->

    </div>
</template>

<script>
    import $ from 'jquery';
    import Detail from './Detail.vue';


    export default {
        template: 'Home',
        props: [],
        components: {
            Detail
        },

        data() {
            return {

            }
        },

        methods: {
            // getCategory() {
            //     this.$refs.detail.getCategory();
            // }
        }

    }


</script>