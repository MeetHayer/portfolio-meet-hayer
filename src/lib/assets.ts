/** Prefix a site-relative path with Vite's base URL (needed for GitHub Pages). */
export function withBase(path?: string): string {
  if (!path) return ''
  if (/^(https?:)?\/\//i.test(path) || /^(mailto:|tel:|data:|#)/i.test(path)) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${encodeURI(path.replace(/^\//, ''))}`
}
