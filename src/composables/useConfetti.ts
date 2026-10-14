import { onMounted } from 'vue'
import gsap from 'gsap'

const COLORS = ['#c9f24b', '#8b7cff', '#ffffff', '#141414', '#ff8ab3', '#ffd23f']

/** Ledakan confetti stiker di titik (x, y) layar */
export function burstConfetti(x: number, y: number, n = 30) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const layer = document.createElement('div')
  layer.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;overflow:hidden'
  document.body.appendChild(layer)
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span')
    const s = 7 + Math.random() * 8
    p.style.cssText =
      `position:absolute;left:${x}px;top:${y}px;width:${s.toFixed(0)}px;` +
      `height:${(s * (Math.random() > 0.5 ? 1 : 0.55)).toFixed(0)}px;` +
      `background:${COLORS[i % COLORS.length]};border:2px solid #141414;` +
      `border-radius:${Math.random() > 0.5 ? '50%' : '3px'}`
    layer.appendChild(p)
    const ang = Math.random() * Math.PI * 2
    const dist = 120 + Math.random() * 280
    gsap.to(p, { x: Math.cos(ang) * dist, duration: 0.9 + Math.random() * 0.4, ease: 'power2.out' })
    gsap.to(p, {
      keyframes: [
        { y: -(110 + Math.random() * 230), duration: 0.42, ease: 'power2.out' },
        { y: 320 + Math.random() * 260, duration: 0.8, ease: 'power1.in' },
      ],
    })
    gsap.to(p, { rotation: gsap.utils.random(-380, 380), duration: 1.2, ease: 'power1.out' })
    gsap.to(p, { opacity: 0, duration: 0.3, delay: 0.95 + Math.random() * 0.3 })
  }
  setTimeout(() => layer.remove(), 2300)
}

/** Delegasi global: klik elemen [data-confetti] → confetti di posisi kursor */
export function useConfettiBurst() {
  onMounted(() => {
    const onClick = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest('[data-confetti]')
      if (t) burstConfetti(e.clientX, e.clientY)
    }
    document.addEventListener('click', onClick as EventListener)
  })
}
