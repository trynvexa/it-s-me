<template>
  <section id="prestasi" class="py-16 md:py-24">
    <div class="ed-container">
      <SectionHeader eyebrow="Pencapaian" sub="Trofi & pengalaman yang membentuk mental bertanding.">
        HALL OF <span class="inline-block rotate-2 rounded-2xl border-[3px] border-ink bg-grape px-4 text-white shadow-[5px_5px_0_#141414]">FAME!</span>
      </SectionHeader>

      <div class="grid gap-7 md:grid-cols-3 md:gap-6">
        <article
          v-for="(a, i) in achievements"
          :key="a.title"
          class="reveal sticker sticker-hover group overflow-hidden"
          :style="{ transform: `rotate(${[-1.2, 0.8, -0.6][i % 3]}deg)` }"
          data-reveal="up"
          data-tilt
          :data-delay="i * 100"
        >
          <div class="relative overflow-hidden border-b-[3px] border-ink" data-parallax-img>
            <img :src="a.img" :alt="a.title" class="ed-img aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
            <span class="badge-lime absolute top-3 left-3 !text-[10px]">{{ a.chip }}</span>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between gap-2">
              <span class="font-display inline-block -rotate-2 rounded-xl border-[2.5px] border-ink bg-lime px-2.5 text-4xl shadow-[3px_3px_0_#141414]">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="rounded-full border-2 border-ink bg-paper px-2.5 py-1 text-[11px] font-extrabold">{{ a.year }}</span>
            </div>
            <h3 class="font-display mt-3 text-[1.3rem] leading-tight">{{ a.title }}</h3>
            <p class="mt-1.5 flex-1 text-[13px] leading-relaxed font-medium text-muted">{{ a.text }}</p>
            <p class="mt-3 border-t-[2.5px] border-dashed border-ink/20 pt-2.5 text-[11px] font-extrabold tracking-[0.12em] uppercase opacity-60">{{ a.tag }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from './SectionHeader.vue'
import { achievements } from '../data/portfolio'
</script>
