<template>
  <section id="perjalanan" class="relative overflow-hidden py-16 md:py-24">
    <Starburst :size="56" color="#c9f24b" class="floaty absolute top-20 left-[4%] hidden opacity-90 md:block" :rotate="12" style="--fl-rot: 12deg" />
    <div class="ed-container">
      <SectionHeader eyebrow="Story time" sub="Tujuh bab dari Medan sampai startup pertama.">
        MY <span class="inline-block -rotate-2 rounded-2xl border-[3px] border-ink bg-lime px-4 shadow-[5px_5px_0_#141414]">JOURNEY!</span>
      </SectionHeader>

      <ol class="relative mx-auto flex max-w-3xl flex-col">
        <svg class="absolute top-2 bottom-2 left-[23px] w-3 md:left-1/2 md:-translate-x-1/2" viewBox="0 0 12 300" preserveAspectRatio="none" aria-hidden="true">
          <polyline :points="zigPts" fill="none" stroke="#141414" stroke-opacity="0.25" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round" />
        </svg>
        <li
          v-for="(j, i) in journey"
          :key="j.year + j.title"
          class="reveal relative flex gap-4 pb-6 pl-16 md:w-1/2 md:pl-0"
          :class="i % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:flex-row-reverse md:pl-12 md:text-right'"
          data-reveal="up"
        >
          <span class="absolute top-1 left-0 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-ink font-display text-[13px] shadow-[4px_4px_0_#141414] md:left-auto"
            :class="[i % 2 === 0 ? 'md:-right-7' : 'md:-left-7', i % 3 === 0 ? 'bg-lime' : i % 3 === 1 ? 'bg-grape text-white' : 'bg-surface']"
          >
            <span v-if="i === 0" class="absolute inset-0 -z-10 animate-ping rounded-2xl bg-lime" aria-hidden="true"></span>
            {{ j.year.slice(2) }}
          </span>
          <div class="sticker flex-1 p-5" :style="{ transform: `rotate(${i % 2 === 0 ? '-0.8' : '0.8'}deg)` }">
            <p class="text-[11px] font-extrabold tracking-[0.18em] text-grape uppercase"><Sparkles :size="11" class="mr-1 inline" />{{ j.era }} • {{ j.year }}</p>
            <h3 class="font-display mt-1 text-xl leading-tight">{{ j.title }}</h3>
            <p class="mt-1.5 text-[13.5px] leading-relaxed font-medium text-muted">{{ j.desc }}</p>
            <div class="mt-3 flex flex-wrap gap-1.5" :class="i % 2 === 1 ? 'md:justify-end' : ''">
              <span v-for="t in j.tags" :key="t" class="chip-pop !text-[10px]">{{ t }}</span>
            </div>
          </div>
        </li>
      </ol>

      <div class="reveal mx-auto mt-4 max-w-2xl text-center" data-reveal="up">
        <RouterLink to="/#contact" class="btn-lime">Wujudkan startup bareng! →</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Sparkles } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import Starburst from './Starburst.vue'
import { journey } from '../data/portfolio'

const zigPts = Array.from({ length: 61 }, (_, i) => `${i % 2 ? 10 : 2},${i * 5}`).join(' ')
</script>
