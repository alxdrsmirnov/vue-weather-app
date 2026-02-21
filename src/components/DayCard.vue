<script setup>
import { computed } from 'vue'
import SunIcon from '../icons/weather/SunIcon.vue'
import CloudIcon from '../icons/weather/CloudIcon.vue'
import RainIcon from '../icons/weather/RainIcon.vue'

const props = defineProps({
  day: {
    type: String,
    required: true
  },
  temp: {
    type: [Number, String],
    required: true
  },
  weather: {
    type: String,
    default: 'sun',
    validator: (v) => ['sun', 'cloud', 'rain'].includes(v)
  },
  active: {
    type: Boolean,
    default: false
  }
})

const iconColor = computed(() => props.active ? '#000000' : 'white')

const WeatherIcon = computed(() => {
  const icons = { sun: SunIcon, cloud: CloudIcon, rain: RainIcon }
  return icons[props.weather] ?? SunIcon
})
</script>

<template>
  <button
    type="button"
    class="day-card"
    :class="{ 'day-card--active': active }"
    @click="handleClick"
  >
    <component
      :is="WeatherIcon"
      :width="40"
      :color="iconColor"
      class="day-card__icon"
    />
    <span class="day-card__day">{{ day }}</span>
    <span class="day-card__temp">{{ temp }} °C</span>
  </button>
</template>

<style scoped>
.day-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 24px;
  min-width: 100px;
  border-radius: 20px;
  border: 2px solid transparent;
  background-color: var(--color-bg-card);
  color: var(--color-primary);
  font-family: var(--font);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.day-card:hover {
  opacity: 0.9;
}

.day-card--active {
  background-color: #ffffff;
  color: #000000;
  border-color: #1a1a1a;
}

.day-card__icon {
  flex-shrink: 0;
}

.day-card__day {
  font-size: 16px;
  font-weight: 500;
}

.day-card__temp {
  font-size: 20px;
  font-weight: 600;
}
</style>
