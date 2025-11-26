import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // CONTRASEÑA MAESTRA: Cámbiala por lo que quieras
    const masterPassword = import.meta.env.VITE_PASS_MASTER;
    if (password === masterPassword) { 
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      alert("Contraseña incorrecta. Acceso denegado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Acceso Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña Maestra</label>
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