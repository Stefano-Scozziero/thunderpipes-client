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
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <button 
            onClick={() => onAdd(product)}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}