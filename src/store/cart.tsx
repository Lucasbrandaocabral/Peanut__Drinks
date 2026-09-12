import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '@/types'

const STORAGE_KEY = 'peanut-cart'
const DELIVERY_FEE = 690
const FREE_DELIVERY_FROM = 5000

interface AddPayload {
  product: Product
  quantity?: number
  volume?: number
  ice?: boolean
}

type Action =
  | { type: 'add'; payload: AddPayload }
  | { type: 'remove'; key: string }
  | { type: 'setQuantity'; key: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] }

/** Mesma bebida com volume ou gelo diferente conta como linha separada. */
export const itemKey = (item: Pick<CartItem, 'product' | 'volume' | 'ice'>) =>
  `${item.product.id}:${item.volume ?? 'default'}:${item.ice ?? 'default'}`

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.items

    case 'add': {
      const { product, quantity = 1, volume, ice } = action.payload
      const key = itemKey({ product, volume, ice })
      const existing = state.find((item) => itemKey(item) === key)

      if (existing) {
        return state.map((item) =>
          itemKey(item) === key ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...state, { product, quantity, volume, ice }]
    }

    case 'remove':
      return state.filter((item) => itemKey(item) !== action.key)

    case 'setQuantity':
      if (action.quantity < 1) return state.filter((item) => itemKey(item) !== action.key)
      return state.map((item) =>
        itemKey(item) === action.key ? { ...item, quantity: action.quantity } : item,
      )

    case 'clear':
      return []
  }
}

interface CartValue {
  items: CartItem[]
  count: number
  subtotal: number
  deliveryFee: number
  total: number
  freeDeliveryMissing: number
  add: (payload: AddPayload) => void
  remove: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])

  // Hidrata depois da montagem para não divergir do HTML inicial.
  useEffect(() => {
    const stored = readStorage()
    if (stored.length) dispatch({ type: 'hydrate', items: stored })
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* modo privado ou storage cheio: o carrinho segue só em memória */
    }
  }, [items])

  const add = useCallback((payload: AddPayload) => dispatch({ type: 'add', payload }), [])
  const remove = useCallback((key: string) => dispatch({ type: 'remove', key }), [])
  const setQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: 'setQuantity', key, quantity }),
    [],
  )
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo<CartValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE

    return {
      items,
      count,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      freeDeliveryMissing: Math.max(0, FREE_DELIVERY_FROM - subtotal),
      add,
      remove,
      setQuantity,
      clear,
    }
  }, [items, add, remove, setQuantity, clear])

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return context
}
