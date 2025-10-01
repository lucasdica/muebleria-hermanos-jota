import './App.css'
import Navbar from './Navbar/Navbar'
import HeroBanner from './HeroBanner/HeroBanner'
import ProductosDestacados from './ProductosDestacados/ProductosDestacados'
import AboutUs from './AboutUs/AboutUs'
import Contacto from './Contacto/Contacto'
import Footer from './Footer/Footer'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroBanner/>
            <ProductosDestacados/>
            <AboutUs/>
          </>
        }/>
        <Route path="/contacto" element={<Contacto/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;