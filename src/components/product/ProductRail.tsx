import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductRailProps {
  title: string
  products: Product[]
  priority?: boolean
}

/**
 * Carrossel horizontal com scroll nativo (snap + teclado + touch).
 * As setas só aparecem quando há conteúdo para aquele lado.
 */
export function ProductRail({ title, products, priority = false }: ProductRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track
      setCanScrollLeft(scrollLeft > 8)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
    }

    update()
    track.addEventListener('scroll', update, { passive: true })

    const observer = new ResizeObserver(update)
    observer.observe(track)

    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [products])

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  const headingId = `rail-${title.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section aria-labelledby={headingId} className="py-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id={headingId} className="text-2xl font-bold sm:text-3xl">
          {title}
        </h2>

        <div className="hidden gap-2 sm:flex">
          <RailButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-1)}
            title={title}
          />
          <RailButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => scrollBy(1)}
            title={title}
          />
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-44 flex-none snap-start sm:w-52">
            <ProductCard product={product} priority={priority && index < 4} />
          </div>
        ))}
      </div>
    </section>
  )
}

function RailButton({
  direction,
  disabled,
  onClick,
  title,
}: {
  direction: 'left' | 'right'
  disabled: boolean
  onClick: () => void
  title: string
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Ver ${direction === 'left' ? 'anteriores' : 'próximos'} em ${title}`}
      className="grid size-10 place-items-center rounded-full border border-line bg-raised text-muted transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}
