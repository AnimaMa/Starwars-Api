<template>
    <div>
        <div>
            <h2 class="h2">Searching</h2>
            <label >
                <!--v-on:change="getData('people', 'name')"-->
                <select v-model="selectedOption"  v-on:change="changedSelect"  class="attribute"  >
                    <!--<option value="">-&#45;&#45;</option>-->
                    <option id="1" value="people"> people</option>
                    <option id="2" value="starships">starships</option>
                    <option id="3" value="species">species</option>
                    <option id="4" value="films">films</option>
                    <option id="5" value="planets">planets</option>
                    <option id="6" value="vehicles">vehicles</option>
                </select>

            </label>
            <label for="">
                <select v-model="selectedValue" name="" id="" class="select" :disabled="!selectedOption">
                    <option  v-if="categorySelected" v-for="value in searchedData" :value="value" >{{value}}</option>
                </select>

                <button @click="search">Search</button>

            </label>
        </div>

        <div class="notification is-danger">
            <p v-text="errorMessage"></p>
        </div>
    </div>

</template>

<script>

    export default {
        template: 'Search',
        props: [],

        data() {
            return {
                inputCategory: '',
                errorMessage: '',
                categoryPeople: false,
                categoryStarships: false,
                categorySpecies: false,
                categoryFilms: false,
                categoryPlanets: false,
                categoryVehicles: false,
                searchedData: [],
                searchedValue: '',
                selectedOption: '',
                selectedValue: '',
                categorySelected: true
                // optionArray: [
                //     { 1: 'name' },
                //     { 2: 'name' },
                //     { 3: 'name' },
                //     { 4: 'title' },
                //     { 5: 'name' },
                //     { 6: 'name' },
                //
                // ]


            }
        },
        // created() {
        //     this.getNames();
        // },

        methods: {
            changedSelect() {

              if(this.selectedOption === 'films') {
                  this.searchedValue = 'title';
              } else {
                  this.searchedValue = 'name';
              }

              this.getData(this.selectedOption, this.searchedValue);
            },

            getData(searchedCategory, searchedProperty) {
                let url = 'https://swapi.co/api/' + searchedCategory;

                this.searchedData = [];

                axios.get(url)
                    .then((response) => {
                        let results = response.data.results;
                        console.log(results);

                        for (let pro in results) {
                            this.searchedData.push(results[pro][searchedProperty]);
                        }
                        let upperCasedCategory = searchedCategory.charAt(0).toUpperCase() + searchedCategory.slice(1);
                        let wholeCategory =  'category' + upperCasedCategory ;
                        // this[wholeCategory] = true;
                        this.categorySelected = true;
                    })
                    .catch((error) => {
                    });

            },

            search() {
                ///kym nie je vybrana value tak bude disable cize pridata pred get niekde

                console.log(this.selectedProperty);
                // if (this.inputId === '' && this.inputCategory === '' || this.inputId === '' && this.inputCategory || this.inputId && this.inputCategory === '') {
                //     this.errorMessage = 'nevybrali ste vsetko';
                // } else {
                    this.$router.push(`/${this.selectedOption}/${this.selectedValue}`)
                //
                // }
            }
        }

    }


</script>