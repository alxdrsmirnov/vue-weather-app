<script setup>
import LocationIcon from '../icons/LocationIcon.vue'
import Button from './Button.vue'

const emit = defineEmits({
  selectCity: null
})

function select() {
  emit('selectCity', 'London')
}
</script>

<template>
  <Button @click="select">
    <LocationIcon />
    Изменить город
  </Button>

  <input type="text">
  <Button>Сохранить</Button>
</template>