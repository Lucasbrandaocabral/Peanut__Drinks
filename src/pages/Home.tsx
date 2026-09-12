import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductRail } from '@/components/product/ProductRail'
import { ButtonLink } from '@/components/ui/Button'
import { categories } from '@/data/categories'
import { productBySlug, products, productsByCategory } from '@/data/products'
import { usePageTitle } from '@/hooks/usePageTitle'

/** Destaque fixo da home — a única foto do acervo com resolução suficiente para o hero. */
const featured = productBySlug.get('old-fashioned') ?? products[0]

export default function Home() {
  usePageTitle('Bebidas entregues geladas')

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-raised shadow-soft sm:mt-6"
      >
        <div className="grid items-center gap-6 p-6 sm:grid-cols-2 sm:p-10">
          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full bg-sunken px-3 py-1 text-xs font-semibold tracking-wide text-muted uppercase">
              Entrega em até 30 min
            </span>

            <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl">
              O bar inteiro,
              <br />
              na sua porta.
            </h1>

            <p className="max-w-sm text-muted">
              Coquetéis autorais, vinhos selecionados e opções sem álcool — de {products.length}{' '}
              rótulos, escolhidos por quem realmente bebe.
            </p>

            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/catalogo">
                Ver catálogo
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to={`/produto/${featured.slug}`} variant="secondary">
                Ver o destaque
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-card)] sm:aspect-square">
            <img
              src={featured.image}
              alt={featured.name}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </div>
      </motion.section>

      <ProductRail title="Alcoólicas" products={productsByCategory('alcoolicas')} priority />
      <ProductRail title="Não Alcoólicas" products={productsByCategory('nao-alcoolicas')} />
      <ProductRail title="Vinhos" products={productsByCategory('vinhos')} />

      <section aria-labelledby="categorias" className="py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="categorias" className="text-2xl font-bold sm:text-3xl">
            Categorias
          </h2>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Ver todas
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <li key={category.slug}>
              <CategoryTile slug={category.slug} name={category.name} image={category.image} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function CategoryTile({ slug, name, image }: { slug: string; name: string; image: string }) {
  return (
    <Link
      to={`/categoria/${slug}`}
      className="group relative flex h-28 items-end overflow-hidden rounded-[var(--radius-card)] bg-sunken p-3 shadow-soft transition-shadow hover:shadow-lift sm:h-32"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-110"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
      />
      <span className="relative font-display text-sm leading-tight font-semibold text-balance text-cream-100 sm:text-base">
        {name}
      </span>
    </Link>
  )
}
