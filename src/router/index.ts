import { createRouter, createWebHistory } from 'vue-router'
import { getLenis } from '../composables/useSmoothScroll'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/proyek/:slug',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      const lenis = getLenis()
      if (lenis) {
        // Lenis aktif: scroll lewat Lenis (offset navbar), batalkan scroll router
        return new Promise<false>((resolve) => {
          setTimeout(() => {
            const el = document.querySelector(to.hash as string)
            if (el) lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.4 })
            resolve(false)
          }, 120)
        })
      }
      return new Promise((resolve) => {
        // Tunggu DOM HomeView ter-render sebelum scroll ke anchor
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' as ScrollBehavior }), 80)
      })
    }
    return { top: 0 }
  },
})

export default router
