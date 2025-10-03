import './App.css'
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import HeroBanner from './HeroBanner/HeroBanner'
import ProductosDestacados from './ProductosDestacados/ProductosDestacados'
import AboutUs from './AboutUs/AboutUs'
import Contacto from './Contacto/Contacto'
import Footer from './Footer/Footer'
import ProductPage from './Productos/ProductPage'
import ProductDetail from './Productos/ProductDetail'

function App() {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const agregarAlCarrito = () => {
    setContadorCarrito(prev => prev + 1);
  };

  return (
    <>
      <Navbar contador={contadorCarrito} />
      <Routes>
        <Route index element={
          <>
            <HeroBanner/>
            <ProductosDestacados/>
            <AboutUs/>
          </>
        }/>
        <Route path='/productos' element={<ProductPage agregar={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<ProductDetail agregar={agregarAlCarrito}/>} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App;