import './App.css'
import Navbar from './Navbar/Navbar'
import HeroBanner from './HeroBanner/HeroBanner'
import ProductosDestacados from './ProductosDestacados/ProductosDestacados'
import AboutUs from './AboutUs/AboutUs'
import Contacto from './Contacto/Contacto'
import Footer from './Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './Productos/ProductPage'
import ProductDetail from './Productos/ProductDetail'

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={
          <>
            <HeroBanner/>
            <ProductosDestacados/>
            <AboutUs/>
          </>
        }/>
        <Route path='/productos' element={<ProductPage/>}/>
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contacto/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;