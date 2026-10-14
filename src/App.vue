<template>
  <div v-if="intro" ref="curtainRef" class="intro-curtain" aria-hidden="true">
    <div class="intro-inner flex w-full flex-col items-center">
      <div class="intro-top flex w-full max-w-5xl items-center justify-between px-6 pt-5 text-[13px] font-extrabold tracking-wide">
        <span>M. Zikri Al-Bukhori</span>
        <CatLogo :size="48" />
        <span>SMK Swasta Mandiri</span>
      </div>

      <div class="relative mt-14 w-full">
        <div ref="bandRef" class="intro-band relative overflow-hidden">
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
        <img
          ref="photoRef"
          src="/img/zikri-hero.png"
          alt=""
          class="absolute bottom-8 left-1/2 h-[240px] -translate-x-1/2 object-contain sm:h-[280px] md:h-[330px] [filter:drop-shadow(4px_0_0_#fffdf6)_drop-shadow(-4px_0_0_#fffdf6)_drop-shadow(0_4px_0_#fffdf6)_drop-shadow(0_-4px_0_#fffdf6)]"
          draggable="false"
        />
        <Starburst :size="42" color="#c9f24b" class="intro-impact absolute bottom-24 left-[30%]" :rotate="-12" />
        <Starburst :size="34" class="intro-impact absolute bottom-32 right-[30%]" :rotate="14" />
        <Starburst :size="26" color="#c9f24b" class="intro-impact absolute bottom-[300px] left-[35%]" :rotate="8" />
        <Starburst :size="22" class="intro-impact absolute bottom-[260px] right-[34%]" :rotate="-10" />
        <div class="intro-hi badge-lime absolute bottom-[310px] left-[60%] !bg-paper" aria-hidden="true">HALO!</div>
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
    </div>
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
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { RouterView } from 'vue-router'
import router from './router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CatLogo from './components/CatLogo.vue'
import Starburst from './components/Starburst.vue'
import { useGsapScroll } from './composables/useGsapScroll'
import { getLenis } from './composables/useSmoothScroll'
import { useSmoothScroll } from './composables/useSmoothScroll'
import { useConfettiBurst } from './composables/useConfetti'

useGsapScroll()
useSmoothScroll()
useConfettiBurst()

const intro = ref(true)
const curtainRef = ref<HTMLElement | null>(null)
const bandRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)

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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishIntro()
    return
  }
  document.body.style.overflow = 'hidden'
  // Kunci scroll Lenis selama tirai tampil (terutama Safari iOS)
  getLenis()?.stop()
  gsap.set(photoRef.value, { transformPerspective: 700 })
  gsap
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
    .to(curtainRef.value, { yPercent: -100, duration: 0.85, ease: 'expo.inOut', delay: 0.35 })
})
</script>
