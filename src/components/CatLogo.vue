<template>
  <span
    ref="rootRef"
    class="cat-logo relative inline-block shrink-0 cursor-pointer select-none"
    :style="{ width: size + 'px', height: size + 'px' }"
    role="img"
    aria-label="Logo kucing Zikri"
    :title="title"
  >
    <svg viewBox="0 0 120 126" class="h-full w-full">
      <defs>
        <linearGradient id="catRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff4d6d" />
          <stop offset="1" stop-color="#e11d48" />
        </linearGradient>
      </defs>
      <g class="cat-ear">
        <polygon points="32,46 26,12 56,30" fill="url(#catRed)" stroke="#141414" stroke-width="5" stroke-linejoin="round" />
        <polygon points="34,38 31,20 48,30" fill="#ffb3c1" />
      </g>
      <g class="cat-ear">
        <polygon points="88,46 94,12 64,30" fill="url(#catRed)" stroke="#141414" stroke-width="5" stroke-linejoin="round" />
        <polygon points="86,38 89,20 72,30" fill="#ffb3c1" />
      </g>
      <path d="M52 32 Q55 22 58 30 Q61 21 64 30" fill="none" stroke="#be123c" stroke-width="3.5" stroke-linecap="round" />
      <ellipse cx="60" cy="68" rx="44" ry="38" fill="url(#catRed)" stroke="#141414" stroke-width="5" />
      <ellipse cx="31" cy="80" rx="7" ry="4.5" fill="#ff8fab" opacity="0.85" />
      <ellipse cx="89" cy="80" rx="7" ry="4.5" fill="#ff8fab" opacity="0.85" />
      <g stroke="#141414" stroke-width="4" stroke-linecap="round" opacity="0.85">
        <line x1="4" y1="64" x2="15" y2="68" />
        <line x1="4" y1="78" x2="15" y2="75" />
        <line x1="116" y1="64" x2="105" y2="68" />
        <line x1="116" y1="78" x2="105" y2="75" />
      </g>
      <g class="cat-eye">
        <ellipse cx="42" cy="62" rx="13" ry="16" fill="#141414" />
        <ellipse class="cat-pupil" cx="42" cy="62" rx="5" ry="10.5" fill="#ff3b5c" />
        <circle cx="38" cy="55" r="3.2" fill="#fff" />
      </g>
      <g class="cat-eye">
        <ellipse cx="78" cy="62" rx="13" ry="16" fill="#141414" />
        <ellipse class="cat-pupil" cx="78" cy="62" rx="5" ry="10.5" fill="#ff3b5c" />
        <circle cx="74" cy="55" r="3.2" fill="#fff" />
      </g>
      <path class="cat-smile" d="M51 86 Q60 93 69 86" fill="none" stroke="#141414" stroke-width="3.5" stroke-linecap="round" />
      <ellipse class="cat-open" cx="60" cy="88" rx="6.5" ry="8" fill="#7f1d1d" stroke="#141414" stroke-width="3" />
      <g class="cat-bow">
        <polygon points="60,108 40,100 40,116" fill="#c9f24b" stroke="#141414" stroke-width="3" stroke-linejoin="round" />
        <polygon points="60,108 80,100 80,116" fill="#c9f24b" stroke="#141414" stroke-width="3" stroke-linejoin="round" />
        <circle cx="60" cy="108" r="5.5" fill="#c9f24b" stroke="#141414" stroke-width="3" />
      </g>
    </svg>
    <span
      ref="bubbleRef"
      class="absolute -top-3 -right-7 rotate-6 rounded-full border-2 border-ink bg-white px-2 py-0.5 text-[10px] font-black whitespace-nowrap shadow-[2px_2px_0_#141414]"
      aria-hidden="true"
    >MEOW!</span>
  </span>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

withDefaults(defineProps<{ size?: number; title?: string }>(), { size: 36, title: 'Logo kucing Zikri' })

const rootRef = ref<HTMLElement | null>(null)
const bubbleRef = ref<HTMLElement | null>(null)
let timers: number[] = []
let cleanupFns: (() => void)[] = []

function later(fn: () => void, ms: number) {
  timers.push(window.setTimeout(fn, ms))
}

function on<K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) {
  window.addEventListener(type, fn as EventListener, opts)
  cleanupFns.push(() => window.removeEventListener(type, fn as EventListener, opts))
}

const HEARTS = ['#ff6b8a', '#c9f24b', '#8b7cff']

onMounted(() => {
  const root = rootRef.value
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const q = (s: string) => Array.from(root.querySelectorAll(s))
  const eyes = q('.cat-eye')
  const pupils = q('.cat-pupil')
  const ears = q('.cat-ear')
  const smile = root.querySelector('.cat-smile')
  const open = root.querySelector('.cat-open')
  const bubble = bubbleRef.value
  const svg = root.querySelector('svg')
  gsap.set(eyes, { transformOrigin: '50% 55%' })
  gsap.set([open, bubble], { scale: 0, transformOrigin: '50% 50%' })

  // Napas naik-turun pelan
  gsap.to(svg, { y: -1.6, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
  const tiltTo = gsap.quickTo(svg, 'rotation', { duration: 0.5, ease: 'power2' })

  // Hati-hati beterbangan
  const hearts = (n: number) => {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span')
      s.textContent = '♥'
      s.setAttribute('aria-hidden', 'true')
      const fs = 10 + Math.random() * 8
      s.style.cssText =
        `position:absolute;left:${15 + Math.random() * 70}%;top:${25 + Math.random() * 35}%;` +
        `font-size:${fs.toFixed(0)}px;color:${HEARTS[i % HEARTS.length]};pointer-events:none;` +
        `-webkit-text-stroke:1px #141414;`
      root.appendChild(s)
      gsap.to(s, {
        y: -(26 + Math.random() * 22),
        x: gsap.utils.random(-12, 12),
        opacity: 0,
        scale: 0.6 + Math.random() * 0.7,
        duration: 0.9 + Math.random() * 0.4,
        ease: 'power1.out',
        onComplete: () => s.remove(),
      })
    }
  }

  let looking = false
  const shut = (then?: () => void) => {
    gsap.to(eyes, {
      scaleY: 0.07,
      duration: 0.09,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(eyes, { scaleY: 1, duration: 0.14, ease: 'power2.out', onComplete: then })
      },
    })
  }

  // --- Siklus tingkah acak ---
  const doBlink = (done: () => void) => {
    if (Math.random() < 0.22) shut(() => later(() => shut(done), 220))
    else shut(done)
  }
  const doLook = (done: () => void) => {
    looking = true
    gsap
      .timeline({ onComplete: () => { looking = false; done() } })
      .to(pupils, { x: -3.2, duration: 0.22, ease: 'power2.out' })
      .to({}, { duration: 0.3 })
      .to(pupils, { x: 3.2, duration: 0.28, ease: 'power2.inOut' })
      .to({}, { duration: 0.25 })
      .to(pupils, { x: 0, duration: 0.25, ease: 'power2.out' })
  }
  const doYawn = (done: () => void) => {
    gsap
      .timeline({ onComplete: done })
      .to(eyes, { scaleY: 0.1, duration: 0.25, ease: 'power2.in' }, 0)
      .to(open, { scale: 1.35, duration: 0.3, ease: 'back.out(2)' }, 0.1)
      .to(root, { scaleY: 1.07, scaleX: 0.95, duration: 0.35, ease: 'power2.out' }, 0)
      .to({}, { duration: 0.45 })
      .to(open, { scale: 0, duration: 0.2, ease: 'power2.in' }, '>')
      .to(eyes, { scaleY: 1, duration: 0.3, ease: 'back.out(2)' }, '<')
      .to(root, { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' }, '<')
  }
  const doTwitch = (done: () => void) => {
    const ear = ears[Math.floor(Math.random() * ears.length)]
    if (ear) {
      gsap.fromTo(
        ear,
        { rotation: 0 },
        { rotation: 9, duration: 0.09, yoyo: true, repeat: 3, ease: 'power1.inOut', transformOrigin: '50% 90%', onComplete: done },
      )
    } else done()
  }
  const acts = [doBlink, doBlink, doLook, doYawn, doTwitch]
  const cycle = () => {
    const act = acts[Math.floor(Math.random() * acts.length)]
    act(() => later(cycle, 2000 + Math.random() * 2200))
  }

  // Kepala miring + pupil ngikutin kursor
  const qx = pupils.map((p) => gsap.quickTo(p, 'x', { duration: 0.35, ease: 'power2' }))
  const qy = pupils.map((p) => gsap.quickTo(p, 'y', { duration: 0.35, ease: 'power2' }))
  const look = (e: MouseEvent | TouchEvent) => {
    const pt = 'touches' in e && e.touches.length ? e.touches[0] : (e as MouseEvent)
    const r = root.getBoundingClientRect()
    const dx = pt.clientX - (r.left + r.width / 2)
    const dy = pt.clientY - (r.top + r.height / 2)
    tiltTo(gsap.utils.clamp(-6, 6, dx / 45))
    if (looking) return
    const m = Math.hypot(dx, dy) || 1
    const cx = gsap.utils.clamp(-3.4, 3.4, (dx / m) * Math.min(3.4, m / 60))
    const cy = gsap.utils.clamp(-2.8, 2.8, (dy / m) * Math.min(2.8, m / 60))
    qx.forEach((f) => f(cx))
    qy.forEach((f) => f(cy))
  }
  on('mousemove', look)
  on('touchmove', look, { passive: true })

  // Hover: goyang gemas + hati (dibatasi biar nggak spam)
  let lastHover = 0
  const boing = () => {
    const now = performance.now()
    gsap.timeline()
      .to(root, { scaleY: 0.88, scaleX: 1.08, duration: 0.12, ease: 'power2.in', overwrite: 'auto' })
      .to(root, { scaleY: 1, scaleX: 1, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
    if (now - lastHover > 2500) {
      lastHover = now
      hearts(2)
    }
  }
  root.addEventListener('mouseenter', boing)
  cleanupFns.push(() => root.removeEventListener('mouseenter', boing))

  // Klik: trik acak — meong / lompat / salto
  let acting = false
  const meow = (done: () => void) => {
    gsap
      .timeline({ onComplete: done })
      .to(smile, { opacity: 0, duration: 0.08 }, 0)
      .fromTo(open, { scale: 0 }, { scale: 1, duration: 0.25, ease: 'back.out(2.5)' }, 0.05)
      .fromTo(bubble, { scale: 0, rotation: -8 }, { scale: 1, rotation: 6, duration: 0.35, ease: 'back.out(2.5)' }, 0.05)
      .to(open, { scale: 0, duration: 0.2, ease: 'power2.in' }, 0.75)
      .to(bubble, { scale: 0, duration: 0.25, ease: 'power2.in' }, 0.8)
      .to(smile, { opacity: 1, duration: 0.15 }, 0.95)
  }
  const jump = (done: () => void) => {
    hearts(4)
    gsap
      .timeline({ onComplete: done })
      .to(root, { y: -26, duration: 0.28, ease: 'power2.out' }, 0)
      .to(root, { scaleY: 0.9, scaleX: 1.08, duration: 0.28, ease: 'power2.out' }, 0)
      .to(root, { y: 0, duration: 0.5, ease: 'bounce.out' }, 0.28)
      .to(root, { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' }, 0.35)
  }
  const spin = (done: () => void) => {
    hearts(2)
    gsap.to(root, { rotation: '+=360', duration: 0.8, ease: 'back.out(1.2)', onComplete: done })
  }
  const tricks = [meow, jump, spin]
  const trick = () => {
    if (acting) return
    acting = true
    gsap.killTweensOf([smile, open, bubble, root])
    gsap.set(eyes, { scaleY: 1 })
    gsap.set(open, { scale: 0 })
    gsap.set(smile, { opacity: 1 })
    gsap.set(bubble, { scale: 0 })
    gsap.set(root, { scaleX: 1, scaleY: 1, y: 0 })
    const t = tricks[Math.floor(Math.random() * tricks.length)]
    t(() => { acting = false })
  }
  root.addEventListener('click', trick)
  cleanupFns.push(() => root.removeEventListener('click', trick))

  later(cycle, 1400)
})

onUnmounted(() => {
  timers.forEach((t) => window.clearTimeout(t))
  timers = []
  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
  if (rootRef.value) gsap.killTweensOf([rootRef.value, rootRef.value.querySelectorAll('*')])
})
</script>
