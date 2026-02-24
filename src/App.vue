<script setup>
import { ref, computed } from 'vue'
import { getEnvParam } from './utils/get.envs'
import PaneLeft from './components/PaneLeft.vue'
import PaneRight from './components/PaneRight.vue'

const API_ENDPOINT = getEnvParam('VITE_API_ENDPOINT')
const API_KEY = getEnvParam('VITE_API_KEY')

const error = ref()
const errorsMap = new Map([
  [1006, 'Указаный город не найден']
])
const errorMessage = computed(() => {
  return errorsMap.get(error?.value?.error?.code) ?? error?.value?.error?.message
})

const data = ref()
const stats = computed(() => {
  const fd = data.value?.forecast?.forecastday?.[activeDay.value]
  if (!fd) return []

  const avgCloud = Math.round(
    fd.hour.reduce((sum, h) => sum + h.cloud, 0) / fd.hour.length
  )

  return [
    { label: 'Температура', stat: fd.day.avgtemp_c + ' C' },
    { label: 'Влажность', stat: fd.day.avghumidity + ' %' },
    { label: 'Облачность', stat: avgCloud + ' %' },
    { label: 'Ветер', stat: fd.day.maxwind_kph + ' км/ч' }
  ]
})

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

const selectedDay = computed(() => {
  const fd = data.value?.forecast?.forecastday?.[activeDay.value]
  if (!fd) return null

  return {
    city: data.value.location.name,
    date: fd.date,
    temp: Math.round(fd.day.avgtemp_c),
    maxTemp: Math.round(fd.day.maxtemp_c),
    minTemp: Math.round(fd.day.mintemp_c),
    condition: fd.day.condition.text,
    weather: conditionToWeather(fd.day.condition.code)
  }
})

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
  <main>
    <PaneLeft :day="selectedDay" />

    <PaneRight
      :stats="stats"
      :forecastDays="forecastDays"
      :errorMessage="errorMessage"
      @selectDay="(i) => activeDay = i"
      @selectCity="getCityWeather"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
