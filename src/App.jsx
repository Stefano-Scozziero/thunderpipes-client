import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';


const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

// Componente para proteger rutas (Guardian)
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Nueva Ruta de Detalle de Producto */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Ruta de Checkout */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />

            {/* Ruta de Login Pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Ruta Protegida: Solo pasa si sabe la contraseña */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            } />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;