<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  language: { type: String, required: true },
  t: { type: Function, required: true },
  onLanguageChange: { type: Function, required: true }
});

const menuOpen = ref(false);
const scrolled = ref(false);
const languageOptions = [
  ['zh', '中', '中文'],
  ['en', 'EN', 'English'],
  ['de', 'DE', 'Deutsch'],
  ['fr', 'FR', 'Français'],
  ['ja', '日', '日本語'],
  ['ko', '한', '한국어']
];
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

function handleLanguageChange(event) {
  props.onLanguageChange(event.target.value);
}

onMounted(() => window.addEventListener('scroll', updateScrollState, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState));
</script>

<template>
  <nav class="nav" :class="{ scrolled }" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <span class="icon" aria-hidden="true">{{ t('brand_icon') }}</span>
        <span class="text">{{ t('brand_short') }}</span>
      </a>
      <div class="nav-actions">
        <ul class="nav-links" :class="{ open: menuOpen }">
          <li v-for="[section, label] in navItems" :key="section">
            <a :href="`#${section}`" @click="menuOpen = false">{{ t(label) }}</a>
          </li>
        </ul>
        <label class="lang-switch">
          <span class="lang-switch-label">Language</span>
          <select :value="language" aria-label="Language switch" @change="handleLanguageChange">
            <option v-for="[code, label, name] in languageOptions" :key="code" :value="code">{{ name }}</option>
          </select>
        </label>
        <button class="nav-toggle" type="button" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">☰</button>
      </div>
    </div>
  </nav>
</template>
