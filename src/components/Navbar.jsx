import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount, toggleCart }) {
  const { user } = useAuth();
  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold tracking-tighter text-red-500">
        ESP<span className="text-black">PERFORMANCE</span>
      </Link>

      <div className="flex gap-4 items-center">
        {/* Enlace secreto al admin */}
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-xs text-gray-500 hover:text-white">Admin</Link>
        )}

        {user ? (
          <Link to="/profile" className="hover:text-red-500 transition">
            <User size={24} />
          </Link>
        ) : (
          <Link to="/login" className="text-sm font-bold hover:text-red-500 transition">
            Login
          </Link>
        )}

        <button onClick={toggleCart} className="relative p-2 hover:text-red-500 transition">
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}