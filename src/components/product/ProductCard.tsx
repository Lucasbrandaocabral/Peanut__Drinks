import { Link } from 'react-router-dom'
import { Clock, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Rating } from '@/components/ui/Rating'
import { formatDelivery, formatPrice } from '@/lib/format'
import { useCart } from '@/store/cart'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  /** Carrega a imagem com prioridade — só para os primeiros cards da tela. */
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { add } = useCart()

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-raised shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-sunken">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
        />

        {product.abv !== undefined && (
          <span className="absolute top-2 left-2 rounded-full bg-ink-950/70 px-2 py-0.5 text-xs font-medium text-cream-100 backdrop-blur-sm">
            {product.abv}% vol
          </span>
        )}

        {/* z-10 mantém o botão acima do overlay de link que cobre o card inteiro. */}
        <button
          type="button"
          onClick={() => add({ product })}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className="absolute right-2 bottom-2 z-10 grid size-10 place-items-center rounded-full bg-accent text-on-accent opacity-0 shadow-lift transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 active:scale-90 sm:size-9"
        >
          <Plus className="size-5" aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="font-display text-lg font-bold text-accent tabular-nums">
          {formatPrice(product.price)}
        </span>

        <h3 className="text-base leading-snug font-semibold">
          {/* O link cobre o card inteiro, mantendo um único alvo de navegação. */}
          <Link to={`/produto/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <p className="truncate text-sm text-muted">{product.seller}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2">
          <Rating value={product.rating} reviews={product.reviews} />
          <span className="inline-flex items-center gap-1 text-sm text-muted">
            <Clock className="size-3.5" aria-hidden />
            {formatDelivery(product.delivery)}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
