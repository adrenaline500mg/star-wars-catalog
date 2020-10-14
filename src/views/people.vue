<template>
 	<main-layout>
		<p v-for="(item, index) in people.results" :key="index">
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
import People from '../services/people.js';
  export default {
    components: {
      MainLayout
    },
    data() {
        return {
            people: [],
            peopleClass: new People()
        }
    },
    methods: {
        async nextPage() {
            if (!this.people.next)
              return;

            var response = await this.peopleClass.readPage(this.people.next);
            this.people = response.data;
        },
        async previousPage() {
            if (!this.people.previous)
              return;

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