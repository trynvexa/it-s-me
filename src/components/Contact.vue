<template>
  <section id="contact" class="relative py-16 md:py-24">
    <Starburst :size="64" class="floaty absolute top-14 left-[5%] hidden opacity-80 md:block" :rotate="-18" style="--fl-rot: -18deg" />
    <div class="ed-container">
      <SectionHeader eyebrow="Jangan malu-malu" sub="Buat freelance, kolaborasi, atau sekadar say hi. Dibalas < 24 jam!">
        LET'S <span class="inline-block -rotate-2 rounded-2xl border-[3px] border-ink bg-lime px-4 shadow-[5px_5px_0_#141414]">TALK!</span>
      </SectionHeader>

      <div class="grid gap-7 lg:grid-cols-2">
        <div class="reveal sticker -rotate-[0.6deg] p-6 md:p-8" data-reveal="left">
          <p class="font-display text-[1.6rem] leading-tight md:text-[2rem]">Punya ide? Ceritain aja, biar aku yang sulap jadi web!</p>
          <ul class="mt-6 space-y-2.5" data-stagger>
            <li v-for="c in contacts" :key="c.label">
              <a :href="c.href" target="_blank" rel="noopener" class="group flex items-center gap-3.5 rounded-2xl border-[2.5px] border-ink bg-[#fffdf6] p-3 transition-all hover:-translate-y-1 hover:bg-lime-soft hover:shadow-[5px_5px_0_#141414]">
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[2.5px] border-ink text-white shadow-[2px_2px_0_#141414]" :class="c.bg"><component :is="c.icon" :size="17" /></span>
                <span class="flex-1">
                  <span class="block text-[10px] font-extrabold tracking-[0.16em] uppercase opacity-50">{{ c.label }}</span>
                  <span class="font-extrabold">{{ c.value }}</span>
                </span>
                <ArrowUpRight :size="18" stroke-width="3" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>

        <div class="reveal sticker rotate-[0.6deg] p-6 md:p-8" data-reveal="right" data-delay="120">
          <form @submit.prevent="onSubmit">
            <h3 class="font-display text-3xl">Kirim pesan!</h3>
            <svg viewBox="0 0 180 12" class="mt-1.5 h-3 w-40" aria-hidden="true">
              <path d="M3 8 Q 18 2, 33 7 T 63 7 T 93 7 T 123 7 T 153 7 T 177 7" fill="none" stroke="#c9f24b" stroke-width="5" stroke-linecap="round" />
            </svg>
            <p class="mt-1 text-sm font-semibold text-muted">Form ini buka WhatsApp otomatis.</p>
            <label class="mt-5 block">
              <span class="text-[12px] font-extrabold tracking-[0.14em] uppercase">Nama kamu</span>
              <input v-model="nama" type="text" required placeholder="Siapa nih?" class="field mt-1.5" />
            </label>
            <label class="mt-4 block">
              <span class="text-[12px] font-extrabold tracking-[0.14em] uppercase">Pesan kamu</span>
              <textarea v-model="pesan" rows="4" required placeholder="Halo Zikri, bikinin web dong..." class="field mt-1.5 resize-y"></textarea>
            </label>
            <button type="submit" data-magnetic data-confetti :disabled="sending" class="btn-lime mt-6 w-full !py-4 !text-base disabled:opacity-60">
              <Send :size="16" stroke-width="3" /> {{ sending ? 'Buka WhatsApp...' : 'Kirim via WhatsApp!' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="toast" class="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border-[3px] border-ink bg-white px-5 py-3 text-sm font-extrabold shadow-[5px_5px_0_#141414]" role="status">
      <span class="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink">✓</span>
      Pesan siap, lanjut di WhatsApp!
      <button type="button" aria-label="Tutup" @click="toast = false"><X :size="15" stroke-width="3" /></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Send, X } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import Starburst from './Starburst.vue'
import GithubIcon from './brands/GithubIcon.vue'
import InstagramIcon from './brands/InstagramIcon.vue'
import TiktokIcon from './brands/TiktokIcon.vue'
import WhatsappIcon from './brands/WhatsappIcon.vue'

const contacts = [
  { label: 'WhatsApp', value: '+62 813-6738-1826', href: 'https://wa.me/6281367381826', icon: WhatsappIcon, bg: 'bg-emerald-500' },
  { label: 'Instagram', value: '@yo144484', href: 'https://www.instagram.com/yo144484/', icon: InstagramIcon, bg: 'bg-pink-500' },
  { label: 'GitHub', value: 'trynvexa', href: 'https://github.com/trynvexa', icon: GithubIcon, bg: 'bg-grape' },
  { label: 'TikTok', value: '@frince_nael7', href: 'https://www.tiktok.com/@frince_nael7', icon: TiktokIcon, bg: 'bg-ink' },
]

const nama = ref('')
const pesan = ref('')
const sending = ref(false)
const toast = ref(false)

async function onSubmit() {
  const cleanNama = nama.value.trim()
  const cleanPesan = pesan.value.trim()
  if (!cleanNama || !cleanPesan) return
  sending.value = true
  try {
    const text = encodeURIComponent(`Halo Zikri! Saya ${cleanNama}\n\n${cleanPesan}`)
    window.open(`https://wa.me/6281367381826?text=${text}`, '_blank', 'noopener')
    toast.value = true
    nama.value = ''
    pesan.value = ''
    setTimeout(() => (toast.value = false), 4000)
  } finally {
    sending.value = false
  }
}
</script>
