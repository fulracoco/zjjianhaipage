import { computed, ref, watch } from 'vue';
import messages from '../../i18n.js';

const storageKey = 'jianhai_language';
const supportedLanguages = ['zh', 'en', 'ja', 'ko'];
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const storedLanguage = (() => {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
})();

const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language ?? '';
const browserLanguageCode = browserLanguage.toLowerCase().split(/[-_]/)[0];
const detectedLanguage = supportedLanguages.includes(browserLanguageCode) ? browserLanguageCode : 'en';

const initialLanguage = supportedLanguages.includes(requestedLanguage)
  ? requestedLanguage
  : supportedLanguages.includes(storedLanguage) ? storedLanguage : detectedLanguage;

const language = ref(initialLanguage);

function updateDocument(languageCode) {
  const dictionary = messages[languageCode] ?? messages.zh;
  const documentLanguages = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko' };
  document.documentElement.lang = documentLanguages[languageCode] ?? 'en';
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
