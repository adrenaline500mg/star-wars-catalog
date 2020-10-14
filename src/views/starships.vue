<template>
 	<main-layout>
		<template v-slot:title>
			<h1>{{ titlePage }}</h1>
		</template>
		<template v-if="starshipSelected" v-slot:actions>
			<a href="/starships">GO BACK</a>
		</template>
		<div v-if="starshipSelected">
			<p><b>Model</b>: {{ starshipSelected.model }}</p>
			<p><b>Manufacturer</b>: {{ starshipSelected.manufacturer }}</p>
			<p><b>Cost in credits</b>: {{ starshipSelected.cost_in_credits }}</p>
			<p><b>Length</b>: {{ starshipSelected['length'] }}</p>
		</div>
		<div v-else>
			<label>Search</label>
			<input type="text" v-model="search">
			<p v-for="(item, index) in starshipFiltered" :key="index">
				<a @click="goTo(item)" style="cursor: pointer;">{{ item.name }}</a>
			</p>

			<p>
				<a @click="previousPage" style="color: blue; cursor: pointer;">Previous page</a>
					{{ actualPage }}
				<a @click="nextPage" style="color: blue; cursor: pointer;">Next page</a>
			</p>
		</div>
  	</main-layout>
</template>

<script>
import MainLayout from '../layouts/main-layout.vue';
import Starship from '../services/starship.js';
  export default {
    components: {
      MainLayout
    },
    data() {
        return {
            starship: [],
            starshipClass: new Starship(),
			starshipSelected: null,
			actualPage: 1,
			search: ''
        }
    },
	computed: {
		titlePage() {
			if (this.starshipSelected)
				return this.starshipSelected.name;
			return 'STARSHIPS';
		},
		starshipFiltered() {
			if (this.search == '')
				return this.starship.results;
			return this.starship.results.filter(item => {
				return item.name.toString().toLowerCase().trim().indexOf(this.search) >= 0;
			})
		}
	},
    methods: {
		async goTo(item) {
			var starship = new Starship();
			starship.set(item);
			var response = await starship.read();
			this.starshipSelected = starship;
		},
        async nextPage() {
            if (!this.starship.next)
              return;
			this.actualPage++;
            var response = await this.starshipClass.readPage(this.starship.next);
            this.starship = response.data;
        },
        async previousPage() {
            if (!this.starship.previous)
              return;
			this.actualPage--;
            var response = await this.starshipClass.readPage(this.starship.previous);
            this.starship = response.data;
        }
    },
    async mounted() {
        var response = await this.starshipClass.readPage();
        this.starship = response.data;
    }
  }
</script>