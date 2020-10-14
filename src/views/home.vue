<template>
	<main-layout>
		<template v-slot:title>
			<h1>STAR WARS CATALOG</h1>
		</template>
		<template v-slot:actions>
		</template>
		<a href="people">PEOPLE</a>
		<a href="starships">STARSHIPS</a>
		<a href="planets">PLANETS</a>
	</main-layout>
</template>

<script>
  import MainLayout from '../layouts/main-layout.vue';
  export default {
    components: {
    	MainLayout
    }
  }
</script>