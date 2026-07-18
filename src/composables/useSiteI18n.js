import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import messages from '../../i18n.js';
import { getLanguagePath, SUPPORTED_LANGUAGES, normalizeLanguage } from '../seoConfig.js';
import { updateSeoMetadata } from '../seo.js';

const storageKey = 'jianhai_language';
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const pathLanguage = window.location.pathname.split('/').filter(Boolean)[0];
const storedLanguage = (() => {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
})();

const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language ?? '';
const browserLanguageCode = browserLanguage.toLowerCase().split(/[-_]/)[0];
const detectedLanguage = SUPPORTED_LANGUAGES.includes(browserLanguageCode) ? browserLanguageCode : 'en';

const initialLanguage = SUPPORTED_LANGUAGES.includes(requestedLanguage)
  ? requestedLanguage
  : SUPPORTED_LANGUAGES.includes(pathLanguage) ? pathLanguage
    : SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : detectedLanguage;

const language = ref(initialLanguage);

function updateDocument(languageCode) {
  updateSeoMetadata(normalizeLanguage(languageCode));
}

function getLocationLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  const currentPathLanguage = window.location.pathname.split('/').filter(Boolean)[0];

  if (SUPPORTED_LANGUAGES.includes(queryLanguage)) return queryLanguage;
  if (SUPPORTED_LANGUAGES.includes(currentPathLanguage)) return currentPathLanguage;
  return null;
}

function setLanguage(languageCode) {
  const normalizedLanguage = normalizeLanguage(languageCode);
  const nextUrl = `${getLanguagePath(normalizedLanguage)}${window.location.hash}`;

  language.value = normalizedLanguage;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.history.pushState(window.history.state, '', nextUrl);
  }
}

function handlePopState() {
  const locationLanguage = getLocationLanguage();
  if (locationLanguage) language.value = locationLanguage;
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

  onMounted(() => window.addEventListener('popstate', handlePopState));
  onBeforeUnmount(() => window.removeEventListener('popstate', handlePopState));

  return { language, setLanguage, t };
}
