<template>
  <div class="reveal relative mb-10 text-center md:mb-14" data-reveal="up">
    <Starburst :size="40" class="floaty absolute top-0 left-[8%] hidden opacity-80 md:block" :rotate="-14" style="--fl-rot: -14deg" />
    <Starburst :size="30" color="#c9f24b" class="floaty absolute top-10 right-[10%] hidden opacity-90 md:block" :rotate="18" style="--fl-rot: 18deg; animation-delay: -2s" />
    <span class="reveal badge-lime relative" data-reveal="fade">{{ eyebrow }}</span>
    <h2
      class="reveal font-display relative mt-5 text-[2.3rem] leading-[1.0] text-balance md:text-[3.4rem]"
      data-reveal="title"
      data-drift
    >
      <slot />
    </h2>
    <p v-if="sub" class="mx-auto mt-4 max-w-xl font-medium text-muted">{{ sub }}</p>
  </div>
</template>

<script setup lang="ts">
import Starburst from './Starburst.vue'

withDefaults(
  defineProps<{ eyebrow: string; sub?: string; no?: string; align?: 'left' | 'center' }>(),
  { sub: '', no: '01', align: 'center' },
)
</script>
