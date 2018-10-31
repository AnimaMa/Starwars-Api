<div class="flex">
    <div class="box prop">
        <div class="row bold " v-for="prop in properties">
            <span v-text="prop"></span>
        </div>
    </div>

    <div class="box">
        <div class="row" v-for="da in noArrayData">
            <span v-text="da"></span>

        </div>

        <div class="row">
            <div v-for="home in allData.data_homeworld">
                <span v-text="home.name"></span>,
            </div>
        </div>
        <div class="row">
            <div v-for="film in allData.data_films">
                <span v-text="film.title"></span>,
            </div>
        </div>
        <div class="row">
            <div v-for="speci in allData.data_species">
                <span v-text="speci.name"></span>,
            </div>
        </div>
        <div class="row" v-for="vehi in allData.data_vehicles">
            <span  v-text="vehi.name"></span>,
        </div>
        <div  class="row" v-for="ship in allData.data_starships">
            <a href="" v-text="ship.name" @click.prevent="getCategory(ship.url)"></a>,
        </div>

    </div>


</div>
