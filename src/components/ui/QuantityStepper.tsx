import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  max?: number
}

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const step = (delta: number) => onChange(Math.min(max, Math.max(min, value + delta)))

  return (
    <div className="inline-flex items-center rounded-full border border-line bg-raised">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label={`Diminuir quantidade de ${label}`}
        className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-muted"
      >
        <Minus className="size-4" aria-hidden />
      </button>

      <span aria-live="polite" className="w-8 text-center font-display font-semibold tabular-nums">
        {value}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label={`Aumentar quantidade de ${label}`}
        className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-accent disabled:opacity-30"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  )
}
