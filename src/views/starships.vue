<template>
 	<main-layout>
		<p v-for="(item, index) in starship.results" :key="index">
			{{ item.name }}
		</p>
		<p>
			<a @click="previousPage">Anterior Pagina</a>
			<a @click="nextPage">Siguiente Pagina</a>
		</p>
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
            starshipClass: new Starship()
        }
    },
    methods: {
        async nextPage() {
            if (!this.starship.next)
              return;

            var response = await this.starshipClass.readPage(this.starship.next);
            this.starship = response.data;
        },
        async previousPage() {
            if (!this.starship.previous)
              return;

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