<template>
  <div v-if="intro" ref="curtainRef" class="intro-curtain" role="dialog" aria-label="Pembuka">
    <div class="intro-inner flex w-full flex-col items-center">
      <div class="intro-top flex w-full max-w-5xl items-center justify-between gap-2 px-4 pt-4 text-[11px] font-extrabold tracking-wide sm:gap-3 sm:px-6 sm:pt-5 sm:text-[13px]">
        <span class="min-w-0 flex-1 truncate">M. Zikri Al-Bukhori</span>
        <CatLogo :size="48" class="shrink-0" />
        <span class="min-w-0 flex-1 truncate text-right">SMK Swasta Mandiri</span>
      </div>

      <div class="relative mt-8 w-full md:mt-14">
        <div ref="bandRef" class="intro-band relative overflow-hidden border-y-[3px] border-ink">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMid slice" class="block h-[170px] w-full md:h-[200px]" aria-hidden="true">
            <defs>
              <pattern id="doodleTile" width="360" height="200" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="#f5f1e8" stroke-width="11" stroke-linecap="round">
                  <path d="M28 152 l22 -42 22 42 22 -42 22 42" />
                  <circle cx="205" cy="68" r="24" />
                  <path d="M282 152 C270 118 294 98 310 115" />
                </g>
                <g fill="#f5f1e8">
                  <circle cx="125" cy="58" r="9" />
                  <circle cx="322" cy="150" r="9" />
                  <polygon points="252,38 258,52 273,52 261,61 265,76 252,67 239,76 243,61 231,52 246,52" />
                </g>
                <text x="152" y="142" text-anchor="middle" font-size="62" fill="#f5f1e8" transform="rotate(-6 152 130)" style="font-family: 'Luckiest Guy', cursive;">26</text>
              </pattern>
            </defs>
            <rect x="0" y="0" width="1440" height="200" fill="#171310" />
            <rect x="0" y="0" width="1440" height="200" fill="url(#doodleTile)" />
          </svg>
        </div>
        <div ref="photoWrapRef" class="intro-photo-wrap absolute bottom-8 left-1/2 -translate-x-1/2">
          <img
            ref="photoRef"
            :src="asset('/img/zikri-hero.webp')"
            alt=""
            class="relative h-[240px] object-contain sm:h-[280px] md:h-[330px] [filter:drop-shadow(4px_0_0_#fffdf6)_drop-shadow(-4px_0_0_#fffdf6)_drop-shadow(0_4px_0_#fffdf6)_drop-shadow(0_-4px_0_#fffdf6)]"
            draggable="false"
          />
          <span class="intro-blush intro-blush-l" aria-hidden="true"></span>
          <span class="intro-blush intro-blush-r" aria-hidden="true"></span>
          <Starburst :size="42" color="#c9f24b" class="intro-impact absolute -left-16 bottom-10 sm:-left-20" :rotate="-12" />
          <Starburst :size="34" class="intro-impact absolute -right-16 bottom-16 sm:-right-20" :rotate="14" />
          <Starburst :size="26" color="#c9f24b" class="intro-impact absolute -left-10 top-2 sm:-left-14" :rotate="8" />
          <Starburst :size="22" class="intro-impact absolute -right-8 top-10 sm:-right-12" :rotate="-10" />
          <div ref="hiRef" class="intro-hi badge-lime absolute top-6 -right-8 !bg-paper sm:-right-16" aria-hidden="true">{{ hiText }}</div>
        </div>
      </div>

      <div class="relative">
        <Starburst :size="46" class="intro-star floaty absolute top-2 left-2 md:left-10" :rotate="-12" style="--fl-rot: -12deg" />
        <Starburst :size="38" color="#c9f24b" class="intro-star floaty absolute right-2 bottom-0 md:right-12" :rotate="16" style="--fl-rot: 16deg" />
        <p class="intro-name font-doodle mt-6" aria-label="Portfolio">
        <span
          v-for="(c, i) in folioChars"
          :key="i"
          class="intro-ch"
          :style="{ transform: `rotate(${c.r}deg)` }"
        >{{ c.ch }}</span>
      </p>
      </div>
      <p class="badge-lime mt-4">2025 — 2026</p>
      <div class="intro-load-mini mt-4 flex items-center gap-3">
        <div class="intro-bar intro-bar-mini"><span ref="fillRef" class="intro-fill"></span></div>
        <span ref="pctRef" class="intro-pct-mini">0%</span>
      </div>
      <p ref="tipRef" class="intro-tip-mini">lagi ngumpulin stiker…</p>
    </div>
    <button type="button" class="intro-skip-mini" @click.stop="skipIntro">Lewati</button>
  </div>
  <Navbar />
  <RouterView v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { RouterView } from 'vue-router'
import router from './router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CatLogo from './components/CatLogo.vue'
import Starburst from './components/Starburst.vue'
import { asset } from './utils/asset'
import { useGsapScroll } from './composables/useGsapScroll'
import { getLenis } from './composables/useSmoothScroll'
import { useSmoothScroll } from './composables/useSmoothScroll'
import { burstConfetti, useConfettiBurst } from './composables/useConfetti'

useGsapScroll()
useSmoothScroll()
useConfettiBurst()

const intro = ref(true)
const curtainRef = ref<HTMLElement | null>(null)
const bandRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)
const photoWrapRef = ref<HTMLElement | null>(null)
const fillRef = ref<HTMLElement | null>(null)
const pctRef = ref<HTMLElement | null>(null)
const hiRef = ref<HTMLElement | null>(null)
const tipRef = ref<HTMLElement | null>(null)
const hiText = ref('HALO!')
let introTl: gsap.core.Timeline | null = null
let introDone = false

const hiWords = ['HALO!', 'HAI KAMU!', 'MEOW!']
const tipWords = ['lagi ngumpulin stiker…', 'elus kucing dulu…', 'tahan ketawa…']

const folioChars = [
  { ch: 'P', r: -6 },
  { ch: 'O', r: 4 },
  { ch: 'R', r: -3 },
  { ch: 'T', r: 5 },
  { ch: 'F', r: -5 },
  { ch: 'O', r: 4 },
  { ch: 'L', r: -4 },
  { ch: 'I', r: 3 },
  { ch: 'O', r: -5 },
]

function finishIntro() {
  if (introDone) return
  introDone = true
  introTl?.kill()
  introTl = null
  intro.value = false
  document.body.style.overflow = ''
  getLenis()?.start()
  ;(window as unknown as { __introDone?: boolean }).__introDone = true
  window.dispatchEvent(new Event('intro:done'))
  // Hormati deep-link hash (mis. /#proyek) yang tertahan tirai intro
  const h = window.location.hash
  if (h.length > 1) {
    requestAnimationFrame(() => {
      document.querySelector(h)?.scrollIntoView()
    })
  }
}

function skipIntro() {
  if (!intro.value || introDone) return
  if (introTl) {
    introTl.kill()
    introTl = null
  }
  if (curtainRef.value) {
    gsap.to(curtainRef.value, {
      yPercent: -100,
      duration: 0.55,
      ease: 'expo.inOut',
      onComplete: finishIntro,
    })
  } else {
    finishIntro()
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') skipIntro()
}

onMounted(() => {
  // Aturan: tiap reload tanpa hash selalu mendarat di /#home.
  // Lewat replaceState SETELAH router siap supaya tidak ditimpa
  // navigasi awal (yang dulu juga jadi biang teleport).
  router.isReady().then(() => {
    if (!window.location.hash) history.replaceState(null, '', '#home')
  })
  // Selalu mulai dari hero: matikan pemulihan posisi scroll browser
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  window.addEventListener('keydown', onKey)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishIntro()
    return
  }
  document.body.style.overflow = 'hidden'
  // Kunci scroll Lenis selama tirai tampil (terutama Safari iOS)
  getLenis()?.stop()
  const counter = { v: 0 }
  const setProgress = () => {
    const p = Math.round(counter.v)
    if (fillRef.value) fillRef.value.style.width = `${p}%`
    if (pctRef.value) pctRef.value.textContent = `${p}%`
    if (tipRef.value) tipRef.value.textContent = tipWords[Math.min(tipWords.length - 1, Math.floor((p / 100) * tipWords.length))]
  }
  setProgress()
  const popHi = (i: number) => {
    hiText.value = hiWords[i % hiWords.length]
    if (hiRef.value) gsap.fromTo(hiRef.value, { scale: 0.4, rotation: -8 }, { scale: 1, rotation: 4, duration: 0.4, ease: 'back.out(2.5)' })
  }
  // Klik huruf intro → salto kayak hero
  const flipChar = (e: MouseEvent) => {
    const t = (e.target as HTMLElement).closest('.intro-ch')
    if (t) gsap.to(t, { rotationY: '+=360', duration: 0.7, ease: 'back.out(1.2)' })
  }
  curtainRef.value?.addEventListener('click', flipChar)
  gsap.set(photoRef.value, { transformPerspective: 700 })
  introTl = gsap
    .timeline({ onComplete: finishIntro })
    .from('.intro-curtain .badge-lime', { scale: 0, duration: 0.4, ease: 'back.out(2)' }, 0.9)
    .from('.intro-curtain .intro-top', { opacity: 0, y: -14, duration: 0.45, ease: 'power2.out' }, 0)
    .from(bandRef.value, { scaleX: 0, duration: 0.6, ease: 'power4.out' }, 0.1)
    .to('.intro-band svg', { x: 18, duration: 1.4, ease: 'sine.inOut' }, 0.2)
    .from(
      photoRef.value,
      { y: 240, rotation: -4, duration: 0.75, ease: 'back.out(1.4)' },
      0.35,
    )
    .to(photoRef.value, { rotation: 1.5, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.35)
    .to(photoRef.value, { scaleY: 0.9, scaleX: 1.07, duration: 0.14, ease: 'power2.in' }, 1.06)
    .to(photoRef.value, { scaleY: 1, scaleX: 1, duration: 0.7, ease: 'elastic.out(1, 0.35)' }, 1.2)
    .fromTo(
      '.intro-hi',
      { scale: 0, rotation: -12 },
      { scale: 1, rotation: 4, duration: 0.45, ease: 'back.out(2.5)' },
      1.0,
    )
    .fromTo(
      '.intro-impact',
      { scale: 0, rotation: -40 },
      { scale: 1, rotation: 0, duration: 0.35, stagger: 0.08, ease: 'back.out(3)' },
      1.04,
    )
    .to('.intro-impact', { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.6)
    .from(
      '.intro-ch',
      {
        yPercent: 120,
        rotation: (i: number) => [-12, 9, -8, 11, -9, 10, -8, 9, -10][i] ?? 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'back.out(1.8)',
      },
      0.55,
    )
    .from('.intro-load-mini', { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' }, 0.7)
    .from('.intro-tip-mini', { opacity: 0, duration: 0.35 }, 0.75)
    .to(counter, { v: 100, duration: 1.7, ease: 'power1.inOut', onUpdate: setProgress }, 0.25)
    .call(() => popHi(1), [], 1.15)
    .call(() => popHi(2), [], 1.55)
    // Lompat senang + confetti sebelum tirai dibuka
    .to(photoWrapRef.value, { y: -26, duration: 0.28, ease: 'power2.out' }, 1.78)
    .to(photoWrapRef.value, { y: 0, duration: 0.55, ease: 'bounce.out' }, 2.06)
    .call(() => {
      const r = photoRef.value?.getBoundingClientRect()
      if (r) burstConfetti(r.left + r.width / 2, r.top + r.height * 0.3, 34)
    }, [], 1.9)
    .to(curtainRef.value, { yPercent: -100, duration: 0.85, ease: 'expo.inOut', delay: 0.35 })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  introTl?.kill()
  introTl = null
})
</script>
