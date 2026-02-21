<script setup>
defineProps({
  error: String,
  required: true
})
</script>

<template>
  <div class="error">{{ error }}</div>
</template>

<style scoped>
.error {
  background-color: var(--color-bg-card);
  border-radius: 0 0 25px 25px;
  color: var(--color-primary);
  padding: 12px 16px;
  font-size: 18px;
  text-align: center;
}
</style>