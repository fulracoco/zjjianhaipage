<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true }
});
</script>

<template>
  <div class="section-header">
    <div class="section-label">{{ label }}</div>
    <h2 class="section-title">{{ title }}</h2>
    <p class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>
