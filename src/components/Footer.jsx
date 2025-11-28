import { Mail, MapPin } from 'lucide-react';

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
            <a
              href="https://www.instagram.com/espmotos_casilda/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@axellesposito"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="TikTok"
            >
              {/* Custom TikTok Icon matching Lucide style */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tiktok"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EspPerformance Argentina. Todos los derechos reservados.
      </div>
    </footer>
  );
}