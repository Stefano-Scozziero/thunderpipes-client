import axios from 'axios';

// Usamos una variable de entorno para la URL (ver paso 3)
const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function CartModal({ cart, isOpen, onClose, onRemove }) {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    if(cart.length === 0) return alert("Carrito vacío");
    
    // Cambiamos el texto del botón temporalmente (lógica visual opcional)
    try {
       const response = await axios.post(`${API_URL}/create_preference`, { items: cart });
       const { id } = response.data;
       window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
        alert("Error de conexión con el servidor de pagos.");
        console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full md:w-96 h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tu Garage</h2>
          <button onClick={onClose} className="text-3xl hover:text-red-500">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Tu carrito está vacío.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between bg-gray-50 p-3 rounded items-center">
                <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">${item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => onRemove(idx)} className="text-red-500 font-bold px-2">X</button>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleCheckout} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
          >
            Pagar con Mercado Pago
          </button>
        </div>
      </div>
    </div>
  );
}