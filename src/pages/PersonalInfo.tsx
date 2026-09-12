import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { maskBirthDate, maskPhone } from '@/lib/masks'
import { usePageTitle } from '@/hooks/usePageTitle'

interface Form {
  name: string
  email: string
  phone: string
  birthDate: string
  pronouns: string
}

const initial: Form = {
  name: 'Lucas Brandão',
  email: 'lucasbrandao11br@gmail.com',
  phone: '(11) 95359-7007',
  birthDate: '14/05/2003',
  pronouns: 'Ele/dele',
}

export default function PersonalInfo() {
  const [form, setForm] = useState<Form>(initial)
  const [saved, setSaved] = useState(false)

  usePageTitle('Informações pessoais')

  const update = (field: keyof Form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="py-6">
      <Link
        to="/perfil"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar ao perfil
      </Link>

      <h1 className="mb-6 text-3xl font-extrabold sm:text-4xl">Informações pessoais</h1>

      <form
        onSubmit={submit}
        className="grid max-w-2xl gap-4 rounded-[var(--radius-card)] border border-line bg-raised p-6 shadow-soft"
      >
        <Field
          id="nome"
          label="Nome completo"
          value={form.name}
          autoComplete="name"
          onChange={(value) => update('name', value)}
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          value={form.email}
          autoComplete="email"
          onChange={(value) => update('email', value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="telefone"
            label="Telefone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            autoComplete="tel"
            onChange={(value) => update('phone', maskPhone(value))}
          />
          <Field
            id="nascimento"
            label="Data de nascimento"
            inputMode="numeric"
            value={form.birthDate}
            autoComplete="bday"
            onChange={(value) => update('birthDate', maskBirthDate(value))}
          />
        </div>

        <Field
          id="pronomes"
          label="Pronomes"
          value={form.pronouns}
          onChange={(value) => update('pronouns', value)}
        />

        <div className="mt-2 flex items-center gap-3">
          <Button type="submit">Salvar alterações</Button>
          {saved && (
            <span
              role="status"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              <Check className="size-4" aria-hidden />
              Alterações salvas
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  type?: string
  inputMode?: 'numeric' | 'text'
  autoComplete?: string
  onChange: (value: string) => void
}

function Field({ id, label, value, onChange, ...rest }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-xl border border-line bg-page px-4 outline-none transition-colors focus:border-accent"
        {...rest}
      />
    </div>
  )
}
