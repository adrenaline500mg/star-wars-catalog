<template>
  <main-layout>
    <p>Welcome home</p>
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