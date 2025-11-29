import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Plus, Heart, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewList from '../components/ReviewList';
import SEO from '../components/SEO';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function ProductDetail({ cart, addToCart, removeFromCart, updateQuantity }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? "Eliminado de favoritos" : "Agregado a favoritos");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-gray-100">Producto no encontrado</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <SEO title={product.name} description={product.desc} />
            <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} toggleCart={() => setIsCartOpen(!isCartOpen)} />

            <main className="container mx-auto px-4 py-12 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Columna Izquierda: Imágenes */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm flex items-center justify-center h-fit">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full max-h-[500px] object-contain hover:scale-105 transition duration-500"
                        />
                    </div>

                    {/* Columna Derecha: Info */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl font-black uppercase tracking-tight">{product.name}</h1>
                            <button
                                onClick={toggleWishlist}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-red-500 transition"
                            >
                                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
                            </button>
                        </div>

                        <p className="text-3xl font-bold text-red-600 mb-6">${product.price.toLocaleString()}</p>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b border-gray-200 pb-8">
                            {product.desc}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Truck className="text-red-600" />
                                <span>Envío gratis a todo el país</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <ShieldCheck className="text-red-600" />
                                <span>Garantía oficial de 1 año</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-12 sticky bottom-4 z-10 lg:static">
                            <button
                                onClick={() => addToCart(product)}
                                disabled={product.stock <= 0}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition transform hover:-translate-y-1 ${product.stock > 0
                                        ? 'bg-black text-white hover:bg-gray-900'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {product.stock > 0 ? (
                                    <>
                                        <ShoppingCart size={24} /> Agregar al Carrito
                                    </>
                                ) : (
                                    "Sin Stock"
                                )}
                            </button>
                        </div>

                        {/* Reseñas */}
                        <ReviewList productId={product._id} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
