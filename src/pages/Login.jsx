import { useState } from 'react';
import SEO from '../components/SEO';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Usamos withCredentials para que el navegador guarde la cookie
      await axios.post(`${API_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      toast.success("Bienvenido al Garage");
      // Forzamos recarga o actualizamos estado global (aquí simplificamos redirigiendo)
      // En App.jsx verificaremos la cookie/token
      window.location.href = '/admin';
    } catch (error) {
      console.error(error);
      toast.error("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <SEO title="Acceso Admin" noindex={true} />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Acceso Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Usuario</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-red-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>
          <button className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition">
            Entrar al Garage
          </button>
        </form>
      </div>
    </div>
  );
}