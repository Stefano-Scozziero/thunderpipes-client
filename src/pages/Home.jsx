import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
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
      <SEO
        title="Inicio"
        description="Descubre nuestra colección de escapes artesanales de alto rendimiento. Potencia tu moto con ESP Performance."
        keywords="escapes, motos, performance, slip-on, argentina, artesanal"
      />

      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} toggleCart={() => setIsCartOpen(!isCartOpen)} />

      {/* Hero Premium */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block animate-fade-in-up">
            Handcrafted Performance
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-fade-in-up">ESCAPES RR</h2>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none animate-fade-in-up delay-100">
            Libera la <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Bestia</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
            Sistemas de escape de alto rendimiento diseñados para quienes no se conforman con el silencio.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <a href="#catalogo" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition transform hover:-translate-y-1 shadow-lg shadow-red-900/50">
              Ver Colección
            </a>
            <a href="#features" className="border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition backdrop-blur-sm">
              Descubrir Más
            </a>
          </div>
        </div>
      </header>

      {/* Sección de Características (Feature Section) */}
      <section id="features" className="bg-zinc-900 py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          {[
            { icon: Zap, title: "Potencia Pura", desc: "Optimización de flujo para ganar HP reales." },
            { icon: Wrench, title: "Instalación Directa", desc: "Sistema Slip-On sin modificaciones permanentes." },
            { icon: ShieldCheck, title: "Garantía de por Vida", desc: "Confianza total en nuestra soldadura TIG." }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-red-600/50 transition duration-300 group">
              <div className="bg-zinc-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600 group-hover:scale-110 transition duration-300 shadow-lg shadow-black/50">
                <feature.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
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