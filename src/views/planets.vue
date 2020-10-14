<template>
 	<main-layout>
		<template v-slot:title>
			<h1>{{ titlePage }}</h1>
		</template>
		<template v-if="planetSelected" v-slot:actions>
			<a href="/planets">GO BACK</a>
		</template>
		<div v-if="planetSelected">
			<p><b>Rotation period</b>: {{ planetSelected.rotation_period }}</p>
			<p><b>Orbital Period</b>: {{ planetSelected.orbital_period }}</p>
			<p><b>Diameter</b>: {{ planetSelected.diameter }}</p>
			<p><b>Climate</b>: {{ planetSelected.climate }}</p>
		</div>
		<div v-else>
			<label>Search</label>
			<input type="text" v-model="search">
			<p v-for="(item, index) in planetFiltered" :key="index">
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
import Planet from '../services/planet.js';
  export default {
    components: {
      MainLayout
    },
    data() {
        return {
            planet: [],
            planetClass: new Planet(),
			planetSelected: null,
			actualPage: 1,
			search: ''
        }
    },
	computed: {
		titlePage() {
			if (this.planetSelected)
				return this.planetSelected.name;
			return 'PLANETS';
		},
		planetFiltered() {
			if (this.search == '')
				return this.planet.results;
			return this.planet.results.filter(item => {
				return item.name.toString().toLowerCase().trim().indexOf(this.search) >= 0;
			})
		}
	},
    methods: {
		async goTo(item) {
			var planet = new Planet();
			planet.set(item);
			var response = await planet.read();
			this.planetSelected = planet;
		},
        async nextPage() {
            if (!this.planet.next)
              return;
			this.actualPage++;
            var response = await this.planetClass.readPage(this.planet.next);
            this.planet = response.data;
        },
        async previousPage() {
            if (!this.planet.previous)
              return;
			this.actualPage--;
            var response = await this.planetClass.readPage(this.planet.previous);
            this.planet = response.data;
        }
    },
    async mounted() {
        var response = await this.planetClass.readPage();
        this.planet = response.data;
    }
  }
</script>