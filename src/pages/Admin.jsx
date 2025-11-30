import { useState } from 'react';
import SEO from '../components/SEO';
import { LogOut, Package, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminProducts from '../components/AdminProducts';
import AdminUsers from '../components/AdminUsers';

export default function Admin() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-10">
            <SEO title="Admin Panel" noindex={true} />
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
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

            {/* Tabs de Navegación */}
            <div className="flex space-x-4 mb-8 border-b border-gray-300 pb-2">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition ${activeTab === 'products'
                            ? 'bg-white text-red-600 border-t-4 border-red-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <Package size={20} /> Productos
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition ${activeTab === 'users'
                            ? 'bg-white text-blue-600 border-t-4 border-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <Users size={20} /> Usuarios
                </button>
            </div>

            {/* Contenido Dinámico */}
            <div className="transition-all duration-300">
                {activeTab === 'products' ? <AdminProducts /> : <AdminUsers />}
            </div>
        </div>
    );
}