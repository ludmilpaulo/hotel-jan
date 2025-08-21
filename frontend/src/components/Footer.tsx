import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Sobre */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            <span className="text-yellow-500">Hotel</span> Jan
          </h3>
          <p className="text-sm leading-relaxed">
            Conforto, elegância e hospitalidade em Talatona, Belas.  
            A sua estadia inesquecível em Angola começa aqui.
          </p>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-yellow-500" />
              Rua Hotel Jan, Camama, Talatona, Belas, Angola
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-yellow-500" />
              +244 914 260 030
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-yellow-500" />
              reservas@hoteljan.co.ao
            </li>
          </ul>
        </div>

        {/* Links rápidos */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
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
          <h4 className="text-lg font-semibold text-white mb-4">Siga-nos</h4>
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-yellow-500 hover:text-black transition"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Hotel Jan — Todos os direitos reservados.
      </div>
    </footer>
  );
}
