<script setup>
const model = defineModel({ type: String, required: true })
</script>

<template>
  <input type="text" v-model="model" />
</template>

<style scoped>
input {
  border-radius: 10px;
  box-shadow: 1px 2px 4px 0px var(--color-bg-main);
  background: var(--color-bg-card);
  width: 238px;
  height: 52px;
  border: none;
  color: var(--color-primary);
  font-size: 18px;
  padding: 0 14px;
  letter-spacing: 0.02rem;
}
</style>
