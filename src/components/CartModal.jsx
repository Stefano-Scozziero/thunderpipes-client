import axios from 'axios';
import { Minus, Plus, Trash2 } from 'lucide-react'; // Nuevos iconos

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function CartModal({ cart, isOpen, onClose, onRemove, updateQuantity }) {
  if (!isOpen) return null;

  // Calculamos total considerando cantidades
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Carrito vacío");

    try {
      const response = await axios.post(`${API_URL}/create_preference`, { items: cart });
      const { id } = response.data;
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
      alert("Error de conexión");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end backdrop-blur-sm">
      <div className="bg-white w-full md:w-[450px] h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Tu Garage</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                {/* Imagen Miniatura */}
                <img src={item.img} alt={item.name} className="w-16 h-16 object-contain rounded" />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                    <button onClick={() => onRemove(item._id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">${item.price.toLocaleString()}</p>

                  {/* Control de Cantidad */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="bg-white border w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="bg-white border w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-4 bg-gray-50 -mx-6 px-6 pb-2">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg transition uppercase tracking-wide"
          >
            Pagar con Mercado Pago
          </button>
        </div>
      </div>
    </div>
  );
}