<template>
    <div>
        <div>
            <label for="id">

                <select class="attribute" v-model="inputCategory">
                    <!--<option value="">-&#45;&#45;</option>-->
                    <option value="people"> people</option>
                    <option value="starships">starships</option>
                    <option value="species">species</option>
                    <option value="films">films</option>
                    <option value="planets">planets</option>
                    <option value="vehicles">vehicles</option>
                </select>
                <input type="number" v-model="inputId" id="id" class="id">
                <button @click="sendData">find</button>

            </label>
        </div>

        <div class="notification is-danger">
            <p v-text="errorMessage"></p>
        </div>
    </div>

</template>

<script>
    import Detail from './Detail.vue';


    export default {
        template: 'Vue header',
        props: [],
        components: {
            Detail,
        },

        data() {
            return {
                inputId: '',
                inputCategory: '',
                errorMessage: '',
                people: [ ]

            }
        },
        created() {
        },

        methods: {


            sendData() {
                if (this.inputId === ''  &&  this.inputCategory === '' || this.inputId === '' && this.inputCategory || this.inputId && this.inputCategory === '' ) {
                    this.errorMessage = 'nevybrali ste vsetko';
                } else {
                    this.$router.push(`/${this.inputCategory}/${this.inputId}`)

                }
            }
        }

    }


</script>