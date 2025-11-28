import { Plus } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="h-48 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-5">
        <h4 className="font-bold text-lg">{product.name}</h4>
        <p className="text-sm text-gray-500 mb-4 truncate">{product.desc}</p>
        <div className="flex justify-between items-center">
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
    </div>
  );
}