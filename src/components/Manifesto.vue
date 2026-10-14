<template>
  <section class="py-8 md:py-12">
    <div class="ed-container">
      <div class="reveal sticker relative overflow-hidden !border-ink bg-grape px-6 py-12 text-center text-white md:py-16" style="box-shadow: 9px 9px 0 #141414" data-reveal="up" data-tilt>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1.5px,transparent_1.6px)] bg-[size:24px_24px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"></div>
        <Starburst :size="64" color="#c9f24b" class="floaty absolute -top-2 left-6" :rotate="-15" style="--fl-rot: -15deg" />
        <Starburst :size="48" color="#f5f1e8" class="floaty absolute right-8 bottom-6 opacity-90" :rotate="20" style="--fl-rot: 20deg; animation-delay: -2.5s" />
        <Starburst :size="34" color="#c9f24b" class="floaty absolute top-1/2 right-[8%] hidden opacity-90 md:block" :rotate="30" style="--fl-rot: 30deg; animation-delay: -1.2s" />
        <p class="relative badge-lime !bg-paper">✦ Prinsip kerja ✦</p>
        <p class="font-display relative mt-2 text-[5rem] leading-none text-lime" aria-hidden="true">“</p>
        <blockquote class="relative mx-auto -mt-6 max-w-3xl">
          <p data-scrub-words class="font-display text-[1.6rem] leading-[1.25] text-balance md:text-[2.6rem]">
            Saya tidak mengejar tren. Saya membangun yang <span class="hl">tahan lama!</span>
          </p>
        </blockquote>
        <svg viewBox="0 0 200 12" class="relative mx-auto mt-5 h-3 w-44" aria-hidden="true">
          <path d="M3 8 Q 20 2, 38 8 T 73 8 T 108 8 T 143 8 T 178 8 T 197 8" fill="none" stroke="#c9f24b" stroke-width="5" stroke-linecap="round" />
        </svg>
        <p class="relative mt-4 inline-block -rotate-2 rounded-full border-[2.5px] border-ink bg-paper px-4 py-1.5 text-[13px] font-extrabold text-ink shadow-[3px_3px_0_rgba(0,0,0,0.4)]">— Zikri, catatan kerja 2026</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Starburst from './Starburst.vue'
</script>
