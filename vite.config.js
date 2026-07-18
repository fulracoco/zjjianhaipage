import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  SITE_URL,
  SUPPORTED_LANGUAGES,
  createStructuredData,
  getLanguageUrl,
  getSeoData,
} from './src/seoConfig.js';
import messages from './i18n.js';

const deploymentFiles = ['_headers', '_redirects', '404.html', 'robots.txt', 'sitemap.xml'];

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const plainText = (value) => String(value)
  .replace(/<br\s*\/?\s*>/gi, ' ')
  .replace(/<[^>]*>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const renderSeoFallback = (language) => {
  const dictionary = messages[language] ?? messages.en;
  const text = (key) => escapeHtml(plainText(dictionary[key] ?? ''));
  const faqItems = [1, 2, 3, 4, 5, 6]
    .map((number) => `
        <details>
          <summary>${text(`faq_q${number}`)}</summary>
          <p>${text(`faq_a${number}`)}</p>
        </details>`)
    .join('');

  return `<!--seo-fallback:start-->
    <main class="seo-fallback">
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">${text('hero_badge')}</div>
          <h1>${text('hero_title')}<span class="en">Zhenjiang Jianhai Marine Parts Co., Ltd.</span></h1>
          <p class="hero-desc">${text('hero_desc')}</p>
        </div>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('about_title')}</h2>
          <p class="section-subtitle">${text('about_subtitle')}</p>
        </div>
        <div class="seo-fallback-copy">
          <p>${text('about_body_1')}</p>
          <p>${text('about_body_2')}</p>
          <p>${text('about_body_3')}</p>
        </div>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('products_title')}</h2>
          <p class="section-subtitle">${text('products_subtitle')}</p>
        </div>
        <div class="seo-fallback-grid">
          <article><h3>${text('seat_series')}</h3><p>${text('seat_desc_1')}</p><p>${text('seat_desc_2')}</p></article>
          <article><h3>${text('spindle_series')}</h3><p>${text('spindle_desc')}</p><p>${text('export_brand_desc')}</p></article>
        </div>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('engines_title')}</h2>
          <p class="section-subtitle">${text('engines_subtitle')}</p>
        </div>
        <p class="seo-fallback-brands">${text('domestic_engine_title')} · MAN B&amp;W · MAN · ${text('wartsila_title')} · ${text('daihatsu_title')} · ${text('yanmar_title')} · ${text('mitsubishi_title')}</p>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('cert_title')}</h2>
          <p class="section-subtitle">${text('cert_subtitle')}</p>
        </div>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('faq_title')}</h2>
          <p class="section-subtitle">${text('faq_subtitle')}</p>
        </div>
        <div class="faq-list">${faqItems}
        </div>
      </section>
      <section class="section bg-white">
        <div class="section-header">
          <h2 class="section-title">${text('contact_title')}</h2>
          <p class="section-subtitle">${text('contact_subtitle')}</p>
        </div>
        <div class="seo-fallback-copy">
          <h3>${text('contact_address_title')}</h3>
          <p>${text('contact_address')}</p>
          <h3>${text('contact_phone_title')}</h3>
          <p>+86 139 5201 1890 · +86 139 5179 0128 · +86 138 5194 3971</p>
          <h3>${text('contact_business_title')}</h3>
          <p>${text('contact_business')}</p>
        </div>
      </section>
    </main>
    <!--seo-fallback:end-->`;
};

const replaceMeta = (html, attribute, key, content) => html.replace(
  new RegExp(`<meta\\s+[^>]*${attribute}="${key.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}"[^>]*>`, 'i'),
  `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`,
);

const renderLocalizedHtml = (source, language) => {
  const seo = getSeoData(language);
  const canonicalUrl = getLanguageUrl(language);
  const socialImage = `${SITE_URL}/assets/jianhai-marine-parts.jpg`;
  const alternateLocales = SUPPORTED_LANGUAGES
    .filter((code) => code !== language)
    .map((code) => `    <meta property="og:locale:alternate" content="${getSeoData(code).locale}">`)
    .join('\n');
  const schema = JSON.stringify(createStructuredData(language)).replaceAll('</script', '<\\/script');

  let html = source
    .replace(/<html lang="[^"]*" data-lang="[^"]*">/i, `<html lang="${seo.htmlLang}" data-lang="${language}">`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`)
    .replace(/<!--seo-fallback:start-->[\s\S]*?<!--seo-fallback:end-->/i, renderSeoFallback(language))
    .replace(/<script type="application\/ld\+json" id="organization-schema">[\s\S]*?<\/script>/i, `<script type="application/ld+json" id="organization-schema">${schema}</script>`);

  html = replaceMeta(html, 'name', 'description', seo.description);
  html = replaceMeta(html, 'name', 'keywords', seo.keywords);
  html = replaceMeta(html, 'property', 'og:site_name', seo.companyName);
  html = replaceMeta(html, 'property', 'og:title', seo.title);
  html = replaceMeta(html, 'property', 'og:description', seo.description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:locale', seo.locale);
  html = replaceMeta(html, 'property', 'og:image', socialImage);
  html = replaceMeta(html, 'property', 'og:image:alt', seo.title);
  html = replaceMeta(html, 'name', 'twitter:title', seo.title);
  html = replaceMeta(html, 'name', 'twitter:description', seo.description);
  html = replaceMeta(html, 'name', 'twitter:image', socialImage);
  html = html.replace(/\s*<meta property="og:locale:alternate"[^>]*>/gi, '');
  html = html.replace(
    /(<meta property="og:locale"[^>]*>)/i,
    `$1\n${alternateLocales}`,
  );

  return html;
};

const copyDeploymentFiles = {
  name: 'copy-deployment-files',
  apply: 'build',
  generateBundle() {
    for (const fileName of deploymentFiles) {
      this.emitFile({ type: 'asset', fileName, source: readFileSync(fileName) });
    }
  }
};

const localizedSeoPages = {
  name: 'localized-seo-pages',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'assets/jianhai-marine-parts.jpg',
      source: readFileSync('assets/optimized/social-share.jpg'),
    });
  },
  closeBundle() {
    const outputDirectory = resolve('dist');
    const indexPath = resolve(outputDirectory, 'index.html');
    const source = readFileSync(indexPath, 'utf8');

    writeFileSync(indexPath, renderLocalizedHtml(source, 'en'));

    SUPPORTED_LANGUAGES.forEach((language) => {
      const languageDirectory = resolve(outputDirectory, language);
      mkdirSync(languageDirectory, { recursive: true });
      writeFileSync(resolve(languageDirectory, 'index.html'), renderLocalizedHtml(source, language));
    });
  },
};

export default defineConfig({
  plugins: [vue(), copyDeploymentFiles, localizedSeoPages]
});
