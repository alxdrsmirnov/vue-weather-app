<script setup>
import Stat from './Stat.vue'
import Error from './Error.vue'
import CitySelect from './CitySelect.vue'
import DayCard from './DayCard.vue'

defineProps({
  errorMessage: {
    type: String,
    default: null
  },
  stats: {
    type: Array,
    default: () => []
  },
  forecastDays: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['selectDay', 'selectCity'])
</script>

<template>
  <div class="right">
    <Error v-if="errorMessage" :error="errorMessage" />

    <div class="content">
      <template v-if="!errorMessage">
        <Stat
          v-for="stat of stats"
          v-bind="stat"
        />

        <div class="day-cards">
          <DayCard
            v-for="(fc, i) of forecastDays"
            :key="fc.day"
            v-bind="fc"
            @click="emit('selectDay', i)"
          />
        </div>
      </template>
    </div>

    <CitySelect @selectCity="(city) => emit('selectCity', city)" />
  </div>
</template>

<style scoped>
.right {
  display: flex;
  flex-direction: column;
  padding: 0 56px 56px 56px;
  border-radius: 0 25px 25px 0;
  background-color: var(--color-bg-main);
  width: 416px;
  height: 620px;
}

.content {
  flex: 1;
  margin-top: 56px;
}

.day-cards {
  margin-top: 52px;
  display: flex;
  flex-direction: row;
  gap: 4px;
}
</style>
