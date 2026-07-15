<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  language: { type: String, required: true },
  t: { type: Function, required: true }
});

const emit = defineEmits(['change-language']);
const menuOpen = ref(false);
const scrolled = ref(false);
const navItems = [
  ['about', 'nav_about'],
  ['products', 'nav_products'],
  ['engines', 'nav_engines'],
  ['process', 'nav_process'],
  ['certifications', 'nav_certifications'],
  ['contact', 'nav_contact']
];

function updateScrollState() {
  scrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener('scroll', updateScrollState, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState));
</script>

<template>
  <nav class="nav" :class="{ scrolled }" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="#" class="nav-logo" aria-label="Zhenjiang Jianhai Marine Parts">
        <span class="icon">{{ t('brand_icon') }}</span>
        <span class="text">{{ t('brand_short') }}</span>
      </a>
      <div class="nav-actions">
        <ul class="nav-links" :class="{ open: menuOpen }">
          <li v-for="[section, label] in navItems" :key="section">
            <a :href="`#${section}`" @click="menuOpen = false">{{ t(label) }}</a>
          </li>
        </ul>
        <div class="lang-switch" aria-label="Language switch">
          <button type="button" :class="{ active: language === 'zh' }" :aria-pressed="language === 'zh'" @click="emit('change-language', 'zh')">{{ language === 'en' ? 'ZH' : '中文' }}</button>
          <button type="button" :class="{ active: language === 'en' }" :aria-pressed="language === 'en'" @click="emit('change-language', 'en')">EN</button>
        </div>
        <button class="nav-toggle" type="button" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">☰</button>
      </div>
    </div>
  </nav>
</template>
