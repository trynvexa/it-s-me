<template>
  <section id="proyek" ref="rootRef" class="relative py-16 md:py-24">
    <Starburst :size="60" class="floaty absolute top-16 right-[5%] hidden opacity-80 md:block" :rotate="10" style="--fl-rot: 10deg" />
    <div class="ed-container relative">
      <div class="proj-watermark font-display" aria-hidden="true" data-drift>WORKS★WORKS</div>
      <SectionHeader eyebrow="✳ 6 Karya Pilihan" sub="Satu showcase besar + lima stiker. Klik kartu untuk baca studi kasusnya.">
        MY <span class="inline-block -rotate-2 rounded-2xl border-[3px] border-ink bg-lime px-4 shadow-[5px_5px_0_#141414]">WORKS!</span>
      </SectionHeader>
      <div class="proj-progress" aria-hidden="true"><span data-scrub-line></span></div>

      <article
        class="sticker sticker-hover group sticky top-24 overflow-hidden"
        style="transform: rotate(-0.6deg)"
        data-proj-card
        data-rot="-0.6"
      >
        <div class="grid h-full md:grid-cols-2" data-stack-inner>
        <RouterLink :to="`/proyek/${projects[0].slug}`" class="relative block overflow-hidden border-b-[3px] border-ink bg-cream md:border-r-[3px] md:border-b-0" data-parallax-img>
          <img :src="projects[0].img" :alt="'Screenshot ' + projects[0].title" class="ed-img aspect-[16/10] h-full w-full object-cover transition-[scale] duration-500 ease-out group-hover:scale-[1.06] md:aspect-auto" loading="eager" decoding="async" @error="onImgError" />
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
            <a :href="projects[0].demo" target="_blank" rel="noopener" class="btn-lime flex-1 !px-6 text-center" @click.stop>Kunjungi!</a>
            <RouterLink :to="`/proyek/${projects[0].slug}`" class="btn-line flex-1 !px-6 text-center">Studi kasus →</RouterLink>
          </div>
        </div>
        </div>
      </article>

      <div class="relative z-[1] mt-7 flex flex-col gap-6 md:gap-8">
        <article
          v-for="(p, i) in projects.slice(1)"
          :key="p.slug"
          class="sticker sticker-hover group sticky top-24 overflow-hidden"
          :style="{ transform: `rotate(${i % 2 === 0 ? '1' : '-1'}deg)` }"
          data-proj-card
          :data-rot="i % 2 === 0 ? 1 : -1"
        >
          <div class="grid h-full md:grid-cols-[1.15fr_1fr]" data-stack-inner>
          <RouterLink :to="`/proyek/${p.slug}`" class="block" :class="i % 2 ? 'md:order-2' : ''">
            <div class="relative h-full overflow-hidden border-b-[3px] border-ink bg-cream md:border-b-0" :class="i % 2 ? 'md:border-l-[3px]' : 'md:border-r-[3px]'" data-parallax-img>
              <img :src="p.img" :alt="'Screenshot ' + p.title" class="ed-img aspect-[16/10] w-full object-cover transition-[scale] duration-500 ease-out group-hover:scale-[1.06] md:aspect-auto md:h-full" loading="lazy" decoding="async" @error="onImgError" />
              <span class="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="rounded-full border-[2.5px] border-ink bg-surface px-4 py-2 text-[13px] font-extrabold">Lihat studi kasus →</span>
              </span>
              <span class="badge-lime absolute top-3 left-3 !text-[10px]">{{ p.year }}</span>
              <span class="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink bg-lime shadow-[3px_3px_0_#141414] transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight :size="17" stroke-width="3" /></span>
            </div>
          </RouterLink>
            <div class="flex flex-col p-5">
              <p class="font-display text-4xl leading-none text-transparent" style="-webkit-text-stroke: 2px #141414;">{{ String(i + 2).padStart(2, '0') }}</p>
              <h3 class="font-display mt-1.5 text-[1.35rem] leading-tight">{{ p.title }}</h3>
              <p class="mt-1.5 line-clamp-2 text-[0.9rem] leading-relaxed font-medium text-muted">{{ p.desc }}</p>
              <div class="mt-3.5 flex flex-wrap items-center gap-1.5">
                <span v-for="t in p.tech" :key="t" class="chip-pop">{{ t }}</span>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700"><span class="h-1 w-1 animate-pulse rounded-full bg-emerald-500"></span>{{ p.status }}</span>
              </div>
              <div class="mt-auto flex gap-2.5 pt-4">
                <a :href="p.demo" target="_blank" rel="noopener" class="btn-ink flex-1 !px-4 !py-2 !text-[12px]" @click.stop>Kunjungi!</a>
                <RouterLink :to="`/proyek/${p.slug}`" class="btn-line flex-1 !px-4 !py-2 !text-[12px]">Detail →</RouterLink>
              </div>
            </div>
          </div>
        </article>
      </div>

      <RouterLink
        to="/#contact"
        class="reveal mt-7 flex flex-col items-center gap-2 rounded-[26px] border-[3px] border-dashed border-ink/40 bg-surface/60 px-6 py-8 text-center transition-all hover:-translate-y-1 hover:border-ink hover:bg-lime-soft hover:shadow-[7px_7px_0_#141414]"
        data-reveal="up"
      >
        <p class="font-display text-2xl md:text-3xl">Mau lihat yang lain? 👀</p>
        <p class="text-sm font-bold text-muted">Minta full list karya langsung ke saya →</p>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import Starburst from './Starburst.vue'
import { projects } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const rootRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

function onImgError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}

// Tiap kartu main SENDIRI pas masuk viewport: mental dari sisi bergantian,
// foto nge-zoom masuk. Dijamin satu-satu walau scroll pelan.
async function setupCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const root = rootRef.value
  if (!root || !document.contains(root)) return
  const w = window as unknown as { __introDone?: boolean }
  if (!w.__introDone) {
    await Promise.race([
      new Promise<void>((res) => window.addEventListener('intro:done', () => res(), { once: true })),
      new Promise<void>((res) => setTimeout(res, 3500)),
    ])
  }
  if (!document.contains(root)) return
  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-proj-card]')
    const inners = gsap.utils.toArray<HTMLElement>('[data-stack-inner]')
    // Tumpukan: kartu yang tertutup mengecil + meredup mengikuti scroll
    inners.forEach((inner, i) => {
      if (i === inners.length - 1) return
      gsap.fromTo(
        inner,
        { scale: 1, filter: 'brightness(1)' },
        {
          scale: 0.94,
          filter: 'brightness(0.7)',
          ease: 'none',
          transformOrigin: 'center top',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top+=140',
            scrub: true,
          },
        },
      )
    })
    gsap.utils.toArray<HTMLElement>('[data-proj-card]').forEach((card, i) => {
      const dir = i % 2 === 0 ? -1 : 1
      const endRot = parseFloat(card.dataset.rot ?? '0')
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, x: dir * 46, rotation: dir * 5, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: endRot,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        },
      )
      // Foto: tirai klip terbuka + zoom mengendap (sinematik)
      const img = card.querySelector('img')
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.25, clipPath: 'inset(0% 100% 0% 0% round 6px)' },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 6px)',
            duration: 1.0,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )
      }
    })
  }, root)
}

onMounted(setupCards)

onUnmounted(() => {
  ctx?.revert()
  ctx = null
})
</script>
