import { CategoryCard } from '@/components/product/CategoryCard'
import { categories } from '@/data/categories'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Catalog() {
  usePageTitle('Catálogo')

  return (
    <section className="py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Catálogo</h1>
        <p className="mt-1 text-muted">Escolha por categoria e veja tudo que temos em estoque.</p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  )
}
