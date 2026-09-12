import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { formatPrice, formatVolume } from '@/lib/format'
import { usePageTitle } from '@/hooks/usePageTitle'
import { itemKey, useCart } from '@/store/cart'

export default function Cart() {
  const { items, subtotal, deliveryFee, total, freeDeliveryMissing, setQuantity, remove, clear } =
    useCart()

  usePageTitle('Carrinho')

  if (items.length === 0) {
    return (
      <div className="py-6">
        <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">Carrinho</h1>
        <EmptyState
          icon={ShoppingCart}
          title="Seu carrinho está vazio"
          description="Escolha uma bebida no catálogo e ela aparece aqui — o carrinho fica salvo mesmo se você fechar a aba."
          action={<ButtonLink to="/catalogo">Ver catálogo</ButtonLink>}
        />
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Carrinho</h1>
        <Button variant="ghost" size="sm" onClick={clear}>
          <Trash2 className="size-4" aria-hidden />
          Esvaziar
        </Button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const key = itemKey(item)
              return (
                <motion.li
                  key={key}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-raised p-3 shadow-soft"
                >
                  <Link
                    to={`/produto/${item.product.slug}`}
                    className="size-24 shrink-0 overflow-hidden rounded-xl bg-sunken sm:size-28"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h2 className="truncate font-semibold">
                      <Link to={`/produto/${item.product.slug}`} className="hover:text-accent">
                        {item.product.name}
                      </Link>
                    </h2>

                    <p className="truncate text-sm text-muted">{item.product.seller}</p>

                    <p className="text-sm text-muted">
                      {[
                        item.volume ? formatVolume(item.volume) : null,
                        item.ice === undefined ? null : item.ice ? 'com gelo' : 'sem gelo',
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(quantity) => setQuantity(key, quantity)}
                        label={item.product.name}
                        min={0}
                      />

                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg font-bold tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          aria-label={`Remover ${item.product.name} do carrinho`}
                          className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-sunken hover:text-accent"
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        <aside className="sticky top-24 flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-raised p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold">Resumo</h2>

          <dl className="flex flex-col gap-2 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row
              label="Entrega"
              value={deliveryFee === 0 ? 'Grátis' : formatPrice(deliveryFee)}
              accent={deliveryFee === 0}
            />
          </dl>

          {freeDeliveryMissing > 0 && (
            <p className="rounded-xl bg-sunken px-3 py-2 text-xs text-muted">
              Faltam <strong className="text-accent">{formatPrice(freeDeliveryMissing)}</strong> para
              a entrega sair de graça.
            </p>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
            <span className="font-display font-bold">Total</span>
            <span
              aria-live="polite"
              className="font-display text-2xl font-extrabold text-accent tabular-nums"
            >
              {formatPrice(total)}
            </span>
          </div>

          <ButtonLink to="/pagamento" className="mt-2 w-full">
            Finalizar pedido
          </ButtonLink>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={`tabular-nums ${accent ? 'font-semibold text-accent' : ''}`}>{value}</dd>
    </div>
  )
}
