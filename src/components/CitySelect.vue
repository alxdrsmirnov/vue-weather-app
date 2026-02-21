<script setup>
import { onMounted, ref } from 'vue'
import LocationIcon from '../icons/LocationIcon.vue'
import Button from './Button.vue'
import Input from './Input.vue'

const isEditMode = ref(false)
const city = ref(localStorage['CACHED_CITY'] || 'Smolensk')

const emit = defineEmits(['selectCity'])

const select = () => {
  emit('selectCity', city.value)
  localStorage['CACHED_CITY'] = city.value
  isEditMode.value = false
}

onMounted(() => emit('selectCity', city.value))
</script>

<template>
  <div class="select-city">
    <Button
      v-if="!isEditMode"
      @click="isEditMode = true"
      class="edit-button"
    >
      <LocationIcon class="edit-icon" />
      Изменить город
    </Button>

    <template v-else>
      <Input
        v-model="city"
        placeholder="Введите город"
        @keyup.enter="select"
      />

      <Button @click="select">
        Сохранить
      </Button>
    </template>
  </div>
</template>

<style scoped>
.select-city {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>