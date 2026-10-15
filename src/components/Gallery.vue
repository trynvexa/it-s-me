<template>
  <section id="gallery" class="relative py-16 md:py-24">
    <div class="ed-container">
      <SectionHeader eyebrow="Momen" sub="Momen seru. Klik foto buat lihat lebih gede!">
        PHOTO <span class="inline-block rotate-2 rounded-2xl border-[3px] border-ink bg-surface px-4 shadow-[5px_5px_0_#141414]">DUMP!</span>
      </SectionHeader>

      <div class="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
        <figure
          v-for="(g, i) in galleryImages"
          :key="g.src"
          class="reveal sticker group cursor-zoom-in p-2.5"
          :style="{ transform: `rotate(${[-1.5, 1.2, -0.8, 1, -1.2, 0.9][i % 6]}deg)` }"
          data-reveal="up"
          :data-delay="(i % 3) * 90"
          @click="openViewer(i)"
        >
          <div class="zoom relative overflow-hidden rounded-[14px] border-[2.5px] border-ink">
            <img :src="g.src" :alt="g.caption" class="ed-img aspect-square w-full object-cover" loading="lazy" decoding="async" draggable="false" />
            <span class="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-ink bg-lime transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12"><Maximize2 :size="14" stroke-width="3" /></span>
          </div>
          <figcaption class="flex items-center justify-between gap-2 px-1.5 pt-2 pb-1 text-[12px] font-extrabold">
            <span class="truncate rounded-full border-2 border-ink bg-surface px-2.5 py-0.5">{{ g.caption }}</span>
            <span class="shrink-0 rounded-full border-2 border-ink bg-lime px-2 py-0.5 text-[11px] tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <Transition name="viewer">
  <div
    v-if="viewerOpen"
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-5"
    @click.self="viewerOpen = false"
    @touchstart.passive="tStart"
    @touchend.passive="tEnd"
  >
    <button class="absolute top-4 right-4 rounded-full border-[3px] border-ink bg-surface p-2.5 shadow-[3px_3px_0_#141414] transition hover:bg-lime sm:top-5 sm:right-5" aria-label="Tutup" @click="viewerOpen = false">
      <X :size="18" stroke-width="3" />
    </button>
    <button class="absolute bottom-6 left-4 rounded-full border-[3px] border-ink bg-surface p-2.5 shadow-[3px_3px_0_#141414] transition hover:bg-lime sm:top-1/2 sm:right-auto sm:bottom-auto sm:left-8 sm:-translate-y-1/2" aria-label="Sebelumnya" @click="prevViewer">
      <ChevronLeft :size="18" stroke-width="3" />
    </button>
    <div class="sticker w-full max-w-fit overflow-hidden !rounded-2xl p-2">
      <img :src="galleryImages[viewerIndex]?.src" :alt="galleryImages[viewerIndex]?.caption ?? 'Fullscreen'" class="mx-auto max-h-[58vh] w-auto max-w-full rounded-xl object-contain sm:max-h-[72vh]" />
    </div>
    <p class="badge-lime mt-4 max-w-[92vw] !text-[11px]">{{ galleryImages[viewerIndex]?.caption }} — {{ viewerIndex + 1 }}/{{ galleryImages.length }}</p>
    <button class="absolute right-4 bottom-6 rounded-full border-[3px] border-ink bg-surface p-2.5 shadow-[3px_3px_0_#141414] transition hover:bg-lime sm:top-1/2 sm:right-8 sm:bottom-auto sm:-translate-y-1/2" aria-label="Berikutnya" @click="nextViewer">
      <ChevronRight :size="18" stroke-width="3" />
    </button>
  </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, Maximize2, X } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import { galleryImages } from '../data/portfolio'

const viewerOpen = ref(false)
const viewerIndex = ref(0)

function openViewer(i: number) {
  viewerIndex.value = i
  viewerOpen.value = true
}
function prevViewer() {
  viewerIndex.value = (viewerIndex.value - 1 + galleryImages.length) % galleryImages.length
}
function nextViewer() {
  viewerIndex.value = (viewerIndex.value + 1) % galleryImages.length
}

// Swipe HP: geser cukup jauh + dominan horizontal → pindah
let tX = 0
let tY = 0
function tStart(e: TouchEvent) {
  tX = e.touches[0]?.clientX ?? 0
  tY = e.touches[0]?.clientY ?? 0
}
function tEnd(e: TouchEvent) {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - tX
  const dy = (e.changedTouches[0]?.clientY ?? 0) - tY
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextViewer()
    else prevViewer()
  }
}

function onKey(e: KeyboardEvent) {
  if (!viewerOpen.value) return
  if (e.key === 'Escape') viewerOpen.value = false
  if (e.key === 'ArrowLeft') prevViewer()
  if (e.key === 'ArrowRight') nextViewer()
}

watch(viewerOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>
