<script setup>
import { ref, computed } from 'vue'
import { getEnvParam } from './utils/get.envs'
import Stat from './components/Stat.vue'
import Error from './components/Error.vue'
import CitySelect from './components/CitySelect.vue'
import DayCard from './components/DayCard.vue'

const API_ENDPOINT = getEnvParam('VITE_API_ENDPOINT')
const API_KEY = getEnvParam('VITE_API_KEY')

const data = ref()

const error = ref()
const errorsMap = new Map([
  [1006, 'Указаный город не найден']
])
const errorMessage = computed(() => {
  return errorsMap.get(error?.value?.error?.code) ?? error?.value?.error?.message
})

const stats = computed(() => data.value ? [
  { label: 'Температура', stat: data.value.current.temp_c + ' C' },
  { label: 'Влажность', stat: data.value.current.humidity + ' %' },
  { label: 'Облачность', stat: data.value.current.cloud + ' %' },
  { label: 'Ветер', stat: data.value.current.wind_kph + ' км/ч' }
] : [])

const activeDay = ref(0)

const formatDay = (dateStr) => {
  return new Date(dateStr)
    .toLocaleDateString('ru-RU', { weekday: 'short' })
}

const conditionToWeather = (code) => {
  if (code === 1000) return 'sun'
  if (code <= 1009) return 'cloud'
  return 'rain'
}

const forecastDays = computed(() =>
  (data.value?.forecast?.forecastday ?? []).map((fd, i) => ({
    day: formatDay(fd.date),
    temp: Math.round(fd.day.avgtemp_c),
    weather: conditionToWeather(fd.day.condition.code),
    active: i === activeDay.value
  }))
)

const getCityWeather = async (city) => {
  const params = new URLSearchParams({
    q: city,
    lang: 'ru',
    key: API_KEY,
    days: 4
  })

  const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`)
  if (res.status >= 400) {
    data.value = undefined
    return error.value = await res.json()
  }

  error.value = undefined
  data.value = await res.json()
  activeDay.value = 0
}
</script>

<template>
  <main class="main">
    <Error v-if="error" :error="errorMessage" />

    <div class="content">
      <template v-if="!error">
        <Stat
          v-for="stat of stats"
          v-bind="stat"
        />

        <div class="day-cards">
          <DayCard
            v-for="(fc, i) of forecastDays"
            :key="fc.day"
            v-bind="fc"
            @click="activeDay = i"
          />
        </div>
      </template>
    </div>

    <CitySelect @selectCity="getCityWeather" />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  padding: 0 56px 56px 56px;
  border-radius: 25px;
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
