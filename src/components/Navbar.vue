<template>
  <div class="scroll-progress" :style="{ '--p': progress }"></div>
  <header
    class="site-nav fixed inset-x-0 top-0 z-50"
    :class="[hidden && !open ? 'is-hidden' : '']"
  >
    <div class="ed-container pt-3">
    <nav
      class="flex items-center justify-between gap-2 rounded-2xl border-[3px] border-ink bg-paper/90 py-2 pr-2.5 pl-4 shadow-[5px_5px_0_#141414] backdrop-blur-md"
    >
      <RouterLink :to="{ path: '/', hash: '#home' }" data-confetti class="flex shrink-0 items-center gap-2">
        <CatLogo :size="38" />
        <span class="font-display text-2xl tracking-wide">
          Zikri<span class="text-lime-deep">.</span>
        </span>
      </RouterLink>
      <button class="rounded-xl border-[2.5px] border-ink bg-white p-2 shadow-[3px_3px_0_#141414] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:hidden" type="button" @click="open = !open" :aria-label="open ? 'Tutup menu' : 'Buka menu'">
        <Menu v-if="!open" :size="18" />
        <X v-else :size="18" />
      </button>
      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="l in links" :key="l.hash">
          <RouterLink
            :to="{ path: '/', hash: l.hash }"
            class="nav-link"
            :class="active === l.hash.slice(1) && isHome ? 'is-active' : ''"
          >{{ l.label }}</RouterLink>
        </li>
        <li class="ml-2">
          <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn-lime wiggle-hover !py-2 !px-4 !text-[13px]">
            Hubungi!
          </RouterLink>
        </li>
      </ul>
    </nav>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[90] flex flex-col bg-paper md:hidden" role="dialog" aria-modal="true" aria-label="Menu navigasi">
      <div class="ed-container flex items-center justify-between border-b-[3px] border-ink py-3">
        <span class="font-display text-2xl">Zikri<span class="text-lime-deep">.</span></span>
        <button class="rounded-xl border-[2.5px] border-ink bg-lime p-2.5 shadow-[3px_3px_0_#141414]" type="button" @click="open = false" aria-label="Tutup menu">
          <X :size="18" />
        </button>
      </div>
      <nav class="ed-container flex flex-1 flex-col justify-center gap-3">
        <RouterLink
          v-for="(l, i) in links"
          :key="l.hash"
          :to="{ path: '/', hash: l.hash }"
          :style="{ '--i': i, transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)` }"
          class="mnav-item sticker flex items-center justify-between px-5 py-4"
          @click="open = false"
        >
          <span class="font-display text-2xl">{{ l.label }}</span>
          <ArrowUpRight :size="22" />
        </RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#contact' }"
          :style="{ '--i': links.length }"
          class="mnav-item btn-lime mt-3 justify-center !text-lg"
          @click="open = false"
        >
          Hubungi saya!
        </RouterLink>
        <div class="mnav-item mt-5 flex justify-center gap-2.5" :style="{ '--i': links.length + 1 }">
          <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" :title="s.label" class="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-white shadow-[3px_3px_0_#141414] transition-transform hover:-translate-y-1 hover:rotate-6">
            <component :is="s.icon" :size="16" />
          </a>
        </div>
      </nav>
      <p class="ed-container pb-8 text-center text-[11px] font-extrabold tracking-[0.2em] text-muted uppercase">
        Medan, ID — {{ today }}
      </p>
    </div>
  </Teleport>

  <button
    v-show="showBackToTop"
    class="fixed right-5 bottom-5 z-50 rounded-full border-[3px] border-ink bg-lime p-3 shadow-[4px_4px_0_#141414] transition hover:-translate-y-1 hover:rotate-6"
    type="button"
    aria-label="Kembali ke atas"
    @click="toTop"
  >
    <ArrowUp :size="18" stroke-width="3" />
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, ArrowUp, ArrowUpRight } from '@lucide/vue'
import CatLogo from './CatLogo.vue'
import GithubIcon from './brands/GithubIcon.vue'
import InstagramIcon from './brands/InstagramIcon.vue'
import TiktokIcon from './brands/TiktokIcon.vue'
import WhatsappIcon from './brands/WhatsappIcon.vue'
import { getLenis, scrollToTarget } from '../composables/useSmoothScroll'

const links = [
  { hash: '#home', label: 'Home' },
  { hash: '#about', label: 'About' },
  { hash: '#proyek', label: 'Proyek' },
  { hash: '#prestasi', label: 'Prestasi' },
  { hash: '#perjalanan', label: 'Jejak' },
  { hash: '#gallery', label: 'Galeri' },
]

const open = ref(false)
const active = ref('home')

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/yo144484/', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/trynvexa', icon: GithubIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@frince_nael7', icon: TiktokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/6281367381826', icon: WhatsappIcon },
]
const showBackToTop = ref(false)
const hidden = ref(false)
const progress = ref(0)
const route = useRoute()
const isHome = computed(() => route.path === '/')
const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

let observer: IntersectionObserver | null = null
let lastY = 0

function toTop() {
  scrollToTarget(0)
}

function onScroll() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, y / max) : 0
  showBackToTop.value = y > 600
  hidden.value = y > 320 && y > lastY + 4 && !open.value
  if (y < lastY - 4 || y < 320) hidden.value = false
  lastY = y
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  const lenis = getLenis()
  if (v) lenis?.stop()
  else lenis?.start()
})

onMounted(() => {
  lastY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
  const sections = document.querySelectorAll('section[id]')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = (e.target as HTMLElement).id
      })
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
  )
  sections.forEach((s) => observer?.observe(s))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  observer?.disconnect()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.site-nav {
  animation: nav-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
@keyframes nav-in {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
.mnav-item {
  opacity: 0;
  animation: mnav-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i, 0) * 70ms + 60ms);
}
@keyframes mnav-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
  to {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .site-nav,
  .mnav-item {
    animation: none;
  }
  .mnav-item {
    opacity: 1;
  }
}
</style>
