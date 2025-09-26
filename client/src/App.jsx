import './App.css'
import Navbar from './Navbar/Navbar'
import HeroBanner from './HeroBanner/HeroBanner'
import ProductosDestacados from './ProductosDestacados/ProductosDestacados'
import AboutUs from './AboutUs/AboutUs'
import Footer from './Footer/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <HeroBanner/>
      <ProductosDestacados/>
      <AboutUs/>
      <Footer/>
    </>
  )
}

export default App