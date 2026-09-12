import { Link } from 'react-router-dom'
import type { Category } from '@/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group relative block aspect-square overflow-hidden rounded-[var(--radius-card)] bg-sunken shadow-soft transition-shadow hover:shadow-lift"
    >
      <img
        src={category.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-110"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 p-3 font-display text-base leading-tight font-semibold text-balance text-cream-100 sm:text-lg">
        {category.name}
      </span>
    </Link>
  )
}
