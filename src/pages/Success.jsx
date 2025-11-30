import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Success() {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={80} className="text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pago Exitoso!</h1>
                    <p className="text-gray-600 mb-8">
                        Tu pedido ha sido procesado correctamente.
                        {paymentId && <span className="block text-sm mt-2 text-gray-400">ID de pago: {paymentId}</span>}
                    </p>

                    <div className="space-y-4">
                        {user ? (
                            <button
                                onClick={() => navigate('/profile')}
                                className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                            >
                                Ver Mis Pedidos
                            </button>
                        ) : (
                            <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
                                Revisa tu email para ver los detalles del pedido.
                            </p>
                        )}

                        <button
                            onClick={() => navigate('/')}
                            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                        >
                            Volver a la Tienda
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
