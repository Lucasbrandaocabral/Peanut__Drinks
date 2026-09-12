import { NavLink } from 'react-router-dom'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useCart } from '@/store/cart'
import { LegacyPortal } from './LegacyPortal'

interface Destination {
  to: string
  label: string
  icon: LucideIcon
}

const destinations: Destination[] = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/catalogo', label: 'Catálogo', icon: LayoutGrid },
  { to: '/carrinho', label: 'Carrinho', icon: ShoppingCart },
  { to: '/perfil', label: 'Perfil', icon: User },
]

/**
 * Barra inferior no mobile, coluna lateral fixa no desktop —
 * o mesmo componente, sem duplicar a marcação como na versão antiga.
 */
export function NavBar() {
  const { count } = useCart()

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-raised/95 backdrop-blur-md lg:inset-x-auto lg:top-1/2 lg:bottom-auto lg:left-6 lg:-translate-y-1/2 lg:rounded-full lg:border lg:px-2 lg:py-4 lg:shadow-lift"
    >
      <ul className="flex items-center justify-around lg:flex-col lg:gap-2">
        {destinations.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1 lg:flex-none">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group relative flex flex-col items-center gap-0.5 px-2 py-2 text-xs transition-colors lg:px-3 lg:py-2 ${
                  isActive ? 'text-accent' : 'text-muted hover:text-strong'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon className="size-6" aria-hidden strokeWidth={isActive ? 2.4 : 1.8} />
                    {to === '/carrinho' && count > 0 && (
                      <span className="absolute -top-1.5 -right-2 grid min-w-4.5 place-items-center rounded-full bg-accent px-1 text-[0.625rem] leading-4.5 font-bold text-on-accent tabular-nums">
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </span>
                  <span className="lg:sr-only">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}

        {/* Separado do resto: não é uma seção do app, e sim a saída para a
            versão de 2025. */}
        <li
          aria-hidden
          className="mx-1 h-8 w-px shrink-0 bg-line lg:mx-0 lg:my-1 lg:h-px lg:w-8"
        />
        <li className="flex-none">
          <LegacyPortal />
        </li>
      </ul>
    </nav>
  )
}
