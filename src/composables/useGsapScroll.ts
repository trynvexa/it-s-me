import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Pecah elemen jadi span per huruf (pertahankan tag inline seperti <em>). */
function splitChars(el: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = []
  const walk = (node: Node, parent: HTMLElement) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment()
      ;(node.textContent ?? '').split('').forEach((ch) => {
        if (ch === ' ' || ch === '\n' || ch === '\t') {
          frag.appendChild(document.createTextNode(' '))
        } else {
          const s = document.createElement('span')
          s.className = 'ch'
          s.textContent = ch
          frag.appendChild(s)
          out.push(s)
        }
      })
      parent.replaceChild(frag, node)
    } else if (node.nodeType === 1) {
      const src = node as HTMLElement
      if (src.tagName === 'BR') return
      Array.from(src.childNodes).forEach((c) => walk(c, src))
    }
  }
  Array.from(el.childNodes).forEach((c) => walk(c, el))
  return out
}

/** Pecah isi elemen jadi span per kata (pertahankan tag inline seperti <em>). */
function splitWords(el: HTMLElement): HTMLElement[] {
  const nodes = Array.from(el.childNodes)
  el.innerHTML = ''
  const out: HTMLElement[] = []
  const pushWord = (tag: string, cls: string, text: string) => {
    const s = document.createElement(tag)
    if (cls) s.className = cls
    s.textContent = text
    el.appendChild(s)
    out.push(s as HTMLElement)
  }
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      node
        .textContent!.split(/(\s+)/)
        .forEach((part) =>
          !part
            ? null
            : /^\s+$/.test(part)
              ? el.appendChild(document.createTextNode(' '))
              : pushWord('span', 'w-word', part),
        )
    } else if (node.nodeType === 1) {
      const src = node as HTMLElement
      src
        .textContent!.split(/(\s+)/)
        .forEach((part) =>
          !part
            ? null
            : /^\s+$/.test(part)
              ? el.appendChild(document.createTextNode(' '))
              : pushWord(src.tagName.toLowerCase(), `${src.className} w-word`, part),
        )
    }
  })
  return out
}

/**
 * Scroll animation ala gsap.com: intro timeline, batch reveal,
 * scrub (kata tersorot, garis progres, parallax) + pin horizontal galeri.
 */
export function useGsapScroll() {
  const route = useRoute()
  let ctx: gsap.Context | null = null
  let mm: gsap.MatchMedia | null = null
  let aliveToken = 0
  const onLoad = () => ScrollTrigger.refresh()

  function teardown() {
    aliveToken++
    mm?.revert()
    mm = null
    // Jangan bunuh trigger milik section horizontal (.hscroll) — dia urus lifecycle sendiri
    ScrollTrigger.getAll().forEach((st) => {
      const t = st.trigger as HTMLElement | null
      if (t?.closest?.('.hscroll')) return
      st.kill()
    })
    ctx?.revert()
    ctx = null
    window.removeEventListener('load', onLoad)
  }

  async function setup() {
    teardown()
    if (reduceMotion()) {
      // Tanpa animasi: pastikan semua konten terlihat (termasuk skill bar).
      document
        .querySelectorAll('.reveal, .reveal-line')
        .forEach((e) => e.classList.add('is-visible'))
      return
    }

    // Tunggu tirai pembuka selesai (hanya first load) supaya intro hero
    // tidak dimainkan di balik tirai.
    const myToken = ++aliveToken
    if (!(window as unknown as { __introDone?: boolean }).__introDone) {
      await Promise.race([
        new Promise<void>((res) =>
          window.addEventListener('intro:done', () => res(), { once: true }),
        ),
        new Promise<void>((res) => setTimeout(res, 3500)),
      ])
    }
    if (myToken !== aliveToken) return

    // Tegaskan posisi di paling atas: font/gambar yang telat muat bisa
    // menggeser layout selama intro; mulai semua pemicu dari posisi 0.
    window.scrollTo(0, 0)

    ctx = gsap.context(() => {
      // 1 — Hero intro timeline (main saat load)
      const mastSpans = gsap.utils.toArray<HTMLElement>('#home .mast-line > span')
      if (mastSpans.length) {
        gsap.from(mastSpans, {
          yPercent: 112,
          filter: 'blur(10px)',
          duration: 1,
          stagger: 0.09,
          ease: 'power3.out',
          delay: 0.1,
          clearProps: 'transform,filter',
        })
      }
      // 1a — Huruf raksasa: meletup satu-satu pas intro
      const giantChars = gsap.utils.toArray<HTMLElement>('#home .giant-char')
      if (giantChars.length) {
        gsap.from(giantChars, {
          scale: 0,
          y: 60,
          rotation: () => gsap.utils.random(-60, 60),
          duration: 0.7,
          stagger: 0.055,
          delay: 0.55,
          ease: 'back.out(1.7)',
        })
        // 1b — ...lalu bergelombang pelan tanpa henti
        gsap.to(giantChars, {
          y: '+=10',
          duration: 1.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.12,
          delay: 2.2,
        })
      }
      // 1c — Blok nama & jasa meluncur dari sisi, label stiker nge-pop
      const metaL = document.querySelector('#home .hero-meta-left')
      if (metaL) {
        gsap.from(metaL, {
          x: -48,
          opacity: 0,
          duration: 0.8,
          delay: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }
      const metaR = document.querySelector('#home .hero-meta-right')
      if (metaR) {
        gsap.from(metaR, {
          x: 48,
          opacity: 0,
          duration: 0.8,
          delay: 0.78,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }
      const heroTags = gsap.utils.toArray<HTMLElement>('#home .hero-sticker-tag')
      if (heroTags.length) {
        gsap.from(heroTags, {
          scale: 0,
          rotation: -30,
          duration: 0.6,
          stagger: 0.16,
          delay: 1.05,
          ease: 'back.out(2)',
          clearProps: 'transform',
        })
      }
      // 1d — Headline terangkat pelan saat hero ditinggal scroll
      gsap.to('#home h1', {
        y: -56,
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom 30%', scrub: 0.6 },
      })
      gsap.utils.toArray<HTMLElement>('#home .fade-late').forEach((el) => {
        const d = parseFloat(el.style.getPropertyValue('--d')) || 0
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          delay: 0.15 + d / 1000,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        })
      })

      // 1b — Entrance foto hero (clip terbuka) + sosmed stagger
      const heroFig = document.querySelector('[data-hero-figure]')
      if (heroFig) {
        gsap.fromTo(
          heroFig,
          { opacity: 0, clipPath: 'inset(6% 5% 6% 5% round 3px)' },
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0% round 3px)',
            duration: 1,
            delay: 0.35,
            ease: 'power3.out',
            clearProps: 'opacity,clipPath',
          },
        )
      }
      const heroSocials = gsap.utils.toArray<HTMLElement>('#home .hero-social li')
      if (heroSocials.length) {
        gsap.from(heroSocials, {
          opacity: 0,
          x: 16,
          duration: 0.5,
          stagger: 0.07,
          delay: 0.75,
          ease: 'power2.out',
          clearProps: 'all',
        })
      }

      // 2 — Batch reveal: elemen yang masuk viewport BERSAMAAN dianimasikan serentak + stagger.
      // Jauh lebih hidup daripada trigger satu-per-satu.
      const revealEls = gsap.utils
        .toArray<HTMLElement>('.reveal')
        // hero ditangani intro di atas; judul memakai animasi per-huruf di bawah
        .filter((el) => !el.closest('#home') && el.dataset.reveal !== 'title')
      const fromVars = (el: HTMLElement): gsap.TweenVars => {
        const variant = el.dataset.reveal ?? 'up'
        const from: gsap.TweenVars = {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          skewY: 0,
          clipPath: 'inset(0% 0% 0% 0% round 3px)',
        }
        if (variant === 'up') from.y = 18
        else if (variant === 'pop') {
          // Stiker ditempel: membesar + naik (rotasi inline dibiarkan utuh)
          from.y = 44
          from.scale = 0.88
        } else if (variant === 'left') from.x = -22
        else if (variant === 'right') from.x = 22
        else if (variant === 'scale') from.scale = 0.955
        else if (variant === 'title') {
          from.y = 44
          from.skewY = 2.5
        } else if (variant === 'clip') {
          from.clipPath = 'inset(6% 5% 6% 5% round 3px)'
        }
        return from
      }
      revealEls.forEach((el) => gsap.set(el, fromVars(el)))
      ScrollTrigger.batch(revealEls, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          ;(batch as HTMLElement[]).forEach((el) => el.classList.add('is-visible'))
          gsap.to(batch as HTMLElement[], {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            skewY: 0,
            clipPath: 'inset(0% 0% 0% 0% round 3px)',
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: 'auto',
            onComplete: () =>
              gsap.set(batch as HTMLElement[], { clearProps: 'opacity,clipPath' }),
          })
        },
      })

      // 2b2 — Judul section: huruf naik berurutan saat masuk viewport
      gsap.utils.toArray<HTMLElement>('[data-reveal="title"]').forEach((el) => {
        if (el.closest('#home')) return
        const chars = splitChars(el)
        if (!chars.length) return
        gsap.set(chars, { yPercent: 70, opacity: 0 })
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.018,
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })

      // 2b3 — Watermark HALO!: bergeser horizontal mengikuti scroll
      const wmHalo = document.querySelector('.wm-halo')
      if (wmHalo) {
        gsap.fromTo(
          wmHalo,
          { xPercent: 8 },
          {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      }

      // 2d — Drift parallax judul & sorotan: melayang pelan mengikuti scroll (scrub)
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
        if (el.closest('[data-hpin]')) return
        gsap.fromTo(
          el,
          { yPercent: 7 },
          {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // 2e — Wipe gambar: bingkai terbuka + foto penuh mengikuti scroll (scrub)
      gsap.utils.toArray<HTMLElement>('[data-wipe]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(14% 8% 14% 8% round 4px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 4px)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 94%', end: 'top 40%', scrub: 0.6 },
          },
        )
      })

      // 2f — Hero scroll-out: teks melayang pudar saat ditinggal scroll
      const heroOut = document.querySelector('#home .hero-out')
      if (heroOut) {
        gsap.to(heroOut, {
          opacity: 0.3,
          y: -50,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom 30%', scrub: 0.6 },
        })
      }

      // 2b — Stagger grup: anak-anak [data-stagger] naik berurutan
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((wrap) => {
        if (wrap.closest('#home')) return
        const items = Array.from(wrap.children) as HTMLElement[]
        if (!items.length) return
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 85%', once: true },
            onComplete: () => gsap.set(items, { clearProps: 'opacity,transform' }),
          },
        )
      })

      // 2c — Angka count-up [data-count="akhir"]
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count || '0')
        if (Number.isNaN(end)) return
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })

      // 3 — Garis tumbuh
      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            delay: Number(el.dataset.delay ?? 0) / 1000,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            onComplete: () => {
              el.classList.add('is-visible')
              gsap.set(el, { clearProps: 'transform' })
            },
          },
        )
      })

      // 4 — Kata tersorot mengikuti scroll (manifesto)
      gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
        const words = splitWords(el)
        gsap.set(words, { opacity: 0.14 })
        gsap.to(words, {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') ?? el,
            start: 'top 72%',
            end: 'bottom 35%',
            scrub: 0.5,
          },
        })
      })

      // 5 — Garis progres terikat scroll (journey)
      gsap.utils.toArray<HTMLElement>('[data-scrub-line]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top 65%',
              end: 'bottom 65%',
              scrub: 0.4,
            },
          },
        )
      })

      // 6 — Parallax foto hero + goyangan idle
      const heroFigEl = document.querySelector('[data-hero-figure]')
      if (heroFigEl) {
        gsap.to(heroFigEl, {
          rotation: 1.6,
          duration: 2.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1.6,
        })
        gsap.to(heroFigEl, {
          y: 70,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      }

      // 6b — Parallax dalam bingkai: gambar bergeser di balik mask (ala gsap.com)
      gsap.utils.toArray<HTMLElement>('[data-parallax-img] img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-parallax-img]'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // 6c — Tombol magnetis (desktop berpointer halus)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gsap.utils.toArray<HTMLElement>('[data-magnetic], .btn-ink, .btn-line, .btn-lime').forEach((el) => {
          if (el.dataset.magneticBound) return
          el.dataset.magneticBound = '1'
          const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
          const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
          el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect()
            xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
            yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: 'elastic.out(1, 0.4)',
              onComplete: () => gsap.set(el, { clearProps: 'transform' }),
            })
          })
        })
      }

      // 6d — Tilt 3D mengikuti kursor (desktop berpointer halus)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((el) => {
          if (el.dataset.tiltBound) return
          el.dataset.tiltBound = '1'
          gsap.set(el, { transformPerspective: 900 })
          const rX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' })
          const rY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' })
          el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect()
            rX(gsap.utils.clamp(-8, 8, (0.5 - (e.clientY - r.top) / r.height) * 14))
            rY(gsap.utils.clamp(-8, 8, ((e.clientX - r.left) / r.width - 0.5) * 14))
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.45)',
              onComplete: () => gsap.set(el, { clearProps: 'rotationX,rotationY' }),
            })
          })
        })
      }
    })

    // 7 — Pin horizontal generik (desktop; mobile geser manual).
    // Pakai: section[data-hpin] > [data-hpin-viewport] > [data-hpin-track] (+ item, count, progress opsional)
    mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const cleanups: (() => void)[] = []
      document.querySelectorAll<HTMLElement>('[data-hpin]').forEach((section) => {
        const viewport = section.querySelector<HTMLElement>('[data-hpin-viewport]')
        const track = section.querySelector<HTMLElement>('[data-hpin-track]')
        if (!viewport || !track) return
        viewport.style.overflow = 'visible'
        const amount = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const bar = section.querySelector<HTMLElement>('[data-hpin-progress]')
        const countEl = section.querySelector<HTMLElement>('[data-hpin-count]')
        const total = track.querySelectorAll('[data-hpin-item]').length || 1
        gsap.to(track, {
          x: () => -amount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${amount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`
              if (countEl) {
                countEl.textContent = String(Math.min(total, Math.floor(self.progress * total) + 1)).padStart(2, '0')
              }
            },
          },
        })
        cleanups.push(() => {
          viewport.style.overflow = ''
        })
      })
      return () => {
        cleanups.forEach((fn) => fn())
      }
    })

    // Segarkan pemicu setelah tiap gambar selesai dimuat (mencegah lompatan posisi)
    const pending = Array.from(document.images).filter((img) => !img.complete)
    if (pending.length) {
      let left = pending.length
      const done = () => {
        left -= 1
        if (left <= 0) ScrollTrigger.refresh()
      }
      pending.forEach((img) => {
        img.addEventListener('load', done, { once: true })
        img.addEventListener('error', done, { once: true })
      })
    }

    window.addEventListener('load', onLoad)
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }
    setTimeout(() => ScrollTrigger.refresh(), 500)
  }

  onMounted(async () => {
    await nextTick()
    setup()
  })

  watch(
    () => route.path,
    async () => {
      await nextTick()
      setTimeout(setup, 120)
    },
  )

  onUnmounted(teardown)
}
