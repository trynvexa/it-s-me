<template>
  <main>
    <Hero />
    <About />
    <TechBrands />
    <Projects />
    <Manifesto />
    <Achievements />
    <Journey />
    <Gallery />
    <Marquee />
    <Contact />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Hero from '../components/Hero.vue'
import Marquee from '../components/Marquee.vue'
import About from '../components/About.vue'
import TechBrands from '../components/TechBrands.vue'
import Projects from '../components/Projects.vue'
import Manifesto from '../components/Manifesto.vue'
import Achievements from '../components/Achievements.vue'
import Journey from '../components/Journey.vue'
import Gallery from '../components/Gallery.vue'
import Contact from '../components/Contact.vue'

onMounted(() => {
  document.title = 'Zikri'
})
</script>
