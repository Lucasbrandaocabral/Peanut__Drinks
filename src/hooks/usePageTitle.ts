import { useEffect } from 'react'

const BASE = 'Peanut Drinks'

/** Mantém o <title> em dia a cada rota — algo que o SPA precisa fazer à mão. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : BASE
  }, [title])
}
