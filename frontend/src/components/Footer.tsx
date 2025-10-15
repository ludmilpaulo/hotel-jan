import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {/* Sobre */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-yellow-500">Hotel</span> Jan
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed">
            Conforto, elegância e hospitalidade em Talatona, Belas.  
            A sua estadia inesquecível em Angola começa aqui.
          </p>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contato</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <span>Rua Hotel Jan, Camama, Talatona, Belas, Angola</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-yellow-500 flex-shrink-0" />
              +244 914 260 030
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-yellow-500 flex-shrink-0" />
              reservas@hoteljan.co.ao
            </li>
          </ul>
        </div>

        {/* Links rápidos */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Início
              </Link>
            </li>
            <li>
              <Link href="/quartos" className="hover:text-yellow-400 transition">
                Quartos
              </Link>
            </li>
            <li>
              <Link href="/reservas" className="hover:text-yellow-400 transition">
                Reservas
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-yellow-400 transition">
                Contato
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Siga-nos</h4>
          <div className="flex gap-3 sm:gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
              aria-label="Facebook"
            >
              <Facebook size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
              aria-label="Instagram"
            >
              <Instagram size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
              aria-label="Twitter"
            >
              <Twitter size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-gray-700 text-center py-3 sm:py-4 text-xs sm:text-sm text-gray-400 px-4 sm:px-6">
        © {new Date().getFullYear()} Hotel Jan — Todos os direitos reservados.
      </div>
    </footer>
  );
}
