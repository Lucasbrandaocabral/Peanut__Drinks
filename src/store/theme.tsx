import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'peanut-theme'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)

const initialTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function ThemeProvider({ children }: { children: ReactNode }) {
  // O script no index.html já aplicou a classe; aqui só espelhamos o estado.
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* sem persistência: o tema vale só para esta sessão */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((current) => (current === 'dark' ? 'light' : 'dark')), [])

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return context
}
