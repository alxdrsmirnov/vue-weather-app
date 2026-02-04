<script setup>
defineProps({
  label: String,
  stat: String
})
</script>

<template>
  <div class="stat">
    <div class="stat-name">{{ label }}</div>
    <div class="stat-value">{{ stat }}</div>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0%;
  gap: 16px
}

.stat-name {
  font-weight: 700;
}
.stat-value {
  font-weight: 500;
}
</style>