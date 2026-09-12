import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { History } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { asset } from '@/lib/asset'

const LEGACY_URL = asset('/legacy/index.html')

const FROM_YEAR = 2026
const TO_YEAR = 2025

/** Quando o ano vira e quando a navegação acontece, em ms desde o clique. */
const FLIP_AT = 420
const LEAVE_AT = 1250

/**
 * Saída para a versão original do projeto.
 *
 * A ida é encenada: a tela escurece e o ano volta de 2026 para 2025 antes da
 * navegação. Quem prefere menos movimento vai direto, sem a encenação.
 */
export function LegacyPortal() {
  const [leaving, setLeaving] = useState(false)
  const [year, setYear] = useState(FROM_YEAR)
  const timers = useRef<number[]>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const start = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Deixa passar ctrl+clique, clique do meio e afins: abrir em nova aba
    // não deve disparar a animação nesta aba.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return

    event.preventDefault()

    if (reduceMotion) {
      window.location.href = LEGACY_URL
      return
    }

    setLeaving(true)
    timers.current.push(
      window.setTimeout(() => setYear(TO_YEAR), FLIP_AT),
      window.setTimeout(() => {
        window.location.href = LEGACY_URL
      }, LEAVE_AT),
    )
  }

  return (
    <>
      <a
        href={LEGACY_URL}
        onClick={start}
        aria-label="Ver a versão original de 2025"
        className="group flex flex-col items-center gap-0.5 px-2 py-2 text-xs text-muted transition-colors hover:text-accent lg:px-3"
      >
        <History
          className="size-6 transition-transform duration-300 group-hover:-rotate-45"
          aria-hidden
          strokeWidth={1.8}
        />
        <span className="lg:sr-only">2025</span>
      </a>

      {/* Vai para o body: a navbar tem backdrop-blur e translate, que criam
          bloco de contenção e prenderiam um "fixed" dentro dela. */}
      {createPortal(
        <AnimatePresence>
          {leaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-ink-950 text-cream-100"
            role="status"
            aria-live="polite"
          >
            <div className="flex h-24 items-center overflow-hidden font-display text-7xl font-extrabold tabular-nums sm:text-8xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={year}
                  // Vem de cima e sai por baixo: a leitura é de tempo voltando.
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={year === TO_YEAR ? 'text-amber-glow' : ''}
                >
                  {year}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.3 }}
              className="text-sm tracking-wide text-cream-300/70 uppercase"
            >
              Voltando para a versão original
            </motion.p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
