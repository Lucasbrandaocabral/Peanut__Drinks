import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import { searchProducts } from '@/data/products'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const results = searchProducts(query)

  usePageTitle(query ? `Busca: ${query}` : 'Busca')

  return (
    <section className="py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Resultados</h1>
        <p className="mt-1 text-muted">
          {results.length} {results.length === 1 ? 'bebida encontrada' : 'bebidas encontradas'} para{' '}
          <strong className="text-strong">“{query}”</strong>
        </p>
      </header>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nada encontrado"
          description="Tente outro termo — busque pelo nome da bebida, pelo bar ou por um ingrediente."
          action={<ButtonLink to="/catalogo">Ver catálogo</ButtonLink>}
        />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
