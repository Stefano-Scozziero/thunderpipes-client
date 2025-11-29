import { Plus, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const [isWishlisted, setIsWishlisted] = useState(false); // Placeholder state

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Eliminado de favoritos" : "Agregado a favoritos");
    // TODO: Connect to backend
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition shadow-sm"
      >
        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
      </button>

      <Link to={`/product/${product._id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
          />
        </div>
        <div className="p-5">
          <h4 className="font-bold text-lg hover:text-red-600 transition">{product.name}</h4>
          <p className="text-sm text-gray-500 mb-4 truncate">{product.desc}</p>
        </div>
      </Link>

      <div className="px-5 pb-5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {product.stock > 0 && product.stock < 5 && (
            <span className="text-xs text-orange-600 font-bold animate-pulse">
              ¡Últimas {product.stock} unidades!
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-xs text-red-600 font-bold">
              Sin Stock
            </span>
          )}
        </div>
        <button
          onClick={() => onAdd(product)}
          disabled={product.stock <= 0}
          className={`px-4 py-2 rounded transition flex items-center gap-2 text-sm font-medium ${product.stock > 0
            ? 'bg-gray-900 text-white hover:bg-red-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {product.stock > 0 ? (
            <>
              <Plus size={16} /> Agregar
            </>
          ) : (
            "Agotado"
          )}
        </button>
      </div>
    </div>
  );
}