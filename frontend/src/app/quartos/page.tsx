import Image from "next/image";
import Link from "next/link";
import { Wifi, Wind, Tv, Coffee } from "lucide-react";

export default function QuartosPage() {
  const quartos = [
    {
      id: 1,
      nome: "Quarto Deluxe",
      descricao: "Espaçoso, elegante, com cama king-size e vista panorâmica.",
      preco: "Kz 150.000 / noite",
      imagem: "/quarto-deluxe.jpg",
      comodidades: [<Wifi key="wifi" />, <Wind key="ac" />, <Tv key="tv" />, <Coffee key="coffee" />],
    },
    {
      id: 2,
      nome: "Quarto Standard",
      descricao: "Aconchegante e confortável, ideal para estadias rápidas.",
      preco: "Kz 95.000 / noite",
      imagem: "/quarto-standard.jpg",
      comodidades: [<Wifi key="wifi" />, <Tv key="tv" />],
    },
    {
      id: 3,
      nome: "Suite Presidencial",
      descricao: "Luxo e sofisticação, com sala de estar exclusiva e jacuzzi.",
      preco: "Kz 350.000 / noite",
      imagem: "/suite.jpg",
      comodidades: [<Wifi key="wifi" />, <Wind key="ac" />, <Tv key="tv" />, <Coffee key="coffee" />],
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/quartos-hero.jpg"
          alt="Quartos Hotel Jan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Quartos
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Descubra as acomodações do Hotel Jan — cada detalhe pensado para o seu conforto e bem-estar.
          </p>
        </div>
      </section>

      {/* Listagem de Quartos */}
      <section>
        <div className="grid md:grid-cols-3 gap-10">
          {quartos.map((quarto) => (
            <div
              key={quarto.id}
              className="bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden flex flex-col"
            >
              <Image
                src={quarto.imagem}
                alt={quarto.nome}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-semibold text-xl mb-2">{quarto.nome}</h2>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{quarto.descricao}</p>

                {/* Comodidades */}
                <div className="flex gap-4 text-yellow-600 mb-4">
                  {quarto.comodidades.map((icon, index) => (
                    <span key={index}>{icon}</span>
                  ))}
                </div>

                {/* Preço + Reservar */}
                <div className="flex items-center justify-between mt-auto">
                  <p className="font-bold text-yellow-600">{quarto.preco}</p>
                  <Link
                    href="/reservas"
                    className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
