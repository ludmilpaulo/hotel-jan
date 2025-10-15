import Image from "next/image";
import Link from "next/link";
import { Star, Award, Clock, Shield, MapPin, Sparkles } from "lucide-react";

export default function HomePage() {
  const testimonials = [
    {
      id: 1,
      name: "Maria Santos",
      role: "Empresária",
      content: "Excelente hotel! O atendimento foi impecável e o quarto estava perfeito. Com certeza voltarei em minha próxima viagem a Luanda.",
      rating: 5,
      image: "MS"
    },
    {
      id: 2,
      name: "João Pedro",
      role: "Turista",
      content: "Localização privilegiada e staff muito atencioso. O pequeno-almoço estava delicioso e a limpeza impecável. Recomendo!",
      rating: 5,
      image: "JP"
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Consultora",
      content: "Superou minhas expectativas! Quartos confortáveis, Wi-Fi rápido e uma equipe sempre pronta para ajudar. Vale muito a pena!",
      rating: 5,
      image: "AC"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
        <Image
          src="/hotel-hero.jpg"
          alt="Hotel Jan Talatona"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 text-yellow-400">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Hotel Premium em Talatona</span>
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in-up leading-tight">
            Bem-vindo ao Hotel Jan
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-3xl mb-6 sm:mb-8 leading-relaxed px-2">
            Conforto, elegância e hospitalidade em Talatona, Belas — Angola.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none">
            <Link
              href="/reservas"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform text-sm sm:text-base"
            >
              Reservar Agora
            </Link>
            <Link
              href="/quartos"
              className="bg-white/10 backdrop-blur-md text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-xl hover:bg-white/20 transition-all border-2 border-white/30 text-sm sm:text-base"
            >
              Ver Quartos
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-8 mt-8 sm:mt-12 justify-center">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">50+</p>
              <p className="text-xs sm:text-sm text-gray-300">Quartos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">5.0</p>
              <p className="text-xs sm:text-sm text-gray-300">Avaliação</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">24/7</p>
              <p className="text-xs sm:text-sm text-gray-300">Atendimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up">
        <div className="bg-gradient-to-br from-yellow-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover border border-yellow-100">
          <div className="bg-yellow-500 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">Localização Privilegiada</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Estamos situados em Camama, Talatona, com acesso rápido às principais
            atrações de Luanda.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover border border-blue-100">
          <div className="bg-blue-500 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">Conforto Premium</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Quartos equipados com Wi-Fi rápido, ar condicionado, TV a cabo e serviço
            de quarto 24h.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover border border-green-100">
          <div className="bg-green-500 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">Segurança Garantida</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Sistema de segurança 24h, estacionamento privado e equipe treinada para
            seu bem-estar.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover border border-purple-100">
          <div className="bg-purple-500 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">Atendimento 24/7</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Nossa equipa está sempre pronta para oferecer uma experiência
            inesquecível em sua estadia.
          </p>
        </div>
      </section>

      {/* Quartos em Destaque */}
      <section className="animate-fade-in-up">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-yellow-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">Acomodações</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">Nossos Quartos</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Escolha entre nossas opções de acomodações premium, todas equipadas com o melhor para sua estadia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Quarto Deluxe */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden card-hover group">
            <div className="relative overflow-hidden">
              <Image
                src="/quarto-deluxe.jpg"
                alt="Quarto Deluxe"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-yellow-500 text-black font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm">
                Popular
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">Quarto Deluxe</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Espaçoso, elegante, com cama king-size e vista panorâmica.
              </p>
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-bold text-lg sm:text-2xl text-yellow-600 mb-3 sm:mb-4">
                Kz 150.000 <span className="text-xs sm:text-sm text-gray-500 font-normal">/ noite</span>
              </p>
              <Link
                href="/reservas"
                className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Reservar Agora
              </Link>
            </div>
          </div>

          {/* Quarto Standard */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden card-hover group">
            <div className="relative overflow-hidden">
              <Image
                src="/quarto-standard.jpg"
                alt="Quarto Standard"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">Quarto Standard</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Aconchegante e confortável, ideal para estadias rápidas.
              </p>
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-bold text-lg sm:text-2xl text-yellow-600 mb-3 sm:mb-4">
                Kz 95.000 <span className="text-xs sm:text-sm text-gray-500 font-normal">/ noite</span>
              </p>
              <Link
                href="/reservas"
                className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Reservar Agora
              </Link>
            </div>
          </div>

          {/* Suite Presidencial */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden card-hover group sm:col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden">
              <Image
                src="/suite.jpg"
                alt="Suite Presidencial"
                width={500}
                height={300}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm">
                Luxo
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">Suite Presidencial</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Luxo e sofisticação, com sala de estar exclusiva e jacuzzi.
              </p>
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-bold text-lg sm:text-2xl text-yellow-600 mb-3 sm:mb-4">
                Kz 350.000 <span className="text-xs sm:text-sm text-gray-500 font-normal">/ noite</span>
              </p>
              <Link
                href="/reservas"
                className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Reservar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 -mx-4 sm:-mx-6 px-4 sm:px-6 py-12 sm:py-16 rounded-2xl sm:rounded-3xl animate-fade-in-up">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-yellow-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">O Que Dizem Nossos Hóspedes</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Experiências reais de quem já se hospedou no Hotel Jan
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all card-hover"
            >
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm sm:text-lg">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-gray-900">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-12 sm:py-16 lg:py-20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-4 sm:px-6">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-black" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
            Garanta já a sua estadia no Hotel Jan
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Reserve online de forma rápida, segura e prática. Ofertas especiais disponíveis!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/reservas"
              className="bg-black text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl shadow-xl hover:bg-gray-800 hover:scale-105 transition-all transform text-sm sm:text-base"
            >
              Reservar Agora
            </Link>
            <Link
              href="/contato"
              className="bg-white text-black font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl shadow-xl hover:bg-gray-100 hover:scale-105 transition-all transform text-sm sm:text-base"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
