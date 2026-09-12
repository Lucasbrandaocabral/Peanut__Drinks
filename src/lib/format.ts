const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Converte centavos para "R$ 5,32". Preços são inteiros para não perder centavo em soma. */
export const formatPrice = (cents: number) => BRL.format(cents / 100)

export const formatDelivery = ([min, max]: [number, number]) => `${min}–${max} min`

export const formatReviews = (reviews: number) =>
  reviews >= 1000 ? `${(reviews / 1000).toFixed(1).replace('.', ',')} mil` : String(reviews)

export const formatVolume = (ml: number) => (ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`)
