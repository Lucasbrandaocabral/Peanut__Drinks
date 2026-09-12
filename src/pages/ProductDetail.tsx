import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, Store } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { Rating } from '@/components/ui/Rating'
import { ProductRail } from '@/components/product/ProductRail'
import { productBySlug, productsByCategory } from '@/data/products'
import { formatDelivery, formatPrice, formatVolume } from '@/lib/format'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useCart } from '@/store/cart'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? productBySlug.get(slug) : undefined

  const [volume, setVolume] = useState<number | undefined>(product?.volumes?.[0])
  const [ice, setIce] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { add } = useCart()
  usePageTitle(product?.name)

  if (!product) return <Navigate to="/catalogo" replace />

  const related = productsByCategory(product.category).filter((item) => item.id !== product.id)

  const handleAdd = () => {
    add({ product, quantity, volume, ice })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="py-6">
      <Link
        to={`/categoria/${product.category}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para a categoria
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-sunken shadow-soft"
        >
          <img
            src={product.image}
            alt={product.name}
            fetchPriority="high"
            decoding="async"
            className="aspect-square size-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <Rating value={product.rating} reviews={product.reviews} />
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Store className="size-4" aria-hidden />
                {product.seller}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Clock className="size-4" aria-hidden />
                {formatDelivery(product.delivery)}
              </span>
            </div>
          </div>

          <p className="leading-relaxed text-muted">{product.description}</p>

          {product.volumes && (
            <fieldset>
              <legend className="mb-2 font-display font-semibold">Escolha o tamanho</legend>
              <div className="flex flex-wrap gap-2">
                {product.volumes.map((option) => (
                  <ChoiceChip
                    key={option}
                    name="volume"
                    checked={volume === option}
                    onChange={() => setVolume(option)}
                  >
                    {formatVolume(option)}
                  </ChoiceChip>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend className="mb-2 font-display font-semibold">Com gelo?</legend>
            <div className="flex flex-wrap gap-2">
              <ChoiceChip name="gelo" checked={ice} onChange={() => setIce(true)}>
                Com gelo
              </ChoiceChip>
              <ChoiceChip name="gelo" checked={!ice} onChange={() => setIce(false)}>
                Sem gelo
              </ChoiceChip>
            </div>
          </fieldset>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-raised p-4 shadow-soft">
            <div>
              <span className="block text-xs tracking-wide text-muted uppercase">Total</span>
              <span className="font-display text-3xl font-bold text-accent tabular-nums">
                {formatPrice(product.price * quantity)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
              <Button onClick={handleAdd} className="min-w-40">
                {added ? (
                  <>
                    <Check className="size-4" aria-hidden />
                    Adicionado
                  </>
                ) : (
                  'Adicionar ao carrinho'
                )}
              </Button>
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {added ? `${product.name} adicionado ao carrinho` : ''}
          </p>
        </div>
      </div>

      {related.length > 0 && <ProductRail title="Você também pode gostar" products={related} />}
    </div>
  )
}

function ChoiceChip({
  name,
  checked,
  onChange,
  children,
}: {
  name: string
  checked: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
        checked
          ? 'border-accent bg-accent text-on-accent'
          : 'border-line bg-raised text-muted hover:border-accent hover:text-accent'
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  )
}
