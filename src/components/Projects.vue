<template>
  <section id="proyek" class="relative py-16 md:py-24">
    <Starburst :size="60" class="floaty absolute top-16 right-[5%] hidden opacity-80 md:block" :rotate="10" style="--fl-rot: 10deg" />
    <div class="ed-container">
      <SectionHeader eyebrow="✳ 6 Karya Pilihan" sub="Satu showcase besar + lima stiker. Klik kartu untuk baca studi kasusnya.">
        MY <span class="inline-block -rotate-2 rounded-2xl border-[3px] border-ink bg-lime px-4 shadow-[5px_5px_0_#141414]">WORKS!</span>
      </SectionHeader>

      <article
        class="reveal sticker sticker-hover group grid overflow-hidden md:grid-cols-2"
        style="transform: rotate(-0.6deg)"
        data-reveal="up"
      >
        <RouterLink :to="`/proyek/${projects[0].slug}`" class="relative block overflow-hidden border-b-[3px] border-ink bg-cream md:border-r-[3px] md:border-b-0" data-parallax-img>
          <img :src="projects[0].img" :alt="'Screenshot ' + projects[0].title" class="ed-img aspect-[16/10] h-full w-full object-cover md:aspect-auto" loading="eager" decoding="async" @error="onImgError" />
          <span class="absolute inset-0 flex items-center justify-center gap-2 bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span class="rounded-full border-[2.5px] border-ink bg-lime px-5 py-2.5 text-sm font-extrabold shadow-[4px_4px_0_#141414]">Lihat studi kasus →</span>
          </span>
          <span class="badge-lime absolute top-4 left-4 !text-[11px]">★ Unggulan</span>
        </RouterLink>
        <div class="flex flex-col justify-center p-6 md:p-9">
          <p class="font-display text-6xl leading-none text-transparent md:text-7xl" style="-webkit-text-stroke: 2.5px #141414;">01</p>
          <h3 class="font-display mt-3 text-[1.9rem] leading-tight md:text-[2.4rem]">{{ projects[0].title }}</h3>
          <p class="mt-2.5 max-w-lg text-[0.95rem] leading-relaxed font-medium text-muted">{{ projects[0].longDesc ?? projects[0].desc }}</p>
          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span v-for="t in projects[0].tech" :key="t" class="chip-pop">{{ t }}</span>
            <span class="inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-600 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>{{ projects[0].status }} • {{ projects[0].year }}</span>
          </div>
          <div class="mt-6 flex flex-wrap gap-2.5">
            <a :href="projects[0].demo" target="_blank" rel="noopener" class="btn-lime !px-6" @click.stop>Kunjungi!</a>
            <RouterLink :to="`/proyek/${projects[0].slug}`" class="btn-line !px-6">Studi kasus →</RouterLink>
          </div>
        </div>
      </article>

      <div class="mt-7 grid gap-7 md:grid-cols-2 md:gap-6">
        <article
          v-for="(p, i) in projects.slice(1)"
          :key="p.slug"
          class="reveal sticker sticker-hover group overflow-hidden"
          :style="{ transform: `rotate(${i % 2 === 0 ? '1' : '-1'}deg)` }"
          data-reveal="up"
          :data-delay="(i % 2) * 100"
        >
          <RouterLink :to="`/proyek/${p.slug}`" class="block">
            <div class="relative overflow-hidden border-b-[3px] border-ink bg-cream" data-parallax-img>
              <img :src="p.img" :alt="'Screenshot ' + p.title" class="ed-img aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" @error="onImgError" />
              <span class="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="rounded-full border-[2.5px] border-ink bg-white px-4 py-2 text-[13px] font-extrabold">Lihat studi kasus →</span>
              </span>
              <span class="badge-lime absolute top-3 left-3 !text-[10px]">{{ p.year }}</span>
              <span class="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink bg-lime shadow-[3px_3px_0_#141414] transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight :size="17" stroke-width="3" /></span>
            </div>
            <div class="p-5">
              <p class="font-display text-4xl leading-none text-transparent" style="-webkit-text-stroke: 2px #141414;">{{ String(i + 2).padStart(2, '0') }}</p>
              <h3 class="font-display mt-1.5 text-[1.35rem] leading-tight">{{ p.title }}</h3>
              <p class="mt-1.5 line-clamp-2 text-[0.9rem] leading-relaxed font-medium text-muted">{{ p.desc }}</p>
              <div class="mt-3.5 flex flex-wrap items-center gap-1.5">
                <span v-for="t in p.tech" :key="t" class="chip-pop">{{ t }}</span>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700"><span class="h-1 w-1 animate-pulse rounded-full bg-emerald-500"></span>{{ p.status }}</span>
              </div>
            </div>
          </RouterLink>
          <div class="flex gap-2.5 px-5 pb-5">
            <a :href="p.demo" target="_blank" rel="noopener" class="btn-ink flex-1 !px-4 !py-2 !text-[12px]" @click.stop>Kunjungi!</a>
            <RouterLink :to="`/proyek/${p.slug}`" class="btn-line flex-1 !px-4 !py-2 !text-[12px]">Detail →</RouterLink>
          </div>
        </article>
      </div>

      <RouterLink
        to="/#contact"
        class="reveal mt-7 flex flex-col items-center gap-2 rounded-[26px] border-[3px] border-dashed border-ink/40 bg-white/60 px-6 py-8 text-center transition-all hover:-translate-y-1 hover:border-ink hover:bg-lime-soft hover:shadow-[7px_7px_0_#141414]"
        data-reveal="up"
      >
        <p class="font-display text-2xl md:text-3xl">Mau lihat yang lain? 👀</p>
        <p class="text-sm font-bold text-muted">Minta full list karya langsung ke saya →</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import Starburst from './Starburst.vue'
import { projects } from '../data/portfolio'

function onImgError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}
</script>
