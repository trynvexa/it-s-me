export interface Project {
  slug: string
  title: string
  year: string
  desc: string
  longDesc?: string
  img: string
  fallbackIcon: string
  fallbackLabel: string
  status: 'Live' | 'Selesai'
  tech: string[]
  demo: string
  source?: string
  features?: string[]
}

export const projects: Project[] = [
  {
    slug: 'toko-kue',
    title: 'Website Toko Kue',
    year: '2025',
    desc: 'Website toko kue online yang menampilkan katalog produk, menu kue lengkap dengan harga, dan informasi kontak pemesanan. Desain manis dan responsif untuk semua perangkat.',
    longDesc:
      'Katalog produk dengan filter kategori, halaman detail tiap kue, keranjang sederhana via WhatsApp checkout, dan section testimoni. Dibangun mobile-first dengan skor Lighthouse 95+.',
    img: '/img/proyek/kue.jpg',
    fallbackIcon: 'shop',
    fallbackLabel: 'Toko Kue',
    status: 'Live',
    tech: ['HTML', 'CSS', 'JS', 'E-Commerce'],
    demo: 'https://trynvexa.github.io/toko-kue/',
    source: 'https://github.com/trynvexa/toko-kue',
    features: ['Katalog + filter kategori', 'Checkout via WhatsApp', 'Responsif mobile-first', 'SEO meta + OG tags'],
  },
  {
    slug: 'ayam-penyet',
    title: 'Website Ayam Penyet',
    year: '2025',
    desc: 'Website restoran Ayam Penyet dengan tampilan menggugah selera, menampilkan menu, harga, jam operasional, dan lokasi. Didesain modern dengan nuansa hangat khas kuliner Indonesia.',
    longDesc:
      'Menu interaktif dengan foto, jam operasional otomatis (buka/tutup), embed peta lokasi, dan tombol pesan cepat. Palet hangat khas kuliner Indonesia.',
    img: '/img/proyek/ayam.jpg',
    fallbackIcon: 'egg',
    fallbackLabel: 'Ayam Penyet',
    status: 'Live',
    tech: ['HTML', 'CSS', 'JS', 'Kuliner'],
    demo: 'https://web-ayam.vercel.app/',
    source: 'https://github.com/trynvexa/web-ayam',
    features: ['Menu + harga', 'Status buka/tutup otomatis', 'Embed peta', 'CTA pesan cepat'],
  },
  {
    slug: 'halaman-login',
    title: 'Halaman Login',
    year: '2025',
    desc: 'Desain halaman login modern dan elegan dengan animasi smooth, validasi form, dan tampilan yang bersih. Mendukung mode show/hide password dan responsif di semua ukuran layar.',
    longDesc:
      'Form login dengan validasi real-time, toggle show/hide password, state loading/error yang jelas, dan animasi micro-interaction. Fondasi reusable untuk halaman auth.',
    img: '/img/proyek/login.jpg',
    fallbackIcon: 'lock',
    fallbackLabel: 'Halaman Login',
    status: 'Selesai',
    tech: ['HTML', 'CSS', 'JS', 'Auth UI'],
    demo: 'https://trynvexa.github.io/smk-login/',
    source: 'https://github.com/trynvexa/smk-login',
    features: ['Validasi real-time', 'Show/hide password', 'State loading & error', 'Responsif penuh'],
  },
  {
    slug: 'gigi-energy-drink',
    title: 'GiGi Energy Drink',
    year: '2026',
    desc: 'Landing page produk minuman energi bergaya Gen Z, menonjolkan varian rasa, keunggulan formula (zero sugar, kafein alami), dan galeri sosial dengan animasi scroll yang enerjik.',
    longDesc:
      'Landing page Gen Z dengan hero statement, perbandingan varian rasa, breakdown formula, galeri UGC, dan animasi scroll-triggered yang menjaga LCP tetap hijau.',
    img: '/img/proyek/gigi.webp',
    fallbackIcon: 'zap',
    fallbackLabel: 'GiGi Energy Drink',
    status: 'Live',
    tech: ['Next.js', 'Tailwind CSS', 'Landing Page'],
    demo: 'https://modern-gen-z-energy-drink-landi-six-eta.vercel.app/',
    features: ['Varian rasa interaktif', 'Zero sugar highlight', 'Galeri sosial', 'Animasi scroll'],
  },
  {
    slug: 'mono-sustainable-home',
    title: 'MONO — Sustainable Home',
    year: '2026',
    desc: 'Website showcase rumah modular ramah lingkungan dengan galeri arsitektur, spesifikasi energi, dan tiga pilihan model rumah lengkap dengan harga.',
    longDesc:
      'Showcase arsitektur modular dengan galeri foto, spesifikasi energi (panel surya, insulasi), dan comparison 3 model rumah beserta harga transparan.',
    img: '/img/proyek/mono.webp',
    fallbackIcon: 'home',
    fallbackLabel: 'MONO',
    status: 'Live',
    tech: ['Next.js', 'Tailwind CSS', 'E-Commerce'],
    demo: 'https://v0-mono-ecommerce.vercel.app/',
    features: ['Galeri arsitektur', 'Spek energi', '3 model + harga', 'Form konsultasi'],
  },
  {
    slug: 'compute-ai-agents',
    title: 'COMPUTE — AI Agents Platform',
    year: '2026',
    desc: 'Landing page SaaS untuk platform AI agent otonom di infrastruktur terdistribusi, lengkap dengan section fitur, statistik real-time, integrasi, keamanan, dan pricing bertingkat.',
    longDesc:
      'SaaS landing lengkap: hero dengan live stats, grid fitur, logo integrasi, section keamanan/komplians, pricing 3 tier, FAQ, dan CTA trial. Struktur section reusable untuk produk SaaS lain.',
    img: '/img/proyek/ai.webp',
    fallbackIcon: 'cpu',
    fallbackLabel: 'COMPUTE',
    status: 'Live',
    tech: ['Next.js', 'Tailwind CSS', 'SaaS Landing'],
    demo: 'https://compute-the-platform-to-build-psi-tan.vercel.app/',
    features: ['Statistik real-time', 'Grid integrasi', 'Pricing 3 tier', 'FAQ + CTA trial'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export interface Achievement {
  title: string
  chip: string
  year: string
  img: string
  tag: string
  text: string
}

export const achievements: Achievement[] = [
  {
    title: 'Juara 1 MLBB',
    chip: '🏆 Champion',
    year: '2024',
    img: '/img/project/sertifikat1.jpg',
    tag: 'Anomali Store Season 1',
    text: 'Meraih juara 1 turnamen Mobile Legends Anomali Store Season 1 bersama tim lewat strategi dan kerja sama solid.',
  },
  {
    title: 'Tournament Player',
    chip: '🎮 Player',
    year: '2024',
    img: '/img/project/sertifikat2.jpg',
    tag: 'Competitive Player',
    text: 'Berpartisipasi aktif di berbagai turnamen kompetitif, mengasah mental bertanding dan komunikasi tim.',
  },
  {
    title: 'Esports Experience',
    chip: '🔥 Esports',
    year: '2024',
    img: '/img/project/sertifikat3.jpg',
    tag: 'MLBB Journey',
    text: 'Pengalaman panjang di skena esports MLBB yang membentuk disiplin, kepemimpinan, dan sportivitas.',
  },
]

export interface JourneyItem {
  year: string
  era: string
  title: string
  desc: string
  tags: string[]
  color: string
  shadow: string
}

export const journey: JourneyItem[] = [
  {
    year: '2009',
    era: 'Chapter 01',
    title: 'Awal Kehidupan',
    desc: 'Lahir di Medan, Sumatera Utara — kota yang kelak jadi fondasi mimpi besar. Sejak kecil, layar komputer sudah jadi magnet yang tak bisa diabaikan.',
    tags: ['Medan', 'Kelahiran'],
    color: '#818cf8',
    shadow: '#6366f1',
  },
  {
    year: '2021',
    era: 'Chapter 02',
    title: 'Mengenal Komputer',
    desc: 'Mulai serius mengenal dunia komputer dan game. Rasa penasaran tentang cara kerja website mulai tumbuh.',
    tags: ['Eksplorasi', 'Curiosity'],
    color: '#34d399',
    shadow: '#059669',
  },
  {
    year: '2023',
    era: 'Chapter 03',
    title: 'Masuk SMK RPL',
    desc: 'Memilih jurusan Rekayasa Perangkat Lunak di SMK Swasta Mandiri. Belajar HTML, CSS, dan logika pemrograman dari nol.',
    tags: ['SMK Mandiri', 'RPL'],
    color: '#f472b6',
    shadow: '#db2777',
  },
  {
    year: '2024',
    era: 'Chapter 04',
    title: 'Juara Esports & Web Pertama',
    desc: 'Menjuarai turnamen MLBB sekaligus merilis proyek web pertama: Toko Kue, Ayam Penyet, dan Halaman Login.',
    tags: ['Champion', 'First Projects'],
    color: '#fbbf24',
    shadow: '#d97706',
  },
  {
    year: '2025',
    era: 'Chapter 05',
    title: 'Naik Level: Modern Stack',
    desc: 'Mendalami JavaScript modern, Tailwind, dan Next.js. Membangun landing page Gen Z dan SaaS AI yang live di Vercel.',
    tags: ['Next.js', 'Tailwind'],
    color: '#22d3ee',
    shadow: '#0891b2',
  },
  {
    year: '2026',
    era: 'Chapter 06',
    title: 'Menuju Vue 3 + 3D',
    desc: 'Migrasi portfolio ke Vue 3 + TypeScript + GSAP + Three.js. Fokus pada animasi premium, performa Lighthouse 90+, dan pengalaman interaktif.',
    tags: ['Vue 3', 'Three.js'],
    color: '#a78bfa',
    shadow: '#7c3aed',
  },
  {
    year: '2028+',
    era: 'Final Chapter',
    title: 'Startup Pertama',
    desc: 'Tujuan akhir: mendirikan perusahaan teknologi sendiri — CEO perusahaan teknologi Indonesia yang berdampak global.',
    tags: ['Startup', 'CEO'],
    color: '#f59e0b',
    shadow: '#b45309',
  },
]

export const galleryImages = [
  { src: '/img/Gallery/thumbnail/1.webp', caption: 'Momen 1' },
  { src: '/img/Gallery/thumbnail/2.webp', caption: 'Momen 2' },
  { src: '/img/Gallery/thumbnail/3.webp', caption: 'Momen 3' },
  { src: '/img/Gallery/thumbnail/4.webp', caption: 'Momen 4' },
  { src: '/img/Gallery/thumbnail/5.webp', caption: 'Momen 5' },
  { src: '/img/Gallery/thumbnail/6.webp', caption: 'Momen 6' },
]

export const phrasesByLang: Record<string, string[]> = {
  id: ['Front-End Developer', 'UI Designer', 'Pelajar SMK Mandiri', 'Esports Enthusiast'],
  en: ['Front-End Developer', 'UI Designer', 'Student at SMK Mandiri', 'Esports Enthusiast'],
}
