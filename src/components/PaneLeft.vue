<script setup>
import LocationIcon from '../icons/LocationIcon.vue'
import SunIcon from '../icons/weather/SunIcon.vue'
import CloudIcon from '../icons/weather/CloudIcon.vue'
import RainIcon from '../icons/weather/RainIcon.vue'

defineProps({
  day: {
    type: Object,
    default: null
  }
})

const icons = { sun: SunIcon, cloud: CloudIcon, rain: RainIcon }

const formatWeekday = (dateStr) => {
  return new Date(dateStr)
    .toLocaleDateString('ru-RU', { weekday: 'long' })
}

const formatDate = (dateStr) => {
  return new Date(dateStr)
    .toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="left">
    <template v-if="day">
      <div class="top">
        <span class="weekday">{{ formatWeekday(day.date) }}</span>
        <span class="date">{{ formatDate(day.date) }}</span>
        <span class="city">
          <LocationIcon :width="18" />
          {{ day.city }}
        </span>
      </div>

      <div class="bottom">
        <component :is="icons[day.weather]" :width="70" color="white" />

        <span class="temp">{{ day.temp }} °C</span>
        <span class="condition">{{ day.condition }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.left {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 760px;
  border-radius: 38px;
  background-image: url('/public/waether-img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  font-family: var(--font);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

.top {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 48px 40px;
}

.weekday {
  font-size: 32px;
  font-weight: 700;
  text-transform: capitalize;
}

.date {
  font-size: 18px;
  font-weight: 400;
  opacity: 0.85;
}

.city {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 18px;
  font-weight: 500;
}

.bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 48px 40px;
}

.temp {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
}

.condition {
  font-size: 18px;
  font-weight: 400;
  opacity: 0.9;
  text-transform: capitalize;
}
</style>
