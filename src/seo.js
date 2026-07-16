import {
  SITE_URL,
  SUPPORTED_LANGUAGES,
  createStructuredData,
  getLanguageUrl,
  getSeoData,
} from './seoConfig.js';

const setAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([name, value]) => {
    if (element.getAttribute(name) !== value) {
      element.setAttribute(name, value);
    }
  });
};

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  setAttributes(element, attributes);
};

const ensureLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  setAttributes(element, attributes);
};

export function updateSeoMetadata(language) {
  const seo = getSeoData(language);
  const canonicalUrl = getLanguageUrl(seo.language);
  const socialImage = `${SITE_URL}/assets/jianhai-marine-parts.png`;

  document.documentElement.lang = seo.htmlLang;
  document.documentElement.dataset.lang = seo.language;
  document.title = seo.title;

  ensureMeta('meta[name="description"]', { name: 'description', content: seo.description });
  ensureMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords });
  ensureMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  });
  ensureLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

  SUPPORTED_LANGUAGES.forEach((languageCode) => {
    ensureLink(`link[rel="alternate"][hreflang="${languageCode}"]`, {
      rel: 'alternate',
      hreflang: languageCode,
      href: getLanguageUrl(languageCode),
    });
  });
  ensureLink('link[rel="alternate"][hreflang="x-default"]', {
    rel: 'alternate',
    hreflang: 'x-default',
    href: getLanguageUrl('en'),
  });

  ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: seo.companyName });
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  ensureMeta('meta[property="og:locale"]', { property: 'og:locale', content: seo.locale });
  ensureMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage });
  ensureMeta('meta[property="og:image:type"]', { property: 'og:image:type', content: 'image/png' });
  ensureMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '893' });
  ensureMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '385' });
  ensureMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: seo.title });

  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((element) => element.remove());
  SUPPORTED_LANGUAGES.filter((code) => code !== seo.language).forEach((code) => {
    const alternate = document.createElement('meta');
    alternate.setAttribute('property', 'og:locale:alternate');
    alternate.setAttribute('content', getSeoData(code).locale);
    document.head.appendChild(alternate);
  });

  ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
  ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImage });

  let structuredData = document.head.querySelector('#organization-schema');
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'organization-schema';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(createStructuredData(seo.language));
}
