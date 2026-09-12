import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { searchProducts } from '@/data/products'
import { formatPrice } from '@/lib/format'

export function Header() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const results = query.trim() ? searchProducts(query).slice(0, 6) : []

  // Fecha a lista de sugestões ao clicar fora.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    setOpen(false)
    navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur-md">
      <div className="container-page flex items-center gap-3 py-3 sm:gap-6 sm:py-4">
        <Link
          to="/"
          className="shrink-0 font-display text-xl leading-[0.9] font-extrabold tracking-tight sm:text-2xl"
        >
          Peanut
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Drinks
        </Link>

        <div ref={containerRef} className="relative flex-1">
          <form role="search" onSubmit={submit}>
            <label htmlFor="site-search" className="sr-only">
              Pesquisar bebidas
            </label>
            <div className="flex h-11 items-center gap-2 rounded-full border border-line bg-sunken px-4 transition-colors focus-within:border-accent">
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setOpen(true)
                }}
                onFocus={() => setOpen(true)}
                placeholder="Pesquise uma bebida"
                autoComplete="off"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setOpen(false)
                  }}
                  aria-label="Limpar busca"
                  className="text-muted transition-colors hover:text-strong"
                >
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </div>
          </form>

          <AnimatePresence>
            {open && results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-raised shadow-lift"
              >
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/produto/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-sunken"
                    >
                      <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="size-10 shrink-0 rounded-lg object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{product.name}</span>
                        <span className="block truncate text-xs text-muted">{product.seller}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-accent tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Notificações"
            className="hidden size-10 place-items-center rounded-full border border-line bg-raised text-muted transition-colors hover:text-accent sm:grid"
          >
            <Bell className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
