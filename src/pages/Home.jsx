import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import Footer from '../components/Footer'; // Importamos el footer
import { Wrench, Zap, ShieldCheck } from 'lucide-react'; // Iconos para sección features

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function Home({ cart, addToCart, removeFromCart, updateQuantity }) {
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
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
      
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} toggleCart={() => setIsCartOpen(!isCartOpen)} />

      {/* Hero */}
      <header className="bg-gray-800 text-white py-24 text-center px-4 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase mb-4 tracking-tight">Libera el <span className="text-red-600">sonido</span></h2>
            <p className="text-xl text-gray-300 mb-8">Fabricación artesanal, materiales premium y rendimiento puro.</p>
            <a href="#catalogo" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">Ver Escapes</a>
        </div>
      </header>

      {/* Sección de Características (Feature Section) */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Potencia Instantánea</h3>
                <p className="text-gray-500">Mejora el flujo de gases y gana caballos de fuerza reales en tu motor.</p>
            </div>
            <div className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <Wrench size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Instalación Simple</h3>
                <p className="text-gray-500">Sistemas Slip-On diseñados para encajar perfectamente sin modificaciones.</p>
            </div>
            <div className="p-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Garantía Total</h3>
                <p className="text-gray-500">Todos nuestros escapes cuentan con 1 año de garantía por defectos de fábrica.</p>
            </div>
        </div>
      </section>

      {/* Catálogo */}
      <main id="catalogo" className="container mx-auto py-16 px-4 flex-grow">
        <h3 className="text-3xl font-bold mb-10 text-center uppercase tracking-wide">Nuestra Colección</h3>
        
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

      <Footer />

      <CartModal 
        cart={cart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onRemove={removeFromCart} 
        updateQuantity={updateQuantity} // Pasamos la nueva función
      />
    </div>
  );
}