import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function Checkout() {
    const { cart, cartCount } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        street: '',
        number: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return toast.error("El carrito está vacío");

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/create_preference`, {
                items: cart,
                shippingAddress: formData,
                email: user ? undefined : formData.email
            }, { withCredentials: true });

            const { id } = response.data;
            window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`;
        } catch (error) {
            console.error(error);
            toast.error("Error al procesar el pago. Intente nuevamente.");
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar cartCount={cartCount} />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
                        <button onClick={() => navigate('/')} className="text-red-600 hover:underline">
                            Volver a la tienda
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <SEO title="Checkout - Finalizar Compra" description="Completa tus datos de envío para finalizar tu compra." />
            <Navbar cartCount={cartCount} />

            <main className="container mx-auto px-4 py-12 flex-grow">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 border-l-4 border-red-600 pl-4">Finalizar Compra</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulario de Envío */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Datos de Envío</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!user && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contacto</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                                    <input
                                        type="text"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="Ej: Av. Libertador"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Altura</label>
                                    <input
                                        type="text"
                                        name="number"
                                        required
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="1234"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="Ej: Buenos Aires"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="Ej: Buenos Aires"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        required
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="1425"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                        placeholder="Ej: 11 1234 5678"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Procesando..." : "Pagar con Mercado Pago"}
                            </button>
                        </form>
                    </div>

                    {/* Resumen de Compra */}
                    <div className="bg-gray-100 p-8 rounded-2xl h-fit">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Resumen del Pedido</h2>
                        <div className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <div key={item._id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded border border-gray-200">
                                            <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-700">${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-300 pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
