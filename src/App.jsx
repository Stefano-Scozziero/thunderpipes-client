// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useState } from 'react';

function App() {
  // Estado global del carrito (simple para empezar)
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/admin" element={<Admin />} />
        {/* Agrega rutas de success/failure si deseas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;