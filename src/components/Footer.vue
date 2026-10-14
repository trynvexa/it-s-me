<template>
  <footer class="relative mt-4 bg-lime">
    <div class="ed-container pt-10 pb-8">
      <RouterLink :to="{ path: '/', hash: '#contact' }" class="group reveal block text-center" data-reveal="up" aria-label="Hubungi saya">
        <p class="badge-lime !bg-paper">Langkah terakhir!</p>
        <p data-drift class="font-display mx-auto mt-4 max-w-3xl text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95]">
          PUNYA IDE?<br />MARI WUJUDKAN!
          <span class="ml-2 inline-flex h-[0.75em] w-[0.75em] items-center justify-center rounded-full border-[3px] border-ink bg-ink align-baseline text-lime transition-all duration-300 group-hover:rotate-45 group-hover:bg-grape group-hover:text-white"><ArrowUpRight class="h-[0.45em] w-[0.45em]" stroke-width="3" /></span>
        </p>
        <span class="btn-ink mx-auto mt-7" data-confetti>Mulai ngobrol!</span>
      </RouterLink>

      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <div class="sticker rotate-[-0.5deg] p-5">
          <p class="font-display text-xl">Zikri<span class="text-lime-deep">.</span></p>
          <p class="mt-2 text-[13px] leading-relaxed font-semibold text-muted">Front-End Developer & UI Designer — SMK Swasta Mandiri, Medan. Bikin web ceria sejak 2024.</p>
          <div class="mt-4 flex gap-2">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" :title="s.label" class="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink bg-white shadow-[3px_3px_0_#141414] transition-all hover:-translate-y-1 hover:rotate-6 hover:bg-ink hover:text-lime">
              <component :is="s.icon" :size="15" />
            </a>
          </div>
        </div>
        <nav class="sticker rotate-[0.5deg] p-5">
          <p class="text-[11px] font-extrabold tracking-[0.2em] uppercase opacity-50">Peta situs</p>
          <ul class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-extrabold">
            <li v-for="l in links" :key="l.hash">
              <RouterLink :to="{ path: '/', hash: l.hash }" class="hover:bg-lime hover:px-1 rounded transition-all">{{ l.label }}</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="sticker rotate-[-0.4deg] bg-grape p-5 !text-white" style="box-shadow: 7px 7px 0 #141414">
          <p class="text-[11px] font-extrabold tracking-[0.2em] uppercase opacity-70">Kolofon</p>
          <p class="mt-3 text-[13px] leading-relaxed font-semibold opacity-90">Dibangun dengan Vue 3, Tailwind & GSAP. Satu kertas krem, satu hijau lime!</p>
          <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn-lime mt-4 !py-2.5 !text-[13px]">Hubungi saya!</RouterLink>
        </div>
      </div>

      <div class="mt-6 flex flex-col items-center justify-between gap-2 rounded-2xl border-[2.5px] border-ink bg-paper px-5 py-3.5 text-[12px] font-bold sm:flex-row">
        <span>© 2026 M. Zikri Al-Bukhori.</span>
        <span class="inline-flex items-center gap-1.5">Medan, ID <Starburst :size="18" :rotate="12" /></span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from '@lucide/vue'
import Starburst from './Starburst.vue'
import GithubIcon from './brands/GithubIcon.vue'
import InstagramIcon from './brands/InstagramIcon.vue'
import TiktokIcon from './brands/TiktokIcon.vue'
import WhatsappIcon from './brands/WhatsappIcon.vue'

const links = [
  { hash: '#home', label: 'Home' },
  { hash: '#about', label: 'About' },
  { hash: '#proyek', label: 'Proyek' },
  { hash: '#prestasi', label: 'Prestasi' },
  { hash: '#gallery', label: 'Galeri' },
  { hash: '#contact', label: 'Kontak' },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/yo144484/', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/trynvexa', icon: GithubIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@frince_nael7', icon: TiktokIcon },
  { label: 'WhatsApp', href: 'https://wa.me/6281367381826', icon: WhatsappIcon },
]
</script>
