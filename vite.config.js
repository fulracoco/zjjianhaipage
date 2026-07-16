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

const deploymentFiles = ['_headers', '_redirects', '404.html', 'robots.txt', 'sitemap.xml'];

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const replaceMeta = (html, attribute, key, content) => html.replace(
  new RegExp(`<meta\\s+[^>]*${attribute}="${key.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}"[^>]*>`, 'i'),
  `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`,
);

const renderLocalizedHtml = (source, language) => {
  const seo = getSeoData(language);
  const canonicalUrl = getLanguageUrl(language);
  const socialImage = `${SITE_URL}/assets/jianhai-marine-parts.png`;
  const alternateLocales = SUPPORTED_LANGUAGES
    .filter((code) => code !== language)
    .map((code) => `    <meta property="og:locale:alternate" content="${getSeoData(code).locale}">`)
    .join('\n');
  const schema = JSON.stringify(createStructuredData(language)).replaceAll('</script', '<\\/script');

  let html = source
    .replace(/<html lang="[^"]*" data-lang="[^"]*">/i, `<html lang="${seo.htmlLang}" data-lang="${language}">`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`)
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
      fileName: 'assets/jianhai-marine-parts.png',
      source: readFileSync('assets/factory.png'),
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
