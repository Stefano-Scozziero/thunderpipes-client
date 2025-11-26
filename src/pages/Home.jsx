import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function Home({ cart, addToCart, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      
      <Navbar 
        cartCount={cart.length} 
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
      />

      <header className="bg-gray-800 text-white py-20 text-center px-4 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-4">Libera el sonido</h2>
            <p className="text-xl text-gray-300">Escapes de alto rendimiento y fibra de carbono</p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <h3 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">Catálogo</h3>
        
        {loading ? (
          <div className="text-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((prod) => (
              <ProductCard key={prod._id} product={prod} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartModal 
        cart={cart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onRemove={removeFromCart} 
      />
    </div>
  );
}