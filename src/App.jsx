import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login'; // Lo crearemos pronto
import NotFound from './pages/NotFound';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// Componente para proteger rutas (Guardian)
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('adminAuth'); // Chequeamos si está logueado
  return isAuth === 'true' ? children : <Navigate to="/login" />;
};

function App() {
  const [cart, setCart] = useState([]);

  // Lógica inteligente: Si existe, suma 1. Si no, lo agrega.
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para aumentar/disminuir cantidad desde el modal
  const updateQuantity = (id, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item._id === id) {
          const newQuantity = Math.max(1, item.quantity + amount); // Mínimo 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        } />

        {/* Ruta de Login Pública */}
        <Route path="/login" element={<Login />} />

        {/* Ruta Protegida: Solo pasa si sabe la contraseña */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;