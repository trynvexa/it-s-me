<template>
  <section ref="rootRef" class="hscroll" aria-label="Sorotan">
    <div class="hscroll-viewport">
      <div ref="trackRef" class="hscroll-track">
        <!-- Layar 1: video dance, langsung diputar, nampak utuh -->
        <article class="hscroll-slide items-center justify-center bg-ink text-white">
          <video
            :src="asset('/video/dance.mp4')"
            class="hscroll-bgmedia absolute inset-0 h-full w-full scale-110 object-cover blur-md brightness-[0.45]"
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
            tabindex="-1"
          />
          <div class="absolute top-16 left-5 flex items-center gap-2 md:top-8 md:left-10">
            <p class="hscroll-pop badge-lime">✦ Layar 01</p>
            <span class="hscroll-pop chip-pop inline-flex items-center gap-1.5 !bg-ink !text-[10px] !text-red-400"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></span>REC</span>
          </div>
          <div class="hscroll-grain" aria-hidden="true"></div>
          <button
            type="button"
            class="chip-pop absolute top-16 right-5 !bg-ink !text-[11px] !text-paper md:top-8 md:right-10"
            :class="soundOn ? '!bg-lime !text-ink' : ''"
            @click="toggleSound"
          >
            {{ soundOn ? '🔊 bersuara!' : '🔇 ketuk buat suara' }}
          </button>
          <div class="relative flex flex-col items-center gap-4 px-5">
            <span class="floaty absolute -top-8 -left-2 text-2xl text-lime md:left-6" style="--fl-rot: -12deg" aria-hidden="true">♪</span>
            <span class="floaty absolute top-1/3 -right-3 text-3xl text-grape md:right-4" style="--fl-rot: 10deg; animation-delay: -1.6s" aria-hidden="true">♫</span>
            <span class="floaty absolute -bottom-4 left-8 text-xl text-paper" style="--fl-rot: 8deg; animation-delay: -3s" aria-hidden="true">♩</span>
            <div class="sticker overflow-hidden !rounded-[20px] p-2" style="transform: rotate(-1deg)">
              <video
                ref="videoRef"
                :src="asset('/video/dance.mp4')"
                class="h-auto max-h-[52svh] w-auto max-w-[86vw] rounded-[14px] bg-ink object-contain md:max-h-[58svh]"
                muted
                loop
                playsinline
                preload="auto"
                aria-label="Video dance"
                @click="toggleSound"
              />
            </div>
            <div class="text-center">
              <p class="hscroll-pop font-doodle text-[clamp(1.8rem,7vw,3.5rem)] leading-none text-white" style="text-shadow: 4px 4px 0 rgba(20,20,20,0.5), 0 0 30px rgba(201,242,75,0.65)">Ngedance!</p>
              <p class="hscroll-pop mt-2 text-[13px] font-extrabold tracking-wide text-white/80">Langsung diputar. Ketuk video buat suara.</p>
            </div>
          </div>
          <span class="hscroll-num font-display" style="-webkit-text-stroke: 2.5px rgba(255,255,255,0.4)" aria-hidden="true">01</span>
          <span class="chip-pop absolute bottom-[3.6rem] left-5 animate-bounce !bg-ink !text-[10px] !text-lime" aria-hidden="true">scroll terus →</span>
          <div class="hscroll-strip bg-lime" aria-hidden="true">
            <div class="marquee py-2">
              <div class="marquee-track">
                <div v-for="half in 2" :key="half" class="flex shrink-0 items-center">
                  <span v-for="k in 4" :key="k" class="flex items-center">
                    <span class="font-display text-sm tracking-[0.2em] whitespace-nowrap text-ink">✦ Ngedance</span>
                    <span class="font-display mx-5 text-sm tracking-[0.2em] whitespace-nowrap text-ink">★</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Layar 2: foto idol utuh -->
        <article class="hscroll-slide items-center justify-center bg-grape text-white">
          <img
            :src="asset('/img/Gallery/idol.webp')"
            alt=""
            aria-hidden="true"
            class="hscroll-bgmedia absolute inset-0 h-full w-full scale-110 object-cover blur-md brightness-[0.5]"
            loading="eager"
            decoding="async"
            draggable="false"
          />
          <div class="hscroll-grain" aria-hidden="true"></div>
          <div class="hscroll-halo" aria-hidden="true"></div>
          <span class="floaty absolute top-[24%] left-[12%] text-2xl text-pink-300" style="--fl-rot: -10deg" aria-hidden="true">♥</span>
          <span class="floaty absolute top-[30%] right-[10%] text-3xl text-white" style="--fl-rot: 12deg; animation-delay: -1.4s" aria-hidden="true">♥</span>
          <span class="floaty absolute bottom-[24%] left-[16%] text-xl text-pink-200" style="--fl-rot: 6deg; animation-delay: -2.6s" aria-hidden="true">♥</span>
          <span class="floaty absolute right-[14%] bottom-[30%] text-xl text-pink-300" style="--fl-rot: -6deg; animation-delay: -3.4s" aria-hidden="true">♥</span>
          <p class="hscroll-pop badge-lime absolute top-16 left-5 md:top-8 md:left-10">✦ Layar 02</p>
          <div class="relative flex flex-col items-center gap-4 px-5">
            <div
              class="sticker relative cursor-pointer !rounded-[6px] !bg-white p-3 pb-12 select-none"
              style="transform: rotate(1deg)"
              data-tilt
              title="Ketuk!"
              @click="pokeYuha"
            >
              <img
                :src="asset('/img/Gallery/idol.webp')"
                alt="Foto istri"
                class="h-auto max-h-[46svh] w-auto max-w-[80vw] rounded-[4px] object-contain md:max-h-[52svh]"
                loading="eager"
                decoding="async"
                draggable="false"
              />
              <p class="font-display absolute right-0 bottom-3 left-0 text-center text-sm text-ink" aria-hidden="true">yuha ♡</p>
              <span class="hscroll-pop badge-lime absolute -top-4 -right-3 rotate-6 !bg-grape !text-sm !text-white" aria-hidden="true">Istri ★</span>
            </div>
            <div class="text-center">
              <p class="hscroll-pop mt-1 text-[13px] font-extrabold tracking-wide text-white/85">Yang selalu bikin semangat.</p>
            </div>
          </div>
          <span class="hscroll-num font-display" style="-webkit-text-stroke: 2.5px rgba(255,255,255,0.4)" aria-hidden="true">02</span>
          <div class="hscroll-strip bg-lime" aria-hidden="true">
            <div class="marquee py-2">
              <div class="marquee-track">
                <div v-for="half in 2" :key="half" class="flex shrink-0 items-center">
                  <span v-for="k in 4" :key="k" class="flex items-center">
                    <span class="font-display text-sm tracking-[0.2em] whitespace-nowrap text-ink">✦ Istri</span>
                    <span class="font-display mx-5 text-sm tracking-[0.2em] whitespace-nowrap text-ink">★</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Layar 3: foto grup — nuansa konser -->
        <article class="hscroll-slide items-center justify-center bg-[#1f1830] text-white">
          <img
            :src="asset('/img/h2h.webp')"
            alt=""
            aria-hidden="true"
            class="hscroll-bgmedia absolute inset-0 h-full w-full scale-110 object-cover blur-md brightness-[0.45]"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div class="hscroll-grain" aria-hidden="true"></div>
          <div class="hscroll-beam hscroll-beam-l" aria-hidden="true"></div>
          <div class="hscroll-beam hscroll-beam-r" aria-hidden="true"></div>
          <p class="hscroll-pop badge-lime absolute top-16 left-5 md:top-8 md:left-10">✦ Layar 03</p>
          <div class="relative flex flex-col items-center gap-4 px-5">
            <div class="sticker overflow-hidden !rounded-[20px] p-2" style="transform: rotate(-1deg)">
              <img
                :src="asset('/img/h2h.webp')"
                alt="Foto grup Hearts2Hearts"
                class="h-auto max-h-[46svh] w-auto max-w-[88vw] rounded-[14px] object-contain md:max-h-[56svh] md:max-w-[72vw]"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>
            <div class="text-center">
              <p class="hscroll-pop font-doodle text-[clamp(1.6rem,6vw,3rem)] leading-none text-white" style="text-shadow: 4px 4px 0 rgba(20,20,20,0.5), 0 0 30px rgba(201,242,75,0.55)">Hearts2Hearts ★</p>
              <p class="hscroll-pop mt-2 text-[13px] font-extrabold tracking-wide text-white/80">Delapan bintang, satu hati.</p>
            </div>
          </div>
          <span class="hscroll-num font-display" style="-webkit-text-stroke: 2.5px rgba(255,255,255,0.4)" aria-hidden="true">03</span>
          <div class="hscroll-strip bg-lime" aria-hidden="true">
            <div class="marquee py-2">
              <div class="marquee-track">
                <div v-for="half in 2" :key="half" class="flex shrink-0 items-center">
                  <span v-for="k in 4" :key="k" class="flex items-center">
                    <span class="font-display text-sm tracking-[0.2em] whitespace-nowrap text-ink">✦ Hearts2Hearts</span>
                    <span class="font-display mx-5 text-sm tracking-[0.2em] whitespace-nowrap text-ink">★</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="hscroll-progress" aria-hidden="true"><span ref="progressRef"></span></div>
    <div class="hscroll-count chip-pop !text-[11px] tabular-nums" aria-hidden="true">0{{ activeIdx + 1 }} / 03</div>
    <div class="hscroll-dots" aria-hidden="true">
      <span v-for="i in 3" :key="i" class="hscroll-dot" :class="{ 'is-on': activeIdx === i - 1 }"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asset } from '../utils/asset'
import { burstConfetti } from '../composables/useConfetti'

gsap.registerPlugin(ScrollTrigger)

const rootRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const activeIdx = ref(0)
const soundOn = ref(false)
const yuhaHits = ref(0)
const wordPool = ['cantik!', 'lucu!', 'uwu!', 'manis!', 'gemes!', 'imut!', '♡']
let ctx: gsap.Context | null = null
let cancelled = false
let offIntro: (() => void) | null = null

function toggleSound() {
  const v = videoRef.value
  if (!v) return
  soundOn.value = !soundOn.value
  v.muted = !soundOn.value
  if (soundOn.value) v.play().catch(() => {})
}

// Kartu Yuha bisa diketuk: mental lucu + kata beterbangan + confetti berkala
function pokeYuha(e: MouseEvent) {
  const frame = e.currentTarget as HTMLElement
  const panel = frame.closest('.hscroll-slide') as HTMLElement | null
  if (!panel) return
  gsap.fromTo(frame, { scale: 0.94 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
  const r = panel.getBoundingClientRect()
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('span')
    s.textContent = wordPool[Math.floor(Math.random() * wordPool.length)]
    s.className = 'hscroll-poke'
    s.setAttribute('aria-hidden', 'true')
    s.style.left = `${e.clientX - r.left}px`
    s.style.top = `${e.clientY - r.top}px`
    panel.appendChild(s)
    gsap.fromTo(
      s,
      { scale: 0, x: 0, y: 0, opacity: 1 },
      {
        scale: 1,
        x: gsap.utils.random(-90, 90),
        y: gsap.utils.random(-150, -70),
        opacity: 0,
        duration: 1 + Math.random() * 0.4,
        delay: i * 0.08,
        ease: 'power2.out',
        onComplete: () => s.remove(),
      },
    )
  }
  yuhaHits.value++
  if (yuhaHits.value % 4 === 0) burstConfetti(e.clientX, e.clientY, 26)
}

async function setup() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Tunggu tirai intro kelar supaya pin-spacer dihitung dari layout final
  const w = window as unknown as { __introDone?: boolean }
  if (!w.__introDone) {
    await Promise.race([
      new Promise<void>((res) => {
        const done = () => {
          offIntro = null
          res()
        }
        offIntro = () => window.removeEventListener('intro:done', done)
        window.addEventListener('intro:done', done, { once: true })
      }),
      new Promise<void>((res) => setTimeout(res, 3500)),
    ])
    offIntro = null
  }
  if (cancelled) return
  const root = rootRef.value
  const track = trackRef.value
  if (!root || !track) return
  root.classList.add('hscroll-ready')

  ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.hscroll-slide')

    // Pecah kata raksasa jadi huruf biar bisa meletup satu-satu
    panels.forEach((p) => {
      const word = p.querySelector('.hscroll-word')
      if (!word) return
      const text = word.textContent ?? ''
      word.innerHTML = ''
      text.split('').forEach((ch) => {
        const s = document.createElement('span')
        s.className = 'hscroll-char'
        s.textContent = ch === ' ' ? ' ' : ch
        word.appendChild(s)
      })
    })

    const dist = () => track.scrollWidth - window.innerWidth
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${dist()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Lepas scroll → meluncur ngunci ke layar terdekat
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.15, max: 0.4 },
          ease: 'power1.inOut',
          delay: 0.05,
        },
        onUpdate: (self) => {
          const i = Math.round(self.progress * (panels.length - 1))
          if (i !== activeIdx.value) activeIdx.value = i
          if (progressRef.value) progressRef.value.style.transform = `scaleX(${self.progress})`
        },
      },
    })

    // Video: muter pas layarnya aktif, pause pas ditinggal
    const videoPanel = panels[0]
    const playVideo = () => videoRef.value?.play().catch(() => {})
    const pauseVideo = () => videoRef.value?.pause()
    ScrollTrigger.create({
      trigger: videoPanel,
      containerAnimation: tween,
      start: 'left center',
      end: 'right center',
      onEnter: playVideo,
      onEnterBack: playVideo,
      onLeave: pauseVideo,
      onLeaveBack: pauseVideo,
    })

    // Background blur nge-zoom pelan selama digeser (konten utama tetap utuh)
    panels.forEach((panel) => {
      const bg = panel.querySelector('.hscroll-bgmedia')
      if (!bg) return
      gsap.fromTo(
        bg,
        { scale: 1 },
        {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    // Huruf meletup tiap layarnya dikunci, redup lagi pas ditinggal
    panels.forEach((panel) => {
      const chars = panel.querySelectorAll('.hscroll-char')
      if (!chars.length) return
      gsap.from(chars, {
        yPercent: 115,
        opacity: 0,
        rotation: () => gsap.utils.random(-14, 14),
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.8)',
        // Mulai dari kelihatan: kalau pin gagal aktif, huruf tetap nongol
        immediateRender: false,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween,
          start: 'left 60%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Badge, caption, chips nge-pop nyusul
    panels.forEach((panel) => {
      const pops = panel.querySelectorAll('.hscroll-pop')
      if (!pops.length) return
      gsap.from(pops, {
        scale: 0,
        rotation: -8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.9)',
        // Mulai dari kelihatan: kalau pin gagal aktif, badge tetap nongol
        immediateRender: false,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween,
          start: 'left 55%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Angka gede melayang pelan lawan arah (parallax)
    panels.forEach((panel) => {
      const num = panel.querySelector('.hscroll-num')
      if (!num) return
      gsap.fromTo(
        num,
        { x: 70 },
        {
          x: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    ScrollTrigger.refresh()
  }, root)
}

onMounted(setup)

onUnmounted(() => {
  cancelled = true
  offIntro?.()
  offIntro = null
  ctx?.revert()
  ctx = null
  rootRef.value?.classList.remove('hscroll-ready')
})
</script>
