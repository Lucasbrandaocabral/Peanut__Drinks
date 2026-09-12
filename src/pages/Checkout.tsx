import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatPrice } from '@/lib/format'
import { maskCardName, maskCardNumber, maskCvc, maskExpiry, padPreview } from '@/lib/masks'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useCart } from '@/store/cart'

interface CardState {
  number: string
  name: string
  expiry: string
  cvc: string
}

const empty: CardState = { number: '', name: '', expiry: '', cvc: '' }

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [card, setCard] = useState<CardState>(empty)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  usePageTitle('Pagamento')

  const complete =
    card.number.replace(/\s/g, '').length === 16 &&
    card.name.trim().length > 2 &&
    card.expiry.length === 5 &&
    card.cvc.length >= 3

  if (items.length === 0 && !done) {
    return (
      <div className="py-6">
        <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">Pagamento</h1>
        <EmptyState
          icon={CreditCard}
          title="Nada para pagar ainda"
          description="Adicione pelo menos uma bebida ao carrinho para seguir com o pagamento."
          action={<ButtonLink to="/catalogo">Ver catálogo</ButtonLink>}
        />
      </div>
    )
  }

  if (done) {
    return (
      <div className="py-6">
        <EmptyState
          icon={CheckCircle2}
          title="Pedido confirmado!"
          description="Esta é uma demonstração: nenhum pagamento real foi processado e nenhum dado do cartão saiu do seu navegador."
          action={<ButtonLink to="/">Voltar ao início</ButtonLink>}
        />
      </div>
    )
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!complete) return
    setDone(true)
    clear()
    window.setTimeout(() => navigate('/'), 4000)
  }

  return (
    <div className="py-6">
      <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">Pagamento</h1>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <CardPreview card={card} flipped={flipped} />
          <p className="flex items-center justify-center gap-2 text-xs text-muted">
            <Lock className="size-3.5" aria-hidden />
            Projeto de demonstração — os dados ficam apenas nesta página.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field
            id="cardNumber"
            label="Número do cartão"
            value={card.number}
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
            autoComplete="cc-number"
            onChange={(value) => setCard({ ...card, number: maskCardNumber(value) })}
          />

          <Field
            id="cardName"
            label="Nome do titular"
            value={card.name}
            placeholder="Como está impresso no cartão"
            autoComplete="cc-name"
            onChange={(value) => setCard({ ...card, name: maskCardName(value) })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              id="expiry"
              label="Validade"
              value={card.expiry}
              placeholder="MM/AA"
              inputMode="numeric"
              autoComplete="cc-exp"
              onChange={(value) => setCard({ ...card, expiry: maskExpiry(value) })}
            />
            <Field
              id="cvc"
              label="CVV"
              value={card.cvc}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
              onChange={(value) => setCard({ ...card, cvc: maskCvc(value) })}
              onFocus={() => setFlipped(true)}
              onBlur={() => setFlipped(false)}
            />
          </div>

          <div className="mt-2 flex items-center justify-between rounded-[var(--radius-card)] border border-line bg-raised p-4">
            <span className="font-display font-bold">Total</span>
            <span className="font-display text-2xl font-extrabold text-accent tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          <Button type="submit" size="lg" disabled={!complete} className="w-full">
            Confirmar pagamento
          </Button>
        </form>
      </div>
    </div>
  )
}

function CardPreview({ card, flipped }: { card: CardState; flipped: boolean }) {
  return (
    <div className="[perspective:1200px]">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-8/5 w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950 p-6 text-cream-100 shadow-lift [backface-visibility:hidden]">
          <div className="flex items-start justify-between">
            <div className="h-9 w-12 rounded-md bg-gradient-to-br from-amber-glow to-amber-brand" />
            <span className="font-display text-lg font-bold">Peanut</span>
          </div>

          <p className="font-mono text-lg tracking-[0.18em] tabular-nums sm:text-2xl">
            {padPreview(card.number, '•••• •••• •••• ••••')}
          </p>

          <div className="flex items-end justify-between gap-4 text-sm">
            <div className="min-w-0">
              <span className="block text-[0.625rem] tracking-wider text-cream-300/70 uppercase">
                Titular
              </span>
              <span className="block truncate uppercase">{card.name || 'NOME DO TITULAR'}</span>
            </div>
            <div>
              <span className="block text-[0.625rem] tracking-wider text-cream-300/70 uppercase">
                Validade
              </span>
              <span className="tabular-nums">{padPreview(card.expiry, 'MM/AA')}</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950 py-6 text-cream-100 shadow-lift [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="h-11 w-full bg-ink-950" />
          <div className="flex items-center justify-end gap-3 px-6">
            <span className="text-xs text-cream-300/70">CVV</span>
            <span className="rounded bg-cream-100 px-4 py-1.5 font-mono text-ink-900 tabular-nums">
              {padPreview(card.cvc, '•••')}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  placeholder?: string
  inputMode?: 'numeric' | 'text'
  autoComplete?: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

function Field({ id, label, value, onChange, ...rest }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-xl border border-line bg-raised px-4 outline-none transition-colors focus:border-accent"
        {...rest}
      />
    </div>
  )
}
