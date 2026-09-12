import { Compass } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { ButtonLink } from '@/components/ui/Button'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Página não encontrada')

  return (
    <div className="py-16">
      <EmptyState
        icon={Compass}
        title="Página não encontrada"
        description="O endereço que você tentou abrir não existe por aqui. Talvez o link esteja velho."
        action={<ButtonLink to="/">Voltar ao início</ButtonLink>}
      />
    </div>
  )
}
