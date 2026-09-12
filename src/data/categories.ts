import { asset } from '@/lib/asset'
import type { Category } from '@/types'

const seeds: Category[] = [
  { slug: 'alcoolicas', name: 'Bebidas Alcoólicas', image: '/img/magnifying/alcoholic.webp', alcoholic: true },
  { slug: 'nao-alcoolicas', name: 'Bebidas Não Alcoólicas', image: '/img/magnifying/non-alcoholic.webp', alcoholic: false },
  { slug: 'vinhos', name: 'Vinhos', image: '/img/magnifying/brandy.webp', alcoholic: true },
  { slug: 'aguas', name: 'Águas', image: '/img/magnifying/water.webp', alcoholic: false },
  { slug: 'sucos', name: 'Sucos', image: '/img/magnifying/juices.webp', alcoholic: false },
  { slug: 'refrigerantes', name: 'Refrigerantes', image: '/img/magnifying/soft-drinks.webp', alcoholic: false },
  { slug: 'chas', name: 'Chás', image: '/img/magnifying/teas.webp', alcoholic: false },
  { slug: 'cafes', name: 'Cafés', image: '/img/magnifying/coffees.webp', alcoholic: false },
  { slug: 'leites', name: 'Leites', image: '/img/magnifying/milk.webp', alcoholic: false },
  { slug: 'energeticos', name: 'Energéticos', image: '/img/magnifying/energy-drinks.webp', alcoholic: false },
  { slug: 'esportivas', name: 'Esportivas e Eletrólitos', image: '/img/magnifying/sports-and-electrolyte.webp', alcoholic: false },
  { slug: 'smoothies', name: 'Smoothies e Shakes', image: '/img/magnifying/smoothies-e-shakes.webp', alcoholic: false },
]

export const categories: Category[] = seeds.map((category) => ({
  ...category,
  image: asset(category.image),
}))

export const categoryBySlug = new Map(categories.map((category) => [category.slug, category]))
