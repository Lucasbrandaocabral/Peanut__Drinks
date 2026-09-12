import { Star } from 'lucide-react'
import { formatReviews } from '@/lib/format'

interface RatingProps {
  value: number
  reviews?: number
  className?: string
}

export function Rating({ value, reviews, className = '' }: RatingProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm text-muted ${className}`}
      aria-label={`Nota ${value.toFixed(1)} de 5${reviews ? `, ${reviews} avaliacoes` : ''}`}
    >
      <Star className="size-3.5 fill-accent text-accent" aria-hidden />
      <span className="font-medium text-strong">{value.toFixed(1)}</span>
      {reviews !== undefined && <span aria-hidden>({formatReviews(reviews)})</span>}
    </span>
  )
}
