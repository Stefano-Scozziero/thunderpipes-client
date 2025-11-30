import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: { street: '', city: '', zip: '', phone: '' }
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (['street', 'city', 'zip', 'phone'].includes(e.target.name)) {
            setFormData({ ...formData, address: { ...formData.address, [e.target.name]: e.target.value } });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (error) {
            // Error handled in context
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
            <SEO title="Registro" />
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Crear Cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="username" placeholder="Usuario" onChange={handleChange} className="w-full border p-3 rounded" required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-3 rounded" required />
                    <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="w-full border p-3 rounded" required />

                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-gray-600 font-bold mb-2">Dirección de Envío</h3>
                        <input name="street" placeholder="Calle y Altura" onChange={handleChange} className="w-full border p-3 rounded mb-2" />
                        <div className="grid grid-cols-2 gap-2">
                            <input name="city" placeholder="Ciudad" onChange={handleChange} className="w-full border p-3 rounded" />
                            <input name="zip" placeholder="CP" onChange={handleChange} className="w-full border p-3 rounded" />
                        </div>
                        <input name="phone" placeholder="Teléfono" onChange={handleChange} className="w-full border p-3 rounded mt-2" />
                    </div>

                    <button className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition">
                        Registrarse
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-red-600 font-bold">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}
