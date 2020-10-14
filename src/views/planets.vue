<template>
 	<main-layout>
		<p v-for="(item, index) in planet.results" :key="index">
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
import Planet from '../services/planet.js';
  export default {
    components: {
      MainLayout
    },
    data() {
        return {
            planet: [],
            planetClass: new Planet()
        }
    },
    methods: {
        async nextPage() {
            if (!this.planet.next)
              return;
            var response = await this.planetClass.readPage(this.planet.next);
            this.planet = response.data;
        },
        async previousPage() {
            if (!this.planet.previous)
              return;
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