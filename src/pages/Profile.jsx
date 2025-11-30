import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function Profile() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios.get(`${API_URL}/api/orders/my-orders`, { withCredentials: true })
                .then(res => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (!user) return <div>Cargando...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <SEO title="Mi Perfil" />
            <Navbar cartCount={cartCount} />

            <main className="container mx-auto px-4 py-12 flex-grow">
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <h1 className="text-3xl font-bold mb-4">Hola, {user.username}</h1>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <button onClick={logout} className="mt-4 text-red-600 font-bold hover:underline">
                        Cerrar Sesión
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-6">Mis Pedidos</h2>
                {loading ? (
                    <div>Cargando pedidos...</div>
                ) : orders.length === 0 ? (
                    <p>No tienes pedidos aún.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg">Orden #{order._id.slice(-6)}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.status === 'paid' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-gray-600">
                                            <span>{item.title} x{item.quantity}</span>
                                            <span>${item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${order.total.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
