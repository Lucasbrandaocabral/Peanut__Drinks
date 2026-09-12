import { useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PackageOpen } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import { categoryBySlug } from '@/data/categories'
import { productsByCategory } from '@/data/products'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { CategorySlug, Product } from '@/types'

type SortKey = 'relevancia' | 'menor-preco' | 'maior-preco' | 'entrega'

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  relevancia: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  'menor-preco': (a, b) => a.price - b.price,
  'maior-preco': (a, b) => b.price - a.price,
  entrega: (a, b) => a.delivery[0] - b.delivery[0],
}

const sortLabels: Record<SortKey, string> = {
  relevancia: 'Mais bem avaliados',
  'menor-preco': 'Menor preço',
  'maior-preco': 'Maior preço',
  entrega: 'Entrega mais rápida',
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const [sort, setSort] = useState<SortKey>('relevancia')

  const category = slug ? categoryBySlug.get(slug as CategorySlug) : undefined

  const items = useMemo(
    () => (category ? [...productsByCategory(category.slug)].sort(sorters[sort]) : []),
    [category, sort],
  )

  usePageTitle(category?.name)

  if (slug && !category) return <Navigate to="/catalogo" replace />
  if (!category) return null

  return (
    <section className="py-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{category.name}</h1>
          <p className="mt-1 text-muted">
            {items.length} {items.length === 1 ? 'opção disponível' : 'opções disponíveis'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="ordenar" className="text-sm text-muted">
            Ordenar por
          </label>
          <select
            id="ordenar"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-10 rounded-full border border-line bg-raised px-4 text-sm outline-none transition-colors focus:border-accent"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </header>

      {items.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="Categoria em montagem"
          description="Ainda não temos rótulos cadastrados aqui. Enquanto isso, dá uma olhada no resto do catálogo."
          action={<ButtonLink to="/catalogo">Voltar ao catálogo</ButtonLink>}
        />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
