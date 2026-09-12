import { Github, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Social {
  href: string
  label: string
  icon: LucideIcon
}

const socials: Social[] = [
  { href: 'https://www.instagram.com/zlucas.bz/', label: 'Instagram', icon: Instagram },
  { href: 'https://github.com/Lucasbrandaocabral', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/lucasbrandaocabral', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://wa.me/5511953597007', label: 'WhatsApp', icon: MessageCircle },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="container-page flex flex-col items-center gap-5 py-10 text-center">
        <p className="max-w-md text-sm text-muted">
          Projeto pessoal e sem fins comerciais. Se beber, não dirija — venda proibida para menores
          de 18 anos.
        </p>

        <ul className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted">
          {new Date().getFullYear()} &copy; Lucas Brandão
        </p>
      </div>
    </footer>
  )
}
