<script setup>
import { onMounted } from 'vue';
import { useSiteI18n } from './composables/useSiteI18n.js';
import { assets } from './data/assets.js';
import SiteHeader from './components/SiteHeader.vue';
import SectionHeading from './components/SectionHeading.vue';
import ProductSection from './components/ProductSection.vue';
import EngineSection from './components/EngineSection.vue';

const { language, t } = useSiteI18n();

const highlights = ['about_highlight_1', 'about_highlight_2', 'about_highlight_3', 'about_highlight_4'];
const aboutParagraphs = ['about_body_1', 'about_body_2', 'about_body_3'];
const aboutStats = [
  ['ISO 9001', 'stat_iso'], ['10+', 'stat_brands'], ['100+', 'stat_models'], ['stat_stock_title', 'stat_stock']
];
const processSteps = [
  ['🏗️', 'step_material'], ['🔨', 'step_forging'], ['⚙️', 'step_rough'], ['🔥', 'step_heat'], ['🔩', 'step_welding'], ['🔧', 'step_grinding'], ['📐', 'step_inspection'], ['📦', 'step_packing'], ['🚚', 'step_delivery']
];
const processFeatures = [
  ['🛡️', 'feature_quality_title', 'feature_quality_desc'], ['🏭', 'feature_equipment_title', 'feature_equipment_desc'], ['👨‍🔧', 'feature_team_title', 'feature_team_desc'], ['⏱️', 'feature_delivery_title', 'feature_delivery_desc']
];
const certificationCards = [
  ['📋', 'cert_card_1_title', 'cert_card_1_desc'], ['🔬', 'cert_card_2_title', 'cert_card_2_desc'], ['⚓', 'cert_card_3_title', 'cert_card_3_desc'], ['🌐', 'cert_card_4_title', 'cert_card_4_desc']
];
const productionStats = [
  ['prod_stat_1_title', 'prod_stat_1_desc'], ['prod_stat_2_title', 'prod_stat_2_desc'], ['prod_stat_3_title', 'prod_stat_3_desc'], ['OEM/ODM', 'prod_stat_4_desc']
];

onMounted(() => {
  if (window.location.hash) {
    window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start', behavior: 'auto' }), 50);
  }
});
</script>

<template>
  <SiteHeader :language="language" :t="t" />

  <main>
    <section class="hero" :style="{ backgroundImage: `url(${assets.background})` }">
      <div class="hero-content">
        <div class="hero-badge">{{ t('hero_badge') }}</div>
        <h1>{{ t('hero_title') }}<span class="en">Zhenjiang Jianhai Marine Parts Co., Ltd.</span></h1>
        <p class="hero-desc" v-html="t('hero_desc')"></p>
        <div class="hero-actions"><a href="#products" class="btn btn-primary">{{ t('hero_cta_products') }}</a><a href="#contact" class="btn btn-outline">{{ t('hero_cta_contact') }}</a></div>
        <div class="hero-proof" aria-label="Company advantages">
          <div class="proof-item"><strong>{{ t('proof_iso_title') }}</strong><span>{{ t('proof_iso_text') }}</span></div>
          <div class="proof-item"><strong>{{ t('proof_oem_title') }}</strong><span>{{ t('proof_oem_text') }}</span></div>
          <div class="proof-item"><strong>{{ t('proof_export_title') }}</strong><span>{{ t('proof_export_text') }}</span></div>
        </div>
      </div>
    </section>

    <section id="about" class="section bg-white">
      <SectionHeading label="About Us" :title="t('about_title')" :subtitle="t('about_subtitle')" />
      <div class="about-grid"><div class="about-text">
        <h3>{{ t('about_company') }}</h3><p class="en-title">Zhenjiang Jianhai Marine Parts Co., Ltd.</p>
        <div class="about-photo"><img :src="assets.factory" alt="Zhenjiang Jianhai Marine Parts factory" width="893" height="385" loading="lazy" decoding="async"></div>
        <p v-for="paragraph in aboutParagraphs" :key="paragraph" v-html="t(paragraph)"></p>
        <div class="about-features"><h4>{{ t('about_features_title') }}</h4><div class="about-highlights"><div v-for="highlight in highlights" :key="highlight" class="highlight-item"><span class="dot"></span><span>{{ t(highlight) }}</span></div></div></div>
      </div></div>
      <div class="about-stats"><div v-for="[number, label] in aboutStats" :key="label" class="stat-card"><div class="stat-number">{{ number.startsWith('stat_') ? t(number) : number }}</div><div class="stat-label">{{ t(label) }}</div></div></div>
    </section>

    <ProductSection :t="t" />
    <EngineSection :t="t" />

    <section id="process" class="section bg-dark">
      <SectionHeading label="Manufacturing" :title="t('process_title')" :subtitle="t('process_subtitle')" />
      <div class="process-flow"><template v-for="([icon, label], index) in processSteps" :key="label"><div class="process-step"><span class="icon">{{ icon }}</span><span class="label">{{ t(label) }}</span></div><span v-if="index < processSteps.length - 1" class="process-arrow">→</span></template></div>
      <div class="process-features"><div v-for="[icon, title, description] in processFeatures" :key="title"><div class="feature-icon">{{ icon }}</div><h4>{{ t(title) }}</h4><p>{{ t(description) }}</p></div></div>
      <div class="manufacturing-image"><img class="manufacturing-photo" :src="assets.manufacturing" alt="Marine parts manufacturing process" width="1200" height="1629" loading="lazy" decoding="async"></div>
    </section>

    <section id="production" class="section bg-white">
      <SectionHeading label="Production" :title="t('production_title')" :subtitle="t('production_subtitle')" />
      <div class="product-detail"><img :src="assets.workshop" alt="Standardized production workshop" width="893" height="1212" loading="lazy" decoding="async"><div class="info"><h4>{{ t('capacity_title') }}</h4><p v-html="t('capacity_desc')"></p><h4 class="cooperation-heading">{{ t('cooperation_title') }}</h4><p v-html="t('cooperation_desc')"></p></div></div>
      <div class="about-stats"><div v-for="[number, label] in productionStats" :key="label" class="stat-card"><div class="stat-number">{{ number.startsWith('prod_') ? t(number) : number }}</div><div class="stat-label">{{ t(label) }}</div></div></div>
    </section>

    <section id="certifications" class="bg-dark"><div class="section">
      <SectionHeading label="Certifications" :title="t('cert_title')" :subtitle="t('cert_subtitle')" />
      <div class="cert-grid"><article v-for="[icon, title, description] in certificationCards" :key="title" class="cert-card"><span class="icon">{{ icon }}</span><h4>{{ t(title) }}</h4><p>{{ t(description) }}</p></article></div>
      <div class="cert-detail"><h4>{{ t('cert_detail_title') }}</h4><div class="info-row"><span v-html="t('cert_org')"></span><span v-html="t('cert_no')"></span></div><div class="info-row cert-info-row"><span v-html="t('cert_reg')"></span><span v-html="t('cert_date')"></span></div><div class="cert-extra" v-html="t('cert_scope')"></div><div class="cert-extra" v-html="t('cert_address')"></div><div class="cert-image"><img :src="assets.certificate" alt="ISO 9001 certificate" width="893" height="613" loading="lazy" decoding="async"></div></div>
    </div></section>

    <section id="contact" class="section bg-white">
      <SectionHeading label="Contact" :title="t('contact_title')" :subtitle="t('contact_subtitle')" />
      <div class="contact-grid"><div><article class="contact-card"><div class="c-icon">📍</div><div><h4>{{ t('contact_address_title') }}</h4><p>{{ t('contact_address') }}</p></div></article><article class="contact-card contact-highlight"><div class="c-icon phone-icon">📞</div><div><h4>{{ t('contact_phone_title') }}</h4><p>+86 139 5201 1890</p><p>+86 139 5179 0128</p><p>+86 138 5194 3971</p></div></article></div><div><article class="contact-card"><div class="c-icon">🏢</div><div><h4>{{ t('contact_credit_title') }}</h4><p>91321183MAE6BSNY6R</p></div></article><article class="contact-card contact-gap"><div class="c-icon">🏭</div><div><h4>{{ t('contact_business_title') }}</h4><p>{{ t('contact_business') }}</p></div></article><article class="contact-card contact-gap"><div class="c-icon">💬</div><div><h4>{{ t('contact_wechat_title') }}</h4><p>{{ t('contact_wechat_desc') }}</p></div></article></div></div>
    </section>
  </main>

  <footer><strong>{{ t('footer_company') }}</strong><br>Zhenjiang Jianhai Marine Parts Co., Ltd.<br><span class="footer-line">{{ t('footer_line_1') }}</span><span class="footer-line footer-line-secondary">{{ t('footer_line_2') }}</span></footer>
</template>
