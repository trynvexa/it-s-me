<template>
  <section id="about" class="relative overflow-hidden bg-lime">
    <span
      aria-hidden="true"
      class="wm-halo font-display pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-transparent opacity-100 select-none text-[24vw] leading-none md:text-[19rem]"
      data-drift
      style="-webkit-text-stroke: 2.5px rgba(20,20,20,0.13);"
    ><span class="wm-ch">H</span><span class="wm-ch">A</span><span class="wm-ch">L</span><span class="wm-ch">O</span><span class="wm-ch">!</span></span>

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(20,20,20,0.08)_1.5px,transparent_1.6px)] bg-[size:22px_22px] [mask-image:radial-gradient(75%_65%_at_50%_18%,black,transparent)]"></div>
    <Starburst :size="52" color="#8b7cff" class="floaty absolute top-[36%] left-[2.5%] hidden opacity-80 xl:block" :rotate="-16" style="--fl-rot: -16deg" />
    <Starburst :size="40" class="floaty absolute right-[3%] bottom-[14%] hidden opacity-80 xl:block" :rotate="22" style="--fl-rot: 22deg; animation-delay: -2.4s" />

    <div class="ed-container relative py-14 md:py-20">
      <div class="relative max-w-2xl">
        <p class="reveal badge-lime !bg-paper" data-reveal="fade">✳ Tentang Zikri</p>
        <h2 class="reveal font-display mt-4 text-5xl leading-[0.95] md:text-7xl" data-reveal="title" data-drift>
          HELLO!
        </h2>
        <svg viewBox="0 0 220 14" class="reveal mt-2 h-3.5 w-48" data-reveal="fade" aria-hidden="true">
          <path d="M3 10 Q 20 2, 38 8 T 73 8 T 108 8 T 143 8 T 178 8 T 213 8" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round" />
        </svg>
        <p class="reveal mt-4 max-w-xl text-[1.02rem] leading-relaxed font-medium" data-reveal="up">
          Hi, nama saya <strong>Zikri</strong> — Front-End Developer & UI Designer dari
          <strong>Medan</strong> yang suka bikin web yang rapi, cepat, dan penuh warna.
        </p>
      </div>

      <div class="mt-10 grid items-start gap-6 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="reveal relative mx-auto max-w-xs select-none" data-reveal="up" data-hang>
            <span class="absolute top-0 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-ink bg-grape shadow-[2px_2px_0_#141414]" aria-hidden="true"></span>
            <div class="hang-swing pt-4">
              <div class="lanyard" aria-hidden="true"></div>
              <span class="lanyard-clip" aria-hidden="true"></span>
              <div class="hang-card sticker group relative -rotate-2 cursor-grab overflow-hidden !rounded-[20px] p-2.5 shine active:cursor-grabbing">
                <div class="overflow-hidden rounded-[14px]">
                  <img src="/img/zikri-ganteng.jpg" alt="Foto Zikri" class="ed-img aspect-[4/5] w-full object-cover object-top" loading="lazy" decoding="async" draggable="false" />
                </div>
                <p class="flex items-center justify-between px-1.5 pt-2 pb-1 text-[12px] font-extrabold">
                  <span>ZIKRI • RPL</span><span>ID-2024</span>
                </p>
              </div>
            </div>
            <p class="hang-hint badge-lime mx-auto mt-4 w-fit animate-bounce">Tarik fotonya!</p>
            <Starburst :size="56" class="floaty absolute top-6 -right-6" :rotate="15" style="--fl-rot: 15deg" />
          </div>

          <div class="reveal ticket mx-auto mt-6 max-w-xs !rounded-2xl bg-white px-6 py-3.5 text-center" data-reveal="up" data-delay="120">
            <p class="text-[10px] font-extrabold tracking-[0.2em] uppercase opacity-50">Sedang fokus</p>
            <p class="mt-1 text-[14px] font-extrabold">Vue 3 • GSAP • Lenis <span class="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span></p>
            <p class="mt-1 text-[11px] font-bold tabular-nums opacity-50">{{ now }} WIB — Medan</p>
          </div>

          <div ref="factCard" class="reveal sticker mx-auto mt-4 max-w-xs rotate-1 cursor-pointer p-4 text-center select-none" data-reveal="up" data-delay="180" @click="nextFact" title="Klik!">
            <p class="text-[13px] leading-relaxed font-bold">{{ facts[factIdx] }}</p>
            <p class="mt-1.5 text-[10px] font-extrabold tracking-[0.2em] uppercase opacity-40">Klik buat fakta lain!</p>
          </div>
        </div>

        <div class="lg:col-span-8">
          <div class="grid gap-5 sm:grid-cols-3">
            <div class="reveal ticket sticker-hover bg-white p-5 pt-7 text-center" data-reveal="up">
              <span class="mx-auto -mt-11 mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-lime shadow-[3px_3px_0_#141414]"><Rocket :size="19" stroke-width="2.5" /></span>
              <p class="font-display text-4xl"><span data-count="6">0</span>+</p>
              <p class="mt-1 text-[11px] font-extrabold tracking-[0.18em] uppercase opacity-50">Proyek live</p>
            </div>
            <div class="reveal ticket sticker-hover bg-grape p-5 pt-7 text-center !text-white" data-reveal="up" data-delay="90" style="box-shadow: 7px 7px 0 #141414">
              <span class="mx-auto -mt-11 mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-white text-ink shadow-[3px_3px_0_#141414]"><Cpu :size="19" stroke-width="2.5" /></span>
              <p class="font-display text-4xl"><span data-count="8">0</span></p>
              <p class="mt-1 text-[11px] font-extrabold tracking-[0.18em] uppercase opacity-70">Teknologi</p>
            </div>
            <div class="reveal ticket sticker-hover bg-ink p-5 pt-7 text-center !text-lime" data-reveal="up" data-delay="180" style="box-shadow: 7px 7px 0 rgba(20,20,20,0.35)">
              <span class="mx-auto -mt-11 mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-lime bg-lime text-ink"><Clock :size="19" stroke-width="2.5" /></span>
              <p class="font-display text-4xl"><span data-count="2">0</span>+</p>
              <p class="mt-1 text-[11px] font-extrabold tracking-[0.18em] uppercase opacity-60">Tahun ngoding</p>
            </div>
          </div>

          <div class="mt-6 grid content-start gap-5 sm:grid-cols-2">
            <div class="reveal sticker relative rotate-[0.6deg] p-5 pt-6" data-reveal="scale" data-tilt>
              <span class="tape" aria-hidden="true"></span>
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-lime shadow-[3px_3px_0_#141414]"><GraduationCap :size="20" stroke-width="2.5" /></span>
              <p class="font-display mt-3 text-xl">Education</p>
              <ul class="mt-2.5 space-y-2.5 text-[14px] font-semibold">
                <li><span class="block text-[11px] font-extrabold tracking-wider uppercase opacity-50">Sekarang</span>SMK Swasta Mandiri — RPL</li>
                <li><span class="block text-[11px] font-extrabold tracking-wider uppercase opacity-50">Fokus</span>Front-End & UI/UX</li>
                <li><span class="block text-[11px] font-extrabold tracking-wider uppercase opacity-50">Mimpi</span>Startup teknologi sendiri</li>
              </ul>
            </div>

            <div class="reveal sticker relative rotate-[-0.8deg] p-5 pt-6" data-reveal="scale" data-delay="90" data-tilt>
              <span class="tape tape-r" aria-hidden="true"></span>
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-grape text-white shadow-[3px_3px_0_#141414]"><Phone :size="19" stroke-width="2.5" /></span>
              <p class="font-display mt-3 text-xl">Contact</p>
              <ul class="mt-2.5 space-y-2" data-stagger>
                <li v-for="c in contacts" :key="c.label">
                  <a :href="c.href" target="_blank" rel="noopener" class="group inline-flex items-center gap-2.5 font-bold transition-transform hover:-translate-y-0.5">
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa text-white"><component :is="c.icon" :size="14" /></span>
                    <span class="text-[14px] group-hover:underline">{{ c.value }}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="reveal sticker relative rotate-[0.8deg] p-5 pt-6" data-reveal="scale" data-delay="140" data-tilt>
              <span class="tape" aria-hidden="true"></span>
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-white shadow-[3px_3px_0_#141414]"><Languages :size="20" stroke-width="2.5" /></span>
              <p class="font-display mt-3 text-xl">Language</p>
              <ul class="mt-2.5 space-y-2.5 text-[14px] font-bold" data-stagger>
                <li v-for="l in langs" :key="l.name" class="lvl flex items-center justify-between gap-3">
                  {{ l.name }}
                  <span class="flex gap-1">
                    <span v-for="d in 5" :key="d" class="dot h-2.5 w-2.5 rounded-full border-2 border-ink" :class="d <= l.level ? 'bg-lime' : 'bg-white'"></span>
                  </span>
                </li>
              </ul>
            </div>

            <div class="reveal sticker relative rotate-[-0.6deg] p-5 pt-6" data-reveal="scale" data-delay="190" data-tilt>
              <span class="tape tape-r" aria-hidden="true"></span>
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-ink text-lime shadow-[3px_3px_0_rgba(20,20,20,0.3)]"><Wrench :size="19" stroke-width="2.5" /></span>
              <p class="font-display mt-3 text-xl">Softwares</p>
              <div class="mt-2.5 flex gap-2">
                <span v-for="t in techs" :key="t.short" :title="t.name" data-confetti class="wiggle-hover flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border-[2.5px] border-ink text-[13px] font-black text-white shadow-[3px_3px_0_#141414] transition-transform hover:-translate-y-1 hover:rotate-6 active:scale-90" :class="t.bg">{{ t.short }}</span>
              </div>
              <p class="mt-3 text-[13px] leading-relaxed font-semibold opacity-70">Senjata harian buat bangun web modern.</p>
            </div>
          </div>

          <div class="reveal sticker relative mt-6 flex flex-col items-start gap-4 p-5 md:flex-row md:items-center" data-reveal="up">
            <Starburst :size="52" color="#c9f24b" class="floaty absolute -top-7 -right-3" :rotate="14" style="--fl-rot: 14deg" />
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-[2.5px] border-ink bg-lime shadow-[3px_3px_0_#141414]"><Sparkles :size="20" stroke-width="2.5" /></span>
            <div class="flex-1">
              <p class="font-display text-xl">Skills</p>
              <div class="mt-2 flex flex-wrap gap-1.5" data-stagger>
                <span v-for="s in skills" :key="s" data-confetti class="chip-pop cursor-pointer !text-[11px] transition-all hover:bg-lime active:scale-90">{{ s }}</span>
              </div>
            </div>
            <div class="flex shrink-0 gap-2.5">
              <a href="#contact" data-magnetic class="btn-ink !px-5 !py-2.5 !text-[13px]">Hubungi!</a>
              <a href="/cv/CV-Zikri-Al-Bukhori.pdf" download class="btn-line !border-ink !px-5 !py-2.5 !text-[13px]">CV</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { GraduationCap, Phone, Languages, Wrench, Sparkles, Rocket, Cpu, Clock } from '@lucide/vue'
import Starburst from './Starburst.vue'
import GithubIcon from './brands/GithubIcon.vue'
import InstagramIcon from './brands/InstagramIcon.vue'
import TiktokIcon from './brands/TiktokIcon.vue'
import WhatsappIcon from './brands/WhatsappIcon.vue'

const contacts = [
  { label: 'WhatsApp', value: '+62 813-6738-1826', href: 'https://wa.me/6281367381826', icon: WhatsappIcon },
  { label: 'Instagram', value: '@yo144484', href: 'https://www.instagram.com/yo144484/', icon: InstagramIcon },
  { label: 'GitHub', value: 'trynvexa', href: 'https://github.com/trynvexa', icon: GithubIcon },
  { label: 'TikTok', value: '@frince_nael7', href: 'https://www.tiktok.com/@frince_nael7', icon: TiktokIcon },
]

const skills = ['Adaptable', 'Teamwork', 'Disiplin', 'Teliti', 'Cepat belajar']

const langs = [
  { name: 'Indonesia', level: 5 },
  { name: 'English', level: 3 },
]

const techs = [
  { short: 'Vu', name: 'Vue.js', bg: 'bg-emerald-500' },
  { short: 'TS', name: 'TypeScript', bg: 'bg-sky-600' },
  { short: 'TW', name: 'Tailwind CSS', bg: 'bg-cyan-500' },
  { short: 'Gs', name: 'GSAP', bg: 'bg-lime-deep' },
  { short: 'Fg', name: 'Figma', bg: 'bg-grape' },
]

// Fakta seru yang bisa diklik buat ganti-ganti
const facts = [
  'Fun fact: Wednesday Addams di siang hari, ngoding + MLBB di malam hari',
  'Fun fact: pernah begadang cuma buat rapihin 1px yang miring',
  'Fun fact: kopi susu + playlist K-pop = mode fokus maksimal',
]
const factIdx = ref(0)
const factCard = ref<HTMLElement | null>(null)

function nextFact() {
  const el = factCard.value
  if (!el) return
  gsap.to(el, {
    rotationY: '+=180',
    duration: 0.32,
    ease: 'power2.in',
    onComplete: () => {
      factIdx.value = (factIdx.value + 1) % facts.length
      gsap.to(el, { rotationY: '+=180', duration: 0.55, ease: 'back.out(1.4)' })
    },
  })
}

// Jam live Medan
const now = ref('')
let clockTimer = 0

onMounted(() => {
  const tick = () => {
    try {
      now.value = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
      })
    } catch {
      now.value = ''
    }
  }
  tick()
  clockTimer = window.setInterval(tick, 1000)
})

onUnmounted(() => window.clearInterval(clockTimer))

// Kartu gantung: ayunan bandul idle + bisa ditarik lalu melambung balik
let hangCleanup: (() => void) | null = null

onMounted(() => {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const canTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if ((!canHover && !canTouch) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const stage = document.querySelector('[data-hang]')
  const swing = stage?.querySelector('.hang-swing')
  if (!stage || !swing) return
  const strap = swing.querySelector('.lanyard')
  const card = swing.querySelector('.hang-card')
  gsap.set(swing, { transformOrigin: '50% 0px', rotation: -3 })
  gsap.set(strap, { transformOrigin: '50% 0%' })
  const sway = gsap.to(swing, {
    rotation: 3,
    duration: 2.4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
  // Tarikan gaya karet: makin jauh makin nahan
  const R_MAX = 38
  const rubber = (dx: number) => R_MAX * Math.tanh((dx * 0.22) / R_MAX)
  let dragging = false
  let startX = 0
  let startY = 0
  let prevX = 0
  let flick = 0
  let pulled = false
  const hint = stage.querySelector('.hang-hint')
  const down = (e: PointerEvent) => {
    dragging = true
    startX = prevX = e.clientX
    startY = e.clientY
    flick = 0
    sway.pause()
    gsap.killTweensOf([swing, strap, card])
    gsap.to(card, { scale: 1.04, duration: 0.25, ease: 'power2.out' })
  }
  const move = (e: PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    flick = 0.75 * flick + 0.25 * (e.clientX - prevX)
    prevX = e.clientX
    const pull = Math.min(Math.max(dy, 0), 140)
    gsap.set(swing, { rotation: rubber(dx) })
    gsap.set(strap, { scaleY: 1 + pull * 0.0018 })
    gsap.set(card, { y: pull * 0.28 })
  }
  const up = () => {
    if (!dragging) return
    dragging = false
    const current = Number(gsap.getProperty(swing, 'rotation'))
    const fling = gsap.utils.clamp(-46, 46, current + flick * 2.2)
    gsap
      .timeline({ onComplete: () => { if (!dragging) sway.play() } })
      .to(card, { scale: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .to(strap, { scaleY: 1, duration: 1.6, ease: 'elastic.out(1, 0.12)' }, 0)
      .to(card, { y: 0, duration: 1.6, ease: 'elastic.out(1, 0.12)' }, 0)
      .to(swing, { rotation: fling, duration: 0.26, ease: 'power2.out' }, 0)
      .to(swing, { rotation: 0, duration: 2.6, ease: 'elastic.out(1, 0.07)' }, 0.26)
    if (!pulled) {
      pulled = true
      if (hint) gsap.to(hint, { opacity: 0, scale: 0.5, duration: 0.4, delay: 0.8, onComplete: () => hint.remove() })
    }
  }
  stage.addEventListener('pointerdown', down as EventListener)
  window.addEventListener('pointermove', move as EventListener)
  window.addEventListener('pointerup', up)
  window.addEventListener('pointercancel', up)
  hangCleanup = () => {
    stage.removeEventListener('pointerdown', down as EventListener)
    window.removeEventListener('pointermove', move as EventListener)
    window.removeEventListener('pointerup', up)
    window.removeEventListener('pointercancel', up)
    sway.kill()
    gsap.killTweensOf([swing, strap, card])
  }
})

onUnmounted(() => hangCleanup?.())
</script>
