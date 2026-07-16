<script setup>
import { computed } from 'vue';
import { assets } from '../data/assets.js';
import SectionHeading from './SectionHeading.vue';

const props = defineProps({ t: { type: Function, required: true } });
const tr = (key) => props.t(key);
const engines = computed(() => [
  { image: assets.domesticBrands, width: 720, height: 977, alt: 'Zichai Weichai Ningdong Guangchai Shaanxi Diesel', title: tr('domestic_engine_title'), models: tr('domestic_engine_models') },
  { image: assets.manBw, width: 720, height: 977, alt: 'MAN B&W', title: 'MAN B&W', models: '26MC, 35MC, 42MC, 46MC, 50MC, 60MC, 70MC, 80MC, 90MC, 98MC, 40MEB, G/S50MEC, S65MEC, G/S60MEC, G/S70MEC, G/K80MEC, S90MEC, G95MEC' },
  { image: assets.man, width: 720, height: 977, alt: 'MAN medium-speed engines', title: 'MAN', models: '16/24, 23/30, 21/31, 28/32, 27/38, 32/40' },
  { image: assets.wartsila, width: 720, height: 977, alt: 'Wartsila', title: tr('wartsila_title'), models: 'RTA48, RTA52, RTA58, RTA62, RTA68, RTA72, Flex48, Flex50, Flex58, Flex82, Flex84, WX72, X52, X62, X72' },
  { image: assets.daihatsu, width: 720, height: 977, alt: 'Daihatsu', title: tr('daihatsu_title'), models: 'DC17, DK20, DE18, DE23, DK26, DK28, DL24, DK32' },
  { image: assets.yanmar, width: 720, height: 977, alt: 'Yanmar', title: tr('yanmar_title'), models: tr('yanmar_models') },
  { image: assets.mitsubishi, width: 720, height: 977, alt: 'Mitsubishi', title: tr('mitsubishi_title'), models: 'UEC33, UEC33LSE, UEC43LSII, UEC50LSII, UEC250LSE, UEC52LA, UEC60LS3, UEC68LSE, UEC85' },
  { image: assets.exportValves, width: 1200, height: 1629, alt: 'Export and customized valves', title: tr('export_brand_title'), models: tr('export_brand_models'), description: tr('export_brand_desc') }
]);
</script>

<template>
  <section id="engines" class="section bg-white">
    <SectionHeading label="Compatibility" :title="tr('engines_title')" :subtitle="tr('engines_subtitle')" />
    <div class="engine-grid">
      <article v-for="engine in engines" :key="engine.title" class="engine-card">
        <div class="eng-preview" :style="{ '--preview-img': `url(${engine.image})` }" tabindex="0">
          <img class="eng-img" :src="engine.image" :alt="engine.alt" :width="engine.width" :height="engine.height" loading="lazy" decoding="async">
        </div>
        <div class="eng-body"><h3>{{ engine.title }}</h3><div class="models">{{ engine.models }}</div><p v-if="engine.description" class="engine-description">{{ engine.description }}</p></div>
      </article>
    </div>
  </section>
</template>
