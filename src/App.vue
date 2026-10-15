<template>
  <div v-if="intro" ref="curtainRef" class="intro-curtain" role="dialog" aria-label="Pembuka">
    <div class="intro-dark-top">
      <span>Specialist</span>
      <svg viewBox="0 0 96 16" class="intro-dark-arrow" aria-hidden="true">
        <line x1="0" y1="8" x2="82" y2="8" stroke="currentColor" stroke-width="2" />
        <polyline points="74,1 83,8 74,15" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </div>

    <div class="intro-dark-stage">
      <h1 class="intro-giant intro-giant-back" aria-label="Zikri">
        <span v-for="(c, i) in giant" :key="'b' + i" class="intro-giant-ch">{{ c }}</span>
      </h1>
      <img
        ref="photoRef"
        :src="asset('/img/zikri-hero.webp')"
        alt="Foto Zikri"
        class="intro-dark-photo"
        draggable="false"
      />
      <span class="intro-giant intro-giant-front" aria-hidden="true">
        <span v-for="(c, i) in giant" :key="'f' + i" class="intro-giant-ch">{{ c }}</span>
      </span>
    </div>

    <div class="intro-dark-bottom">
      <span class="truncate">Nael xripp</span>
      <span class="truncate text-right">www.proskills.digital</span>
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
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { RouterView } from 'vue-router'
import router from './router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { asset } from './utils/asset'
import { useGsapScroll } from './composables/useGsapScroll'
import { getLenis } from './composables/useSmoothScroll'
import { useSmoothScroll } from './composables/useSmoothScroll'

useGsapScroll()
useSmoothScroll()

const intro = ref(true)
const curtainRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)
let introTl: gsap.core.Timeline | null = null
let introDone = false

const giant = ['Z', 'I', 'K', 'R', 'I']

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
  introTl = gsap
    .timeline({ onComplete: finishIntro })
    // Baris atas-bawah: tracking merapat + fade
    .from('.intro-dark-top', { opacity: 0, y: -16, letterSpacing: '0.35em', duration: 0.6, ease: 'power2.out' }, 0)
    .from('.intro-dark-bottom', { opacity: 0, y: 16, letterSpacing: '0.2em', duration: 0.6, ease: 'power2.out' }, 0.1)
    // Foto: naik pelan + scale mengendap
    .from(photoRef.value, { y: 160, opacity: 0, scale: 1.12, duration: 1.1, ease: 'power3.out' }, 0.15)
    // Huruf lapis belakang: naik + blur menajam, stagger
    .from('.intro-giant-back .intro-giant-ch', { yPercent: 115, rotate: 5, duration: 0.8, stagger: 0.07, ease: 'expo.out' }, 0.35)
    .fromTo('.intro-giant-back', { filter: 'blur(12px)' }, { filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }, 0.35)
    // Lapis outline datang menyusul (efek kedalaman)
    .from('.intro-giant-front', { opacity: 0, y: 44, filter: 'blur(8px)', duration: 0.9, ease: 'power3.out' }, 0.7)
    // Keluar: huruf terbang ke atas stagger, foto turun-redup, tirai terangkat
    .to('.intro-giant-ch', { yPercent: -115, duration: 0.5, stagger: 0.035, ease: 'power3.in' }, 2.1)
    .to(photoRef.value, { y: -70, opacity: 0, scale: 1.05, duration: 0.55, ease: 'power3.in' }, 2.15)
    .to('.intro-dark-top, .intro-dark-bottom', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.2)
    .to(curtainRef.value, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 2.55)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  introTl?.kill()
  introTl = null
})
</script>
