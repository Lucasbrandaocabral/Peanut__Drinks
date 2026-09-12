import { Link } from 'react-router-dom'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold ' +
  'transition-all duration-200 ease-[var(--ease-out-soft)] ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110 active:scale-[0.98] shadow-soft',
  secondary:
    'bg-raised text-strong border border-line hover:border-accent hover:text-accent active:scale-[0.98]',
  ghost: 'text-muted hover:bg-sunken hover:text-strong',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-13 px-8 text-lg',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

const classes = ({ variant = 'primary', size = 'md', className = '' }: CommonProps) =>
  `${base} ${variants[variant]} ${sizes[size]} ${className}`

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={classes({ variant, size, className, children })} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  to,
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & { to: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  return (
    <Link to={to} className={classes({ variant, size, className, children })} {...props}>
      {children}
    </Link>
  )
}
