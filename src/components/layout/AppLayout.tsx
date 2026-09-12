import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

export function AppLayout() {
  const { pathname } = useLocation()

  // Cada rota começa do topo, como em uma navegação de página inteira.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* pb-24 abre espaço para a barra inferior no mobile; lg:pl-24 para a coluna lateral. */}
      <main id="conteudo" className="container-page flex-1 pb-24 lg:pb-8 lg:pl-24">
        <Outlet />
      </main>

      <Footer />
      <NavBar />
    </div>
  )
}
