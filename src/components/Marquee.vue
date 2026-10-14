<template>
  <div class="marquee border-y-[3px] border-ink bg-ink py-3 text-paper" aria-hidden="true">
    <div class="marquee-track">
      <div v-for="half in 2" :key="half" class="flex shrink-0 items-center">
        <span v-for="(w, i) in words" :key="i" class="flex items-center">
          <span class="font-display text-lg tracking-wide whitespace-nowrap">{{ w }}</span>
          <Starburst :size="26" color="#c9f24b" class="mx-6" :rotate="i * 24" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Starburst from './Starburst.vue'

const words = [
  'FRONT-END DEVELOPER',
  'UI DESIGNER',
  'VUE & TYPESCRIPT',
  'TAILWIND CSS',
  'GSAP MOTION',
  'MEDAN — INDONESIA',
]
</script>
