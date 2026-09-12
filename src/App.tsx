import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { CartProvider } from '@/store/cart'
import { ThemeProvider } from '@/store/theme'

// Cada rota vira um chunk separado: a home não carrega o código do checkout.
const Home = lazy(() => import('@/pages/Home'))
const Catalog = lazy(() => import('@/pages/Catalog'))
const Category = lazy(() => import('@/pages/Category'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Profile = lazy(() => import('@/pages/Profile'))
const PersonalInfo = lazy(() => import('@/pages/PersonalInfo'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        {/* basename acompanha o base do Vite: "/" local, "/Peanut__Drinks/" no Pages. */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="catalogo" element={<Catalog />} />
                <Route path="categoria/:slug" element={<Category />} />
                <Route path="produto/:slug" element={<ProductDetail />} />
                <Route path="carrinho" element={<Cart />} />
                <Route path="pagamento" element={<Checkout />} />
                <Route path="perfil" element={<Profile />} />
                <Route path="perfil/dados" element={<PersonalInfo />} />
                <Route path="busca" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}
