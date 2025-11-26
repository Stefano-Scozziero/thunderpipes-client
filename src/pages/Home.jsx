import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Plus } from 'lucide-react'; // Íconos bonitos

// IMPORTANTE: Cambia esto por tu URL de Render cuando despliegues
// Mientras trabajas local usa: http://localhost:3000/api/products
const API_URL = "https://thunderpipes-server.onrender.com/api/products"; 

export default function Home({ cart, addToCart, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar productos desde la Base de Datos
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error conectando al server:", err);
        setLoading(false);
      });
  }, []);

  const handleCheckout = async () => {
    if(cart.length === 0) return alert("Carrito vacío");
    
    try {
       // Endpoint de MercadoPago en tu server
       const response = await axios.post('https://thunderpipes-server.onrender.com/create_preference', { 
           items: cart 
       });
       const { id } = response.data;
       
       // Redirigir a MercadoPago
       const mpUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
       window.location.href = mpUrl; // Redirección directa
       
    } catch (error) {
        alert("Error al procesar el pago. Revisa que el servidor esté activo.");
        console.error("Error en checkout:", error);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen font-sans text-gray-900">
      
      {/* Navbar Simple */}
      <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-tighter text-red-500">THUNDER<span className="text-white">PIPES</span></h1>
        
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2 hover:text-red-500 transition">
          <ShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-800 text-white py-20 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-4">Libera el sonido</h2>
        <p className="text-xl text-gray-300">Escapes de alto rendimiento y fibra de carbono</p>
      </header>

      {/* Grid de Productos */}
      <main className="container mx-auto py-12 px-4">
        <h3 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">Catálogo</h3>
        
        {loading ? (
          <p className="text-center text-gray-500">Cargando escapes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div key={prod._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
                <div className="h-48 overflow-hidden">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg">{prod.name}</h4>
                  <p className="text-sm text-gray-500 mb-4 truncate">{prod.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${prod.price.toLocaleString()}</span>
                    <button 
                      onClick={() => addToCart(prod)}
                      className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 text-sm"
                    >
                      <Plus size={16} /> Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal del Carrito (Lateral) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full md:w-96 h-full p-6 flex flex-col animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tu Garage</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? <p className="text-center text-gray-500 mt-10">Vacío...</p> : 
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between bg-gray-50 p-3 rounded">
                    <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(idx)} className="text-red-500 font-bold">X</button>
                  </div>
                ))
              }
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded">
                Pagar con Mercado Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}