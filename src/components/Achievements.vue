<template>
  <section id="prestasi" ref="rootRef" class="relative py-16 md:py-24">
    <div class="ed-container relative">
      <div class="proj-watermark font-display" aria-hidden="true" data-drift>FAME★FAME</div>
      <SectionHeader eyebrow="Pencapaian" sub="Trofi & pengalaman yang membentuk mental bertanding.">
        HALL OF <span class="inline-block rotate-2 rounded-2xl border-[3px] border-ink bg-grape px-4 text-white shadow-[5px_5px_0_#141414]">FAME!</span>
      </SectionHeader>
      <div class="proj-progress" aria-hidden="true"><span data-scrub-line></span></div>

      <div class="relative z-[1] grid gap-7 md:grid-cols-3 md:gap-6">
        <article
          v-for="(a, i) in achievements"
          :key="a.title"
          class="sticker sticker-hover group overflow-hidden"
          :class="i === 0 ? 'md:-translate-y-4' : ''"
          :style="{ transform: `rotate(${[-1.2, 0.8, -0.6][i % 3]}deg)`, borderColor: i === 0 ? '#fbbf24' : undefined }"
          data-ach-card
          :data-rot="[-1.2, 0.8, -0.6][i % 3]"
        >
          <div class="relative overflow-hidden border-b-[3px] border-ink" data-parallax-img>
            <img :src="a.img" :alt="a.title" class="ed-img aspect-[16/10] w-full object-cover transition-[scale] duration-500 ease-out group-hover:scale-[1.06]" loading="lazy" decoding="async" @error="onImgError" />
            <span class="badge-lime absolute top-3 left-3 !text-[10px]">{{ a.chip }}</span>
            <span v-if="i === 0" class="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink bg-amber-300 shadow-[3px_3px_0_#141414]"><Trophy :size="17" stroke-width="2.5" /></span>
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
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import { achievements } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const rootRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

function onImgError(e: Event) {
  ;(e.target as HTMLImageElement).style.display = 'none'
}

// Tiap kartu main sendiri pas masuk viewport + foto reveal klip
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
    gsap.utils.toArray<HTMLElement>('[data-ach-card]').forEach((card, i) => {
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
