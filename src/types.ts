export type CategorySlug =
  | 'alcoolicas'
  | 'nao-alcoolicas'
  | 'vinhos'
  | 'aguas'
  | 'sucos'
  | 'refrigerantes'
  | 'chas'
  | 'cafes'
  | 'leites'
  | 'energeticos'
  | 'esportivas'
  | 'smoothies'

export interface Product {
  id: string
  name: string
  slug: string
  /** Preço em centavos — evita erro de ponto flutuante nos totais. */
  price: number
  seller: string
  rating: number
  reviews: number
  /** Faixa de entrega em minutos. */
  delivery: [number, number]
  image: string
  category: CategorySlug
  description: string
  abv?: number
  volumes?: number[]
}

export interface Category {
  slug: CategorySlug
  name: string
  image: string
  alcoholic: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  volume?: number
  ice?: boolean
}
