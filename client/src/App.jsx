import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Contacto from './pages/Contacto'
import Footer from './Footer/Footer'
import ProductPage from './pages/ProductPage'
import ProductDetail from './Productos/ProductDetail'
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import RutaProtegida from './Routes/RutasProtegidas';
import { CartProvider } from './context/CartContext';
import Admin from './Admin/Admin'
import CarritoPage from './pages/CarritoPage';
import CheckoutPage from "./pages/CheckoutPage";
import CompraExitosa from './Checkout/CompraExitosa'

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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />

        <Route path='/perfil/:id' element={<RutaProtegida><Profile /></RutaProtegida>} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;