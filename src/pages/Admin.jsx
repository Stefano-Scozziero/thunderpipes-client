import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, LogOut, Loader2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Usamos la misma URL que configuramos en Home.jsx
const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";
const PRODUCTS_ENDPOINT = `${API_URL}/api/products`;

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', img: '', desc: '' });
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(PRODUCTS_ENDPOINT);
            setProducts(res.data);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            alert("Error al cargar productos del servidor.");
        } finally {
            setLoading(false);
        }
    };
    
    // Cargar productos al iniciar
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; 

        // Validación simple para precios positivos
        if (Number(form.price) <= 0) {
            alert("El precio debe ser un número positivo.");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(PRODUCTS_ENDPOINT, { 
                ...form,
                price: Number(form.price) // Aseguramos que el precio sea numérico
            });
            alert("✅ Producto Agregado con Éxito!");
            setForm({ name: '', price: '', img: '', desc: '' }); // Limpiar formulario
            fetchProducts(); // Recargar lista
        } catch (error) {
            console.error("Error al crear producto:", error);
            alert("❌ Error al cargar producto. Revisa la consola y la conexión al servidor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id, name) => {
        if(!confirm(`¿Seguro que quieres borrar el producto: ${name}? Esta acción es irreversible.`)) return;
        try {
            await axios.delete(`${PRODUCTS_ENDPOINT}/${id}`);
            alert(`Producto ${name} eliminado.`);
            fetchProducts();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("❌ Error al eliminar el producto.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth'); // Elimina la llave de autenticación
        navigate('/'); // Redirige al Home
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-10">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter border-l-4 border-red-600 pl-4">
                    Panel de Administración
                </h1>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
                >
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </header>
            
            {/* Formulario de Carga */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-12 border-t-4 border-green-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-700">
                    <PlusCircle size={24} /> Cargar Nuevo Producto
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                        className="border p-3 w-full rounded focus:ring-red-500 focus:border-red-500 transition" 
                        placeholder="Nombre (ej: Akrapovic)" 
                        name="name"
                        value={form.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <input 
                        className="border p-3 w-full rounded focus:ring-red-500 focus:border-red-500 transition" 
                        type="number" 
                        placeholder="Precio (solo números)" 
                        name="price"
                        value={form.price} 
                        onChange={handleInputChange} 
                        required 
                        min="1"
                    />
                    <input 
                        className="border p-3 w-full rounded focus:ring-red-500 focus:border-red-500 transition col-span-1 md:col-span-2" 
                        placeholder="URL de Imagen (http://...)" 
                        name="img"
                        value={form.img} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <textarea 
                        className="border p-3 w-full rounded focus:ring-red-500 focus:border-red-500 transition col-span-1 md:col-span-2 resize-none" 
                        placeholder="Descripción detallada del escape..." 
                        name="desc"
                        value={form.desc} 
                        onChange={handleInputChange} 
                        required 
                        rows="3"
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="col-span-1 md:col-span-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Guardando...
                            </>
                        ) : (
                            "Guardar Producto en Inventario"
                        )}
                    </button>
                </form>
            </div>

            {/* Inventario Actual */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario Actual ({products.length})</h2>
                
                {loading ? (
                    <div className="text-center py-10 text-gray-500">
                        <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                        Cargando productos...
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center py-10 text-gray-500">No hay productos cargados.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID (Referencia)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(p => (
                                    <tr key={p._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[100px]">{p._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <img src={p.img} alt={p.name} className="h-10 w-10 rounded-full mr-4 object-cover border" onError={(e) => e.target.style.display='none'} />
                                                {p.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">${p.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button 
                                                onClick={() => handleDelete(p._id, p.name)} 
                                                className="text-red-600 hover:text-red-900 transition flex items-center gap-1 font-semibold"
                                            >
                                                <Trash2 size={16} /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}