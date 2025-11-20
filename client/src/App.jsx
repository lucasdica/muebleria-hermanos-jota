import './App.css'
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Contacto from './pages/Contacto'
import Footer from './Footer/Footer'
import ProductPage from './pages/ProductPage'
import ProductDetail from './Productos/ProductDetail'
import Admin from './Admin/Admin';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const [contadorCarrito, setContadorCarrito] = useState(0);
  const agregarAlCarrito = () => {
    setContadorCarrito(prev => prev + 1);
  };

  return (
    <>
      <Navbar contador={contadorCarrito} />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/productos' element={<ProductPage agregar={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<ProductDetail agregar={agregarAlCarrito}/>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/crear-producto" element={<Admin />} />
        <Route path='/registro' element={<Register />}></Route>
        <Route path='/usuario/:id' element={<Profile />}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;