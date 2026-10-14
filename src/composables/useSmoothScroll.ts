import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

/** Scroll ke target via Lenis (offset navbar), fallback ke native smooth. */
export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : -88,
      duration: 1.4,
    })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  const top = target.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * Smooth scroll fisik (Lenis) yang digerakkan ticker GSAP —
 * satu mesin dengan ScrollTrigger sehingga tidak berantem.
 */
export function useSmoothScroll() {
  onMounted(() => {
    if (lenis) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Semua anchor #xxx lewat Lenis (offset navbar konsisten)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      scrollToTarget(el as HTMLElement)
    }
    document.addEventListener('click', onClick)

    ;(useSmoothScroll as unknown as { _off?: () => void })._off = () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    }
  })

  onUnmounted(() => {
    ;(useSmoothScroll as unknown as { _off?: () => void })._off?.()
  })
}
