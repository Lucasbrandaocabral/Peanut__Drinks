/**
 * Resolve um caminho de /public contra o base do Vite.
 *
 * Em desenvolvimento o base e "/", mas no GitHub Pages o site fica em
 * "/Peanut__Drinks/". Sem isso, todo caminho absoluto quebraria no deploy.
 */
const BASE = import.meta.env.BASE_URL

export const asset = (path: string) => `${BASE}${path.replace(/^\//, '')}`
