<template>
    <div>
        <label for="id">

            <select class="attribute" v-model="inputCategoryValue">

                <option value="">---</option>

                <option value="people"> people</option>
                <option value="starships">starships</option>
                <option value="species">species</option>
                <option value="films">films</option>
                <option value="planets">planets</option>
                <option value="vehicles">vehicles</option>
            </select>

            <input type="number" v-model="inputIdValue" id="id" class="id">
            <button @click="getCategory">find</button>
        </label>
    </div>
</template>

<script>
    import Home from './Home.vue'
</script>