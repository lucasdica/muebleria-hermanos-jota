// import './App.css'
// import { useState } from "react";
// import { Routes, Route } from 'react-router-dom'
// import Navbar from './Navbar/Navbar'
// import Contacto from './pages/Contacto'
// import Footer from './Footer/Footer'
// import ProductPage from './pages/ProductPage'
// import ProductDetail from './Productos/ProductDetail'
// import Admin from './Admin/Admin';
// import Homepage from './pages/Homepage';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import RutaProtegida from './Routes/RutasProtegidas';

// function App() {
//   const [contadorCarrito, setContadorCarrito] = useState(0);
//   const agregarAlCarrito = () => {
//     setContadorCarrito(prev => prev + 1);
//   };

//   return (
//     <>
//         <Navbar contador={contadorCarrito} />
//         <Routes>
//           <Route path='/' element={<Homepage />} />
//           <Route path='/productos' element={<ProductPage agregar={agregarAlCarrito} />} />
//           <Route path="/producto/:id" element={<ProductDetail agregar={agregarAlCarrito}/>} />
//           <Route path="/contacto" element={<Contacto />} />
//           <Route path="/admin/crear-producto" element={<Admin />} />
//           <Route path='/registro' element={<Register />} />
//           <Route path="/login" element={<Login />} />

//           {/* RUTA SOLO SI ESTÁ LOGUEADO */}
//           <Route path='/perfil' element={<RutaProtegida><Profile /></RutaProtegida>} />

//         </Routes>
//         <Footer/>
//     </>
//   )
// }

// export default App;

import './App.css'
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
import Login from './pages/Login';
import RutaProtegida from './Routes/RutasProtegidas';
import { CartProvider } from './context/CartContext';
import CarritoPage from './pages/CarritoPage';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/productos' element={<ProductPage />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin/crear-producto" element={<Admin />} />
        <Route path='/registro' element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/compra" element={<CarritoPage />} />

        <Route path='/perfil' element={<RutaProtegida><Profile /></RutaProtegida>} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;