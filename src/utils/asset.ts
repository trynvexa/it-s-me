/** Path aset public yang ikut base URL saat deploy (mis. GitHub Pages subpath). */
export function asset(p: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${p.replace(/^\/+/, '')}`
}
