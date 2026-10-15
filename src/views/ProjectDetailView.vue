<template>
  <main class="ed-container pt-28 pb-20 md:pt-32">
    <RouterLink to="/#proyek" class="chip-pop transition-all hover:-translate-y-0.5 hover:bg-lime">
      ← Kembali ke Works!
    </RouterLink>

    <div v-if="project" class="mt-6">
      <div class="flex flex-wrap items-center gap-2.5">
        <span class="badge-lime">Studi kasus — {{ project.year }}</span>
        <span class="badge-lime !bg-surface">{{ project.status }}</span>
      </div>
      <h1 class="font-display mt-5 max-w-3xl text-[2.4rem] leading-[1.0] text-balance md:text-[3.6rem]">{{ project.title }}</h1>
      <p class="mt-4 max-w-2xl leading-relaxed font-medium text-muted">{{ project.longDesc ?? project.desc }}</p>

      <figure class="sticker mt-8 overflow-hidden p-2.5">
        <div class="overflow-hidden rounded-[14px] border-[2.5px] border-ink">
          <img :src="project.img" :alt="'Screenshot ' + project.title" class="aspect-video w-full object-cover" fetchpriority="high" decoding="async" />
        </div>
        <figcaption class="px-1.5 pt-2.5 pb-1 text-[12px] font-extrabold">Screenshot — {{ project.title }}</figcaption>
      </figure>

      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <div v-if="project.features?.length" class="sticker -rotate-[0.5deg] p-6">
          <p class="font-display text-xl">Fitur utama</p>
          <ol class="mt-4 space-y-2.5">
            <li v-for="(f, i) in project.features" :key="f" class="flex items-center gap-3 rounded-xl border-[2.5px] border-ink bg-[#fffdf6] px-4 py-3 text-[14px] font-bold">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink text-[12px] font-black" :class="i % 2 === 0 ? 'bg-lime' : 'bg-grape text-white'">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ f }}
            </li>
          </ol>
        </div>
        <div class="sticker rotate-[0.5deg] bg-lime-soft p-6">
          <p class="font-display text-xl">Teknologi</p>
          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="t in project.tech" :key="t" class="chip-pop">{{ t }}</span>
          </div>
          <div class="mt-5 space-y-2.5">
            <a :href="project.demo" target="_blank" rel="noopener" class="btn-lime w-full">Kunjungi situs!</a>
            <a v-if="project.source" :href="project.source" target="_blank" rel="noopener" class="btn-line w-full">Source code</a>
          </div>
          <div v-if="nextProject" class="mt-5 rounded-xl border-[2.5px] border-ink bg-surface p-4">
            <p class="text-[11px] font-extrabold tracking-[0.18em] uppercase opacity-50">Lanjut ke →</p>
            <RouterLink :to="`/proyek/${nextProject.slug}`" class="font-display mt-1 flex items-center justify-between text-lg">
              {{ nextProject.title }} <span>→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="sticker mt-6 p-12 text-center">
      <h1 class="font-display text-3xl">Yah, nggak ketemu!</h1>
      <p class="mt-2 font-semibold text-muted">Karya “{{ slug }}” nggak ada di daftar.</p>
      <RouterLink to="/#proyek" class="ed-link mt-5 inline-block font-extrabold">← Balik ke Works!</RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { projects, getProjectBySlug } from '../data/portfolio'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))
const nextProject = computed(() => {
  if (!project.value) return undefined
  const idx = projects.findIndex((p) => p.slug === project.value!.slug)
  return projects[(idx + 1) % projects.length]
})

const BASE_TITLE = 'Zikri'

function syncMeta() {
  if (project.value) {
    document.title = `${project.value.title} — Zikri`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', project.value.desc)
  } else {
    document.title = BASE_TITLE
  }
}

onMounted(syncMeta)
watch(project, syncMeta)
</script>
