import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'

import Home          from './pages/Home'
import Shop          from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Brands        from './pages/Brands'
import CustomOrder   from './pages/CustomOrder'
import HowItWorks    from './pages/HowItWorks'
import FAQ           from './pages/FAQ'
import Contact       from './pages/Contact'
import OrderTracking from './pages/OrderTracking'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/shop"        element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/brands"      element={<Brands />} />
          <Route path="/custom"      element={<CustomOrder />} />
          <Route path="/how"         element={<HowItWorks />} />
          <Route path="/faq"         element={<FAQ />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/track"       element={<OrderTracking />} />
          <Route path="*"            element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
