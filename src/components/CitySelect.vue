<script setup>
import { ref } from 'vue'
import LocationIcon from '../icons/LocationIcon.vue'
import Button from './Button.vue'

const emit = defineEmits(['selectCity'])

const select = () => emit('selectCity', 'London')

const isEditMode = ref(false)
</script>

<template>
  <div class="select-city">
    <Button
      v-if="!isEditMode"
      @click="isEditMode = !isEditMode"
      class="edit-button"
    >
      <LocationIcon style="margin-right: 10px;" />
      Изменить город
    </Button>

    <template v-else>
      <input type="text">

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

input {
  border-radius: 10px;
  box-shadow: 1px 2px 4px 0px rgba(34, 40, 49, 1);
  background: rgba(39, 46, 55, 1);
  width: 260px;
  height: 52px;
  border: none;
  color: white;
  font-size: 18px;
}
</style>