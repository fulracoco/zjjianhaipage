import { computed, ref, watch } from 'vue';
import messages from '../../i18n.js';

const storageKey = 'jianhai_language';
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const storedLanguage = (() => {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
})();

const initialLanguage = ['zh', 'en'].includes(requestedLanguage)
  ? requestedLanguage
  : ['zh', 'en'].includes(storedLanguage) ? storedLanguage : 'zh';

const language = ref(initialLanguage);

function updateDocument(languageCode) {
  const dictionary = messages[languageCode] ?? messages.zh;
  document.documentElement.lang = languageCode === 'en' ? 'en' : 'zh-CN';
  document.documentElement.dataset.lang = languageCode;
  document.title = dictionary.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', dictionary.description);
}

watch(language, (languageCode) => {
  updateDocument(languageCode);
  try {
    window.localStorage.setItem(storageKey, languageCode);
  } catch {
    // Language selection remains available when browser storage is disabled.
  }
}, { immediate: true });

export function useSiteI18n() {
  const dictionary = computed(() => messages[language.value] ?? messages.zh);
  const t = (key) => dictionary.value[key] ?? messages.zh[key] ?? key;

  return { language, t };
}
