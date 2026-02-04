<script setup>
import Stat from './components/Stat.vue'
import CitySelect from './components/CitySelect.vue'

function getCity(city) {
  console.log(city)
}
</script>

<template>
  <main class="main">
    <Stat label="Влажность" stat="90%" />
    <Stat label="Осадки" stat="0%" />

    <CitySelect @selectCity="getCity" />
  </main>
</template>

<style scoped>
.main {
  padding: 56px;
  border-radius: 25px;
  background-color: var(--color-bg-main);
}
</style>
