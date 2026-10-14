import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePortfolioStore = defineStore('portfolio', () => {
  const introDone = ref(false)
  const activeSection = ref('home')
  const lang = ref('id')

  function setIntroDone(v = true) {
    introDone.value = v
  }
  function setActiveSection(id: string) {
    activeSection.value = id
  }
  function setLang(v: string) {
    lang.value = v
  }

  return { introDone, activeSection, lang, setIntroDone, setActiveSection, setLang }
})
