import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, toggleCart }) {
  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-2xl font-bold tracking-tighter text-red-500">
        THUNDER<span className="text-white">PIPES</span>
      </Link>
      
      <div className="flex gap-4 items-center">
        {/* Enlace secreto al admin */}
        <Link to="/admin" className="text-xs text-gray-500 hover:text-white">Admin</Link>

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