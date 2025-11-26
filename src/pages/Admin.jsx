// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

// URL de tu Backend en Render
const API_URL = "https://thunderpipes-server.onrender.com/api/products"; 

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', img: '', desc: '' });

    const fetchProducts = async () => {
        const res = await axios.get(API_URL);
        setProducts(res.data);
    };
    
    // Cargar productos al iniciar
    useEffect(() => {
        const loadProducts = async () => {
            try {
            const res = await axios.get(API_URL);
            setProducts(res.data);
            } catch (err) {
            console.error(err);
            }
        };

        loadProducts();
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, form);
            alert("Producto Agregado!");
            setForm({ name: '', price: '', img: '', desc: '' });
            fetchProducts(); // Recargar lista
        } catch (error) {
            console.error(error);
            alert("Error al cargar");
        }
    };

    const handleDelete = async (id) => {
        if(!confirm("¿Seguro que quieres borrar este escape?")) return;
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
    };

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-red-600">Panel de Administración ThunderPipes</h1>
            
            {/* Formulario de Carga */}
            <div className="bg-white p-6 rounded shadow-md mb-10">
                <h2 className="text-xl mb-4 font-bold">Cargar Nuevo Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="border p-2 w-full" placeholder="Nombre (ej: Akrapovic)" 
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    <input className="border p-2 w-full" type="number" placeholder="Precio" 
                        value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                    <input className="border p-2 w-full" placeholder="URL de Imagen" 
                        value={form.img} onChange={e => setForm({...form, img: e.target.value})} required />
                    <textarea className="border p-2 w-full" placeholder="Descripción" 
                        value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required />
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">
                        Guardar Producto
                    </button>
                </form>
            </div>

            {/* Listado para Borrar */}
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4 font-bold">Inventario Actual</h2>
                <ul>
                    {products.map(p => (
                        <li key={p._id} className="flex justify-between items-center border-b py-2">
                            <span>{p.name} - ${p.price}</span>
                            <button onClick={() => handleDelete(p._id)} className="text-red-500 font-bold hover:underline">
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}