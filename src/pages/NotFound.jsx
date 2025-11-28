import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
            <SEO title="Página no encontrada" noindex={true} />

            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="text-red-600 mb-6 flex justify-center">
                    <AlertTriangle size={64} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Página no encontrada</h2>
                <p className="text-gray-500 mb-8">
                    Parece que te has perdido. La página que buscas no existe o ha sido movida.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition w-full"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
