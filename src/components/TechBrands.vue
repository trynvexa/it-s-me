<template>
  <section class="overflow-hidden py-8" aria-label="Teknologi yang saya pakai">
    <div class="rotate-[-1.2deg] border-y-[3px] border-ink bg-lime py-4">
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          <div v-for="half in 2" :key="half" class="flex shrink-0 items-center">
            <span v-for="(b, i) in brands" :key="b" class="flex items-center">
              <span class="font-display text-xl whitespace-nowrap md:text-2xl" :class="i % 2 === 1 ? 'text-white' : ''" :style="i % 2 === 1 ? '-webkit-text-stroke: 1.5px #141414;' : ''">{{ b }}</span>
              <span class="mx-6 inline-block h-3 w-3 rotate-45 bg-ink"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const brands = ['Vue.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite', 'Figma', 'GitHub', 'Vercel']
</script>
