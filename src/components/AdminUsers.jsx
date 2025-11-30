import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Trash2, Loader2, UserX, ShoppingBag, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";
const USERS_ENDPOINT = `${API_URL}/api/users`;
const ORDERS_ENDPOINT = `${API_URL}/api/orders/user`;

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(USERS_ENDPOINT, { withCredentials: true });
            setUsers(res.data);
        } catch (err) {
            console.error("Error al cargar usuarios:", err);
            setError("No se pudieron cargar los usuarios. Verifica que tengas permisos de administrador.");
            toast.error("Error al cargar usuarios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUserOrders = async (userId) => {
        setLoadingOrders(true);
        try {
            const res = await axios.get(`${ORDERS_ENDPOINT}/${userId}`, { withCredentials: true });
            setUserOrders(res.data);
        } catch (error) {
            console.error("Error al cargar órdenes:", error);
            toast.error("Error al cargar el historial de pedidos.");
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleViewOrders = (user) => {
        setSelectedUser(user);
        fetchUserOrders(user._id);
    };

    const handleDelete = async (id, username) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${username}?`)) {
            try {
                await axios.delete(`${USERS_ENDPOINT}/${id}`, { withCredentials: true });
                toast.success(`Usuario eliminado.`);
                await fetchUsers();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                toast.error("Error al eliminar usuario.");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <UserX size={24} className="text-blue-600" /> Gestión de Usuarios ({users.length})
            </h2>

            {loading ? (
                <div className="text-center py-10 text-gray-500">
                    <Loader2 size={32} className="animate-spin mx-auto mb-3" />
                    Cargando usuarios...
                </div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">
                    <p className="font-bold">{error}</p>
                    <button onClick={fetchUsers} className="mt-4 text-blue-600 hover:underline">Intentar de nuevo</button>
                </div>
            ) : users.length === 0 ? (
                <p className="text-center py-10 text-gray-500">No hay usuarios registrados.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(u => (
                                <tr key={u._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[100px]">{u._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">
                                        <button
                                            onClick={() => handleViewOrders(u)}
                                            className="text-blue-600 hover:text-blue-900 transition flex items-center gap-1 font-semibold bg-blue-50 px-3 py-1 rounded-lg"
                                        >
                                            <ShoppingBag size={16} /> Ver Pedidos
                                        </button>
                                        <button
                                            onClick={() => handleDelete(u._id, u.username)}
                                            className="text-red-600 hover:text-red-900 transition flex items-center gap-1 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={u.role === 'admin'}
                                            title={u.role === 'admin' ? "No puedes eliminar administradores" : "Eliminar usuario"}
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

            {/* Modal de Pedidos */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <ShoppingBag className="text-blue-600" />
                                Historial de Pedidos: <span className="text-blue-600">{selectedUser.username}</span>
                            </h3>
                            <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700 transition">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {loadingOrders ? (
                                <div className="text-center py-10">
                                    <Loader2 size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
                                    <p className="text-gray-500">Cargando historial...</p>
                                </div>
                            ) : userOrders.length === 0 ? (
                                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 font-medium">Este usuario no ha realizado pedidos aún.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userOrders.map(order => (
                                        <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition bg-white">
                                            <div className="flex justify-between items-start mb-3 pb-3 border-b">
                                                <div>
                                                    <p className="text-sm text-gray-500">Pedido #{order._id.slice(-6)}</p>
                                                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                    <p className="font-bold text-lg text-green-600 mt-1">${order.total.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span className="text-gray-700">{item.quantity}x {item.title}</span>
                                                        <span className="font-medium text-gray-900">${item.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50 text-right">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
