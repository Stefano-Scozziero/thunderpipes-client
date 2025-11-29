import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, User } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function ReviewList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/products/${productId}/reviews`);
            setReviews(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${API_URL}/api/products/${productId}/reviews`, newReview, { withCredentials: true });
            toast.success("Reseña agregada con éxito");
            setNewReview({ rating: 5, comment: '' });
            fetchReviews();
        } catch (error) {
            toast.error("Error al agregar reseña. Asegúrate de estar logueado.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Reseñas de Clientes</h3>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                <h4 className="font-bold mb-4">Deja tu opinión</h4>
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`transition ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            <Star fill="currentColor" />
                        </button>
                    ))}
                </div>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-red-500"
                    rows="3"
                    placeholder="Cuéntanos tu experiencia..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                ></textarea>
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {submitting ? "Enviando..." : "Publicar Reseña"}
                </button>
            </form>

            {/* Lista de Reseñas */}
            {loading ? (
                <p>Cargando reseñas...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500 italic">Aún no hay reseñas. ¡Sé el primero!</p>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-gray-200 p-2 rounded-full">
                                    <User size={16} />
                                </div>
                                <span className="font-bold">{review.user?.username || "Usuario"}</span>
                                <span className="text-gray-400 text-sm ml-auto">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                                ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
