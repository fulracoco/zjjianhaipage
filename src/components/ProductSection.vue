<script setup>
import { computed } from 'vue';
import { assets } from '../data/assets.js';
import SectionHeading from './SectionHeading.vue';

const props = defineProps({ t: { type: Function, required: true } });
const tr = (key) => props.t(key);

const seatTables = computed(() => [
  { title: 'seat_raw_title', rows: [['material_crmo', '42CrMo'], ['material_sicr', '4Cr10Si2Mo'], ['material_nicr', 'CrNi40/60']] },
  { title: 'seat_harden_title', rows: [['process_hfq', 'High Frequency Quenching'], ['process_alloy_welding', 'Hard Alloy Overlay Welding'], ['process_hvof', 'HVOF (High Velocity Oxy-Fuel)']] },
  { title: 'seat_dimensions_title', rows: [['dim_outer', '50mm - 650mm'], ['dim_inner', '15mm - 400mm'], ['dim_height', '17mm - 400mm'], ['customization', 'custom_desc']] }
]);

const spindleTables = computed(() => [
  { title: 'spindle_raw_title', rows: [['material_sicr_valve', '4Cr10Si2Mo'], ['material_nicrmnn', '23-8N'], ['material_nicrw', 'SNCRW'], ['material_ni', 'NI80A']] },
  { title: 'surface_harden_title', rows: [['process_hfq', 'High Frequency Quenching'], ['hard_alloy_welding', 'Hard Alloy Overlay Welding'], ['hydraulic_rolling', 'Hydraulic Rolling']] },
  { title: 'stem_harden_title', rows: [['chrome_plating', 'Chrome-plating'], ['nitriding', 'Nitriding'], ['process_hvof', 'HVOF']] },
  { title: 'spindle_dimensions_title', rows: [['over_length', '200mm - 2000mm'], ['valve_disk', '60mm - 560mm'], ['stem_diam', '14mm - 120mm'], ['customization', 'custom_desc']] }
]);
</script>

<template>
  <section id="products" class="section">
    <SectionHeading label="Products" :title="tr('products_title')" :subtitle="tr('products_subtitle')" />

    <div class="product-category">
      <h3><span class="num">1</span> {{ tr('seat_series') }}</h3>
      <div class="product-detail">
        <img :src="assets.valveSeat" :srcset="`${assets.valveSeatCompact} 600w, ${assets.valveSeatSmall} 720w, ${assets.valveSeat} 1200w`" sizes="(max-width: 900px) calc(100vw - 40px), 576px" :alt="tr('alt_valve_seat')" width="1200" height="1629" loading="lazy" decoding="async">
        <div class="info"><h4>{{ tr('seat_title') }}</h4><p>{{ tr('seat_desc_1') }}</p><p>{{ tr('seat_desc_2') }}</p></div>
      </div>
      <div class="product-detail">
        <div class="info"><h4>{{ tr('seat_precision_title') }}</h4><p v-html="tr('seat_precision_desc')"></p></div>
        <img :src="assets.valveSeatDetail" :srcset="`${assets.valveSeatDetailCompact} 600w, ${assets.valveSeatDetailSmall} 720w, ${assets.valveSeatDetail} 1200w`" sizes="(max-width: 900px) calc(100vw - 40px), 576px" :alt="tr('alt_valve_seat_detail')" width="1200" height="1629" loading="lazy" decoding="async">
      </div>
      <table v-for="(table, index) in seatTables" :key="table.title" class="spec-table" :style="index ? { marginTop: '1.5rem' } : undefined">
        <caption>{{ tr(table.title) }}</caption>
        <tbody><tr v-for="row in table.rows" :key="row[0]"><td>{{ tr(row[0]) }}</td><td>{{ row[1].includes('_') ? tr(row[1]) : row[1] }}</td></tr></tbody>
      </table>
    </div>

    <div class="product-category">
      <h3><span class="num">2</span> {{ tr('spindle_series') }}</h3>
      <div class="product-detail">
        <div class="info"><h4>{{ tr('spindle_title') }}</h4><p>{{ tr('spindle_desc') }}</p></div>
        <img :src="assets.valve" :alt="tr('alt_valve_spindle')" width="893" height="1212" loading="lazy" decoding="async">
      </div>
      <table v-for="(table, index) in spindleTables" :key="table.title" class="spec-table" :style="index ? { marginTop: '1.5rem' } : undefined">
        <caption>{{ tr(table.title) }}</caption>
        <tbody><tr v-for="row in table.rows" :key="row[0]"><td>{{ tr(row[0]) }}</td><td>{{ row[1].includes('_') ? tr(row[1]) : row[1] }}</td></tr></tbody>
      </table>
    </div>
  </section>
</template>
