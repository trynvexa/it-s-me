<template>
  <section id="home" class="relative overflow-hidden pt-28 md:pt-36">
    <Starburst :size="72" class="floaty absolute top-24 left-[6%] hidden opacity-80 md:block" :rotate="-12" style="--fl-rot: -12deg" />
    <Starburst :size="52" color="#c9f24b" class="floaty absolute top-40 right-[8%] opacity-80" :rotate="20" style="--fl-rot: 20deg; animation-delay: -2s" />

    <div class="ed-container relative text-center">
      <p class="fade-late badge-lime" style="--d: 0ms">Portfolio — Edisi '26</p>

      <h1 class="font-display mt-4 leading-[0.9] tracking-tight" aria-label="Portfolio '26">
        <span class="mast-line"><span>
          <span
            v-for="(c, i) in titleChars"
            :key="i"
            class="giant-char"
            :style="{ transform: `rotate(${c.r}deg) translateY(${c.y}px)`, color: c.lime ? '#a8d92e' : undefined }"
            :class="c.small ? 'text-[clamp(1.2rem,5vw,4.5rem)] text-lime-deep' : 'text-[clamp(2.4rem,10vw,9.5rem)]'"
          >{{ c.ch }}</span>
        </span></span>
      </h1>

      <div class="relative mx-auto mt-2 max-w-5xl md:-mt-[4vw]">
        <div class="flex flex-col items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-4">
          <div class="hero-meta-left order-2 text-center md:order-1 md:pb-10 md:text-left">
            <p class="font-display text-xl leading-tight md:text-2xl">M. ZIKRI<br />AL-BUKHORI</p>
            <p class="mt-2 text-[13px] font-bold tracking-[0.18em] text-muted uppercase">Medan, Indonesia</p>
            <span class="mt-3 inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-white px-3 py-1 text-[12px] font-extrabold shadow-[3px_3px_0_#141414]">
              <span class="relative flex h-2 w-2">
                <span class="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70"></span>
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              </span> Open for projects
            </span>
          </div>

          <figure ref="figRef" class="reveal group relative order-1 z-10 w-60 select-none sm:w-72 md:order-2 md:w-[22rem]" data-reveal="clip" data-hero-figure>
            <Starburst :size="380" color="#c9f24b" class="absolute top-1/2 left-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 animate-[spin_28s_linear_infinite]" :rotate="0" />
            <Starburst :size="44" class="floaty absolute -top-4 -right-8 z-10" :rotate="18" style="--fl-rot: 18deg" />
            <span ref="dragRef" class="hero-drag relative block cursor-grab touch-pan-y active:cursor-grabbing">
              <img
                src="/img/zikri-hero.png"
                alt="Foto Zikri Al-Bukhori"
                class="floaty ed-img relative w-full [filter:drop-shadow(7px_8px_0_#141414)] [mask-image:linear-gradient(to_bottom,black_86%,transparent_99%)]"
                style="--fl-rot: 0deg"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                draggable="false"
              />
              <span class="hero-sticker-tag badge-lime absolute top-[30%] -left-20 hidden! -rotate-[10deg] lg:inline-flex!" aria-hidden="true">★ Front-End</span>
              <span class="hero-sticker-tag badge-lime absolute bottom-[28%] -right-20 hidden! rotate-[8deg] !bg-paper lg:inline-flex!" aria-hidden="true">UI Design ★</span>
            </span>
            <span class="hero-drag-hint badge-lime absolute bottom-3 left-1/2 -translate-x-1/2 -rotate-2 animate-bounce !text-[10px] whitespace-nowrap" aria-hidden="true">Seret aku!</span>
          </figure>

          <div class="hero-meta-right order-3 md:pb-10 md:text-right">
            <p class="text-[13px] font-bold tracking-[0.18em] text-muted uppercase">Jasa</p>
            <ul class="mt-2 space-y-1.5 text-[15px] font-extrabold">
              <li>Front-End Developer</li>
              <li>UI Designer</li>
              <li>GSAP Motion</li>
            </ul>
            <div class="mt-4 flex flex-wrap justify-center gap-2.5 md:justify-end">
              <a href="#proyek" data-magnetic data-confetti class="btn-lime pulse-glow !px-5 !py-2.5 !text-[13px]">Lihat Proyek!</a>
              <a href="/cv/CV-Zikri-Al-Bukhori.pdf" download class="btn-line !px-5 !py-2.5 !text-[13px]">CV</a>
            </div>
          </div>
        </div>
      </div>

      <ul class="hero-social fade-late mt-8 flex flex-wrap justify-center gap-2" style="--d: 540ms">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.href" target="_blank" rel="noopener" class="chip-pop transition-all hover:-translate-y-1 hover:rotate-[-2deg] hover:bg-lime">
            {{ s.label }}
          </a>
        </li>
      </ul>

      <div class="fade-late mt-10 flex justify-center pb-16" style="--d: 620ms">
        <button
          type="button"
          data-magnetic
          data-confetti
          class="wiggle-hover flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-full border-[3px] border-ink bg-lime shadow-[5px_5px_0_#141414] transition-all hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          aria-label="Gulir ke bawah"
          @click="gasDown"
        >
          <span class="animate-bounce text-2xl leading-none font-black">↓</span>
          <span class="font-display text-[10px] tracking-wider">GAS!</span>
        </button>
      </div>
    </div>

    <div class="hero-glow-follow" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import Starburst from './Starburst.vue'
import { scrollToTarget } from '../composables/useSmoothScroll'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/yo144484/' },
  { label: 'GitHub', href: 'https://github.com/trynvexa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/zikri-al-bukhori' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@frince_nael7' },
  { label: 'WhatsApp', href: 'https://wa.me/6281367381826' },
]

// Huruf raksasa acak-rotasi ala referensi (+ '26 lime)
const titleChars = [
  { ch: 'P', r: -7, y: 8, lime: false, small: false },
  { ch: 'o', r: 5, y: -4, lime: false, small: false },
  { ch: 'R', r: -4, y: 6, lime: false, small: false },
  { ch: 't', r: 6, y: -8, lime: false, small: false },
  { ch: 'f', r: -6, y: -2, lime: false, small: false },
  { ch: 'o', r: 4, y: 6, lime: false, small: false },
  { ch: 'l', r: -3, y: -6, lime: false, small: false },
  { ch: 'i', r: 5, y: 4, lime: false, small: false },
  { ch: 'o', r: -5, y: -3, lime: false, small: false },
  { ch: "'26", r: 8, y: -24, lime: true, small: true },
]

const figRef = ref<HTMLElement | null>(null)
const dragRef = ref<HTMLElement | null>(null)
let heroCleanup: (() => void) | null = null

// Tombol GAS!: meluncur ke About + confetti (confetti via delegasi global)
function gasDown() {
  const el = document.getElementById('about')
  if (el) scrollToTarget(el)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const canTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (!canHover && !canTouch) return
  const section = document.getElementById('home')
  const fig = figRef.value
  if (!section || !fig) return

  // Tilt + glow ngikutin mouse (desktop)
  let rX: ((v: number) => void) | null = null
  let rY: ((v: number) => void) | null = null
  if (canHover) {
    rX = gsap.quickTo(fig, 'rotationX', { duration: 0.6, ease: 'power3' })
    rY = gsap.quickTo(fig, 'rotationY', { duration: 0.6, ease: 'power3' })
    gsap.set(fig, { transformPerspective: 900 })
  }
  const move = (e: MouseEvent) => {
    const r = section.getBoundingClientRect()
    section.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
    section.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
    if (pDragging || !rX || !rY) return
    rX(gsap.utils.clamp(-8, 8, (0.5 - (e.clientY - r.top) / r.height) * 12))
    rY(gsap.utils.clamp(-8, 8, ((e.clientX - r.left) / r.width - 0.5) * 12))
  }
  const leave = () => {
    rX?.(0)
    rY?.(0)
  }

  // Foto bisa diseret lalu melenting balik
  const dw = dragRef.value
  let pDragging = false
  let pSX = 0
  let pSY = 0
  let pPX = 0
  let pPY = 0
  let pFX = 0
  let pFY = 0
  let pPulled = false
  const DR = 95
  const rub = (v: number) => DR * Math.tanh((v * 0.32) / DR)
  const hint = fig.querySelector('.hero-drag-hint')
  const pdown = (e: PointerEvent) => {
    e.preventDefault()
    pDragging = true
    pSX = pPX = e.clientX
    pSY = pPY = e.clientY
    pFX = pFY = 0
    try {
      fig.setPointerCapture(e.pointerId)
    } catch {
      /* abaikan */
    }
    fig.style.touchAction = 'none'
    gsap.killTweensOf(dw)
    gsap.to(dw, { scale: 1.05, duration: 0.25, ease: 'power2.out' })
  }
  const pmove = (e: PointerEvent) => {
    if (!pDragging) return
    const dx = e.clientX - pSX
    const dy = e.clientY - pSY
    pFX = 0.7 * pFX + 0.3 * (e.clientX - pPX)
    pFY = 0.7 * pFY + 0.3 * (e.clientY - pPY)
    pPX = e.clientX
    pPY = e.clientY
    gsap.set(dw, { x: rub(dx), y: rub(dy * 0.85) })
  }
  const pup = (e: Event) => {
    if (!pDragging) return
    pDragging = false
    fig.style.touchAction = ''
    try {
      const pid = (e as PointerEvent).pointerId
      if (pid !== undefined && fig.hasPointerCapture(pid)) fig.releasePointerCapture(pid)
    } catch {
      /* abaikan */
    }
    const fx = gsap.utils.clamp(-130, 130, Number(gsap.getProperty(dw, 'x')) + pFX * 2.4)
    const fy = gsap.utils.clamp(-110, 110, Number(gsap.getProperty(dw, 'y')) + pFY * 2.4)
    gsap
      .timeline()
      .to(dw, { scale: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .to(dw, { x: fx, y: fy, duration: 0.28, ease: 'power2.out' }, 0)
      .to(dw, { x: 0, y: 0, duration: 2.2, ease: 'elastic.out(1, 0.08)' }, 0.28)
    if (!pPulled) {
      pPulled = true
      if (hint) gsap.to(hint, { opacity: 0, scale: 0.5, duration: 0.4, delay: 0.6, onComplete: () => hint.remove() })
    }
  }

  // Klik huruf raksasa → salto
  const flip = (e: MouseEvent) => {
    const t = (e.target as HTMLElement).closest('.giant-char')
    if (t) gsap.to(t, { rotationY: '+=360', duration: 0.7, ease: 'back.out(1.2)' })
  }

  section.addEventListener('mousemove', move)
  section.addEventListener('mouseleave', leave)
  section.addEventListener('click', flip)
  fig.addEventListener('pointerdown', pdown as EventListener)
  fig.addEventListener('lostpointercapture', pup as EventListener)
  window.addEventListener('pointermove', pmove as EventListener)
  window.addEventListener('pointerup', pup)
  window.addEventListener('pointercancel', pup)
  heroCleanup = () => {
    section.removeEventListener('mousemove', move)
    section.removeEventListener('mouseleave', leave)
    section.removeEventListener('click', flip)
    fig.removeEventListener('pointerdown', pdown as EventListener)
    fig.removeEventListener('lostpointercapture', pup as EventListener)
    window.removeEventListener('pointermove', pmove as EventListener)
    window.removeEventListener('pointerup', pup)
    window.removeEventListener('pointercancel', pup)
  }
})

onUnmounted(() => heroCleanup?.())
</script>
