import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/hotel-hero.jpg"
          alt="Hotel Jan Talatona"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bem-vindo ao Hotel Jan
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6">
            Conforto, elegância e hospitalidade em Talatona, Belas — Angola.
          </p>
          <Link
            href="/reservas"
            className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Reservar Agora
          </Link>
        </div>
      </section>

      {/* Destaques */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-3 text-gray-900">📍 Localização Privilegiada</h3>
          <p className="text-gray-600 leading-relaxed">
            Estamos situados em Camama, Talatona, com acesso rápido às principais
            atrações de Luanda.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-3 text-gray-900">🛏️ Conforto Moderno</h3>
          <p className="text-gray-600 leading-relaxed">
            Quartos equipados com Wi-Fi rápido, ar condicionado, TV a cabo e serviço
            de quarto 24h.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-3 text-gray-900">🤝 Atendimento de Excelência</h3>
          <p className="text-gray-600 leading-relaxed">
            Nossa equipa está sempre pronta para oferecer uma experiência
            inesquecível em sua estadia.
          </p>
        </div>
      </section>

      {/* Quartos em Destaque */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Nossos Quartos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quarto Deluxe */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <Image
              src="/quarto-deluxe.jpg"
              alt="Quarto Deluxe"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Quarto Deluxe</h3>
              <p className="text-sm text-gray-600 mb-3">
                Espaçoso, elegante, com cama king-size e vista panorâmica.
              </p>
              <p className="font-bold text-yellow-600 mb-4">
                A partir de Kz 150.000 / noite
              </p>
              <Link
                href="/reservas"
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
              >
                Reservar
              </Link>
            </div>
          </div>

          {/* Quarto Standard */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <Image
              src="/quarto-standard.jpg"
              alt="Quarto Standard"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Quarto Standard</h3>
              <p className="text-sm text-gray-600 mb-3">
                Aconchegante e confortável, ideal para estadias rápidas.
              </p>
              <p className="font-bold text-yellow-600 mb-4">
                A partir de Kz 95.000 / noite
              </p>
              <Link
                href="/reservas"
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
              >
                Reservar
              </Link>
            </div>
          </div>

          {/* Suite Presidencial */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
            <Image
              src="/suite.jpg"
              alt="Suite Presidencial"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Suite Presidencial</h3>
              <p className="text-sm text-gray-600 mb-3">
                Luxo e sofisticação, com sala de estar exclusiva e jacuzzi.
              </p>
              <p className="font-bold text-yellow-600 mb-4">
                A partir de Kz 350.000 / noite
              </p>
              <Link
                href="/reservas"
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
              >
                Reservar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center bg-yellow-500 py-16 rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Garanta já a sua estadia no Hotel Jan
        </h2>
        <p className="text-lg text-black mb-6">
          Reserve online de forma rápida, segura e prática.
        </p>
        <Link
          href="/reservas"
          className="bg-black text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Reservar Agora
        </Link>
      </section>
    </div>
  );
}
