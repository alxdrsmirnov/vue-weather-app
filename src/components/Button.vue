<script setup>
</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  position: relative;
  border: none;
  border-radius: 10px;
  color: var(--color-primary);
  background: var(--gradient);
  padding: 14px;
  font-family: var(--font);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0%;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  overflow: hidden;
  z-index: 1;
}
.button:hover {
  box-shadow: 0 1px 8px rgba(84, 96, 230, 0.35);
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-inverted);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  z-index: -1;
}
.button:hover::before {
  opacity: 0.8;
}
</style>