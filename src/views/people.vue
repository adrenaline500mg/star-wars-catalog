<template>
 	<main-layout>
		<template v-slot:title>
			<h1>{{ titlePage }}</h1>
		</template>
		<template v-if="peopleSelected" v-slot:actions>
			<a href="/people">GO BACK</a>
		</template>
		<div v-if="peopleSelected">
			<p><b>Height</b>: {{ peopleSelected.height }}</p>
			<p><b>Mass</b>: {{ peopleSelected.mass }}</p>
			<p><b>Hair color</b>: {{ peopleSelected.hair_color }}</p>
			<p><b>Skin Color</b>: {{ peopleSelected.skin_color }}</p>
			<p><b>Gender</b>: {{ peopleSelected.gender }}</p>
		</div>
		<div v-else>
			<label>Search</label>
			<input type="text" v-model="search">
			<p v-for="(item, index) in peopleFiltered" :key="index">
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
import People from '../services/people.js';
  export default {
    components: {
		MainLayout
    },
    data() {
        return {
			people: [],
			peopleClass: new People(),
			peopleSelected: null,
			actualPage: 1,
			search: ''
        }
    },
	computed: {
		titlePage() {
			if (this.peopleSelected)
				return this.peopleSelected.name;
			return 'PEOPLE';
		},
		peopleFiltered() {
			if (this.search == '')
				return this.people.results;
			return this.people.results.filter(item => {
				return item.name.toString().toLowerCase().trim().indexOf(this.search) >= 0;
			})
		}
	},
    methods: {
		async goTo(item) {
			var people = new People();
			people.set(item);
			var response = await people.read();
			this.peopleSelected = people;
		},
        async nextPage() {
            if (!this.people.next)
              return;
			this.actualPage++;
            var response = await this.peopleClass.readPage(this.people.next);
            this.people = response.data;
        },
        async previousPage() {
            if (!this.people.previous)
              return;
			this.actualPage--;
            var response = await this.peopleClass.readPage(this.people.previous);
            this.people = response.data;
        }
    },
    async mounted() {
        var response = await this.peopleClass.readPage();
        this.people = response.data;
    }
  }
</script>