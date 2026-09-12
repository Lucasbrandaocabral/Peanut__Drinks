import { Link } from 'react-router-dom'
import {
  ChevronRight,
  CreditCard,
  Heart,
  LifeBuoy,
  Package,
  Settings,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { asset } from '@/lib/asset'
import { usePageTitle } from '@/hooks/usePageTitle'

interface Entry {
  to: string
  label: string
  hint: string
  icon: LucideIcon
}

const entries: Entry[] = [
  {
    to: '/perfil/dados',
    label: 'Informações pessoais',
    hint: 'Nome, e-mail e telefone',
    icon: UserRound,
  },
  { to: '/perfil', label: 'Pedidos e compras', hint: 'Histórico de entregas', icon: Package },
  { to: '/perfil', label: 'Pagamentos e faturas', hint: 'Cartões salvos', icon: CreditCard },
  { to: '/perfil', label: 'Favoritos', hint: 'Lista de desejos', icon: Heart },
  { to: '/perfil', label: 'Configurações e segurança', hint: 'Senha e privacidade', icon: Settings },
  { to: '/perfil', label: 'Ajuda e suporte', hint: 'Fale com a gente', icon: LifeBuoy },
]

export default function Profile() {
  usePageTitle('Perfil')

  return (
    <div className="py-6">
      <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">Perfil</h1>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_1fr]">
        <section className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-line bg-raised p-6 text-center shadow-soft">
          <img
            src={asset('/img/user/lucas-b.webp')}
            alt=""
            width={96}
            height={96}
            className="size-24 rounded-full object-cover"
          />
          <h2 className="font-display text-xl font-bold">Lucas Brandão</h2>
          <p className="text-sm text-muted">lucasbrandao11br@gmail.com</p>
          <span className="mt-1 rounded-full bg-sunken px-3 py-1 text-xs text-muted">
            Cliente desde 2025
          </span>
        </section>

        <ul className="flex flex-col gap-2">
          {entries.map(({ to, label, hint, icon: Icon }) => (
            <li key={label}>
              <Link
                to={to}
                className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-raised p-4 shadow-soft transition-all hover:border-accent hover:shadow-lift"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sunken text-muted transition-colors group-hover:text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-semibold">{label}</span>
                  <span className="block truncate text-sm text-muted">{hint}</span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
