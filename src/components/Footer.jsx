import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand */}
        <div>
          <h4 className="text-2xl font-bold text-red-600 mb-4">ESP<span className="text-black">PERFORMANCE</span></h4>
          <p className="text-sm leading-relaxed">
            Especialistas en sistemas de escape de alto rendimiento.
            Llevamos el sonido y la potencia de tu moto al siguiente nivel.
          </p>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h4 className="text-xl font-bold text-white mb-2">Contacto</h4>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-red-500" />
            <span>Av. Libertador 1234, Buenos Aires</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-red-500" />
            <span>ventas@espperformance.com</span>
          </div>
        </div>

        {/* Redes */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Síguenos</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-red-500 transition"><Instagram size={28} /></a>
            <a href="#" className="hover:text-blue-500 transition"><Facebook size={28} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EspPerformance Argentina. Todos los derechos reservados.
      </div>
    </footer>
  );
}