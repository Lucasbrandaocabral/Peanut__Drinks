const digits = (value: string) => value.replace(/\D/g, '')

export const maskPhone = (value: string) => {
  const raw = digits(value).slice(0, 11)
  if (raw.length <= 2) return raw
  if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`
  if (raw.length <= 10) return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`
  return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`
}

export const maskBirthDate = (value: string) => {
  const raw = digits(value).slice(0, 8)
  if (raw.length <= 2) return raw
  if (raw.length <= 4) return `${raw.slice(0, 2)}/${raw.slice(2)}`
  return `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`
}

export const maskCardNumber = (value: string) =>
  digits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

export const maskExpiry = (value: string) => {
  const raw = digits(value).slice(0, 4)
  return raw.length <= 2 ? raw : `${raw.slice(0, 2)}/${raw.slice(2)}`
}

export const maskCvc = (value: string) => digits(value).slice(0, 4)

export const maskCardName = (value: string) => value.replace(/[^\p{L}\s]/gu, '').slice(0, 26)

/** Preenche o restante do campo com marcadores, para o preview do cartão. */
export const padPreview = (value: string, template: string) =>
  value + template.slice(value.length)
