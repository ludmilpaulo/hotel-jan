"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Wifi, 
  Wind, 
  Tv, 
  Coffee, 
  Star, 
  Users, 
  Bed, 
  Maximize2, 
  Filter,
  X,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface Room {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  comodidades: string[];
  capacidade: number;
  tamanho: string;
  tipo: string;
  destaque?: boolean;
  caracteristicas: string[];
}

export default function QuartosPage() {
  const quartos: Room[] = [
    {
      id: 1,
      nome: "Quarto Deluxe",
      descricao: "Espaçoso, elegante, com cama king-size e vista panorâmica.",
      preco: 150000,
      imagem: "/quarto-deluxe.jpg",
      comodidades: ["wifi", "ac", "tv", "coffee", "frigobar"],
      capacidade: 2,
      tamanho: "35m²",
      tipo: "deluxe",
      destaque: true,
      caracteristicas: ["Cama King-Size", "Vista Panorâmica", "Varanda Privada", "Cofre Digital"]
    },
    {
      id: 2,
      nome: "Quarto Standard",
      descricao: "Aconchegante e confortável, ideal para estadias rápidas.",
      preco: 95000,
      imagem: "/quarto-standard.jpg",
      comodidades: ["wifi", "tv", "ac"],
      capacidade: 2,
      tamanho: "25m²",
      tipo: "standard",
      caracteristicas: ["Cama Queen-Size", "Banheiro Privativo", "Mesa de Trabalho"]
    },
    {
      id: 3,
      nome: "Suite Presidencial",
      descricao: "Luxo e sofisticação, com sala de estar exclusiva e jacuzzi.",
      preco: 350000,
      imagem: "/suite.jpg",
      comodidades: ["wifi", "ac", "tv", "coffee", "frigobar", "jacuzzi"],
      capacidade: 4,
      tamanho: "70m²",
      tipo: "suite",
      destaque: true,
      caracteristicas: ["Sala de Estar", "Jacuzzi", "Cama King-Size", "Varanda Grande", "Minibar Premium"]
    },
    {
      id: 4,
      nome: "Quarto Standard Twin",
      descricao: "Perfeito para amigos ou colegas de trabalho, com duas camas de solteiro.",
      preco: 95000,
      imagem: "/quarto-standard.jpg",
      comodidades: ["wifi", "tv", "ac"],
      capacidade: 2,
      tamanho: "25m²",
      tipo: "standard",
      caracteristicas: ["2 Camas de Solteiro", "Banheiro Privativo", "Mesa de Trabalho"]
    },
    {
      id: 5,
      nome: "Suite Familiar",
      descricao: "Espaço amplo ideal para famílias, com quarto separado e sala de estar.",
      preco: 250000,
      imagem: "/quarto-deluxe.jpg",
      comodidades: ["wifi", "ac", "tv", "coffee", "frigobar"],
      capacidade: 4,
      tamanho: "50m²",
      tipo: "suite",
      caracteristicas: ["2 Quartos", "Sala de Estar", "Cama King + 2 Solteiro", "Cozinha Compacta"]
    },
    {
      id: 6,
      nome: "Quarto Deluxe Twin",
      descricao: "Versão twin do quarto deluxe, perfeito para executivos.",
      preco: 150000,
      imagem: "/quarto-deluxe.jpg",
      comodidades: ["wifi", "ac", "tv", "coffee", "frigobar"],
      capacidade: 2,
      tamanho: "35m²",
      tipo: "deluxe",
      caracteristicas: ["2 Camas de Solteiro", "Vista Panorâmica", "Varanda Privada", "Cofre Digital"]
    }
  ];

  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroCapacidade, setFiltroCapacidade] = useState<number>(0);
  const [ordenacao, setOrdenacao] = useState<string>("preco-asc");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const getComodidadeIcon = (comodidade: string) => {
    switch (comodidade) {
      case "wifi": return <Wifi className="w-5 h-5" />;
      case "ac": return <Wind className="w-5 h-5" />;
      case "tv": return <Tv className="w-5 h-5" />;
      case "coffee": return <Coffee className="w-5 h-5" />;
      case "frigobar": return <Coffee className="w-5 h-5" />;
      case "jacuzzi": return <Sparkles className="w-5 h-5" />;
      default: return null;
    }
  };

  const getComodidadeNome = (comodidade: string) => {
    switch (comodidade) {
      case "wifi": return "Wi-Fi";
      case "ac": return "Ar Condicionado";
      case "tv": return "TV a Cabo";
      case "coffee": return "Café";
      case "frigobar": return "Frigobar";
      case "jacuzzi": return "Jacuzzi";
      default: return comodidade;
    }
  };

  const quartosFiltrados = quartos
    .filter(q => filtroTipo === "todos" || q.tipo === filtroTipo)
    .filter(q => filtroCapacidade === 0 || q.capacidade >= filtroCapacidade)
    .sort((a, b) => {
      switch (ordenacao) {
        case "preco-asc": return a.preco - b.preco;
        case "preco-desc": return b.preco - a.preco;
        case "capacidade": return b.capacidade - a.capacidade;
        case "tamanho": return parseInt(b.tamanho) - parseInt(a.tamanho);
        default: return 0;
      }
    });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
        <Image
          src="/quartos-hero.jpg"
          alt="Quartos Hotel Jan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex flex-col items-center justify-center text-center px-6">
          <Bed className="w-16 h-16 text-yellow-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nossos Quartos
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
            Descubra as acomodações do Hotel Jan — cada detalhe pensado para o seu conforto e bem-estar.
          </p>
        </div>
      </section>

      {/* Filtros e Ordenação */}
      <section className="animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                {mostrarFiltros ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                {mostrarFiltros ? "Fechar" : "Filtros"}
              </button>
              <span className="text-gray-600 font-medium">
                {quartosFiltrados.length} {quartosFiltrados.length === 1 ? "quarto encontrado" : "quartos encontrados"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">Ordenar por:</label>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
              >
                <option value="preco-asc">Menor Preço</option>
                <option value="preco-desc">Maior Preço</option>
                <option value="capacidade">Capacidade</option>
                <option value="tamanho">Tamanho</option>
              </select>
            </div>
          </div>

          {/* Painel de Filtros */}
          {mostrarFiltros && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100 grid md:grid-cols-3 gap-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Tipo de Quarto</label>
                <div className="space-y-2">
                  {["todos", "standard", "deluxe", "suite"].map(tipo => (
                    <button
                      key={tipo}
                      onClick={() => setFiltroTipo(tipo)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        filtroTipo === tipo
                          ? "bg-yellow-500 text-black font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tipo === "todos" ? "Todos" : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Capacidade Mínima</label>
                <div className="space-y-2">
                  {[0, 2, 4].map(cap => (
                    <button
                      key={cap}
                      onClick={() => setFiltroCapacidade(cap)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                        filtroCapacidade === cap
                          ? "bg-yellow-500 text-black font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      {cap === 0 ? "Todas" : `${cap}+ pessoas`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFiltroTipo("todos");
                    setFiltroCapacidade(0);
                    setOrdenacao("preco-asc");
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Listagem de Quartos */}
      <section className="animate-fade-in-up">
        {quartosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Nenhum quarto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quartosFiltrados.map((quarto) => (
            <div
              key={quarto.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col card-hover group relative"
              >
                {quarto.destaque && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-3 py-1 rounded-lg shadow-lg text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-black" />
                    Popular
                  </div>
                )}
                
                <div className="relative overflow-hidden">
              <Image
                src={quarto.imagem}
                alt={quarto.nome}
                width={500}
                height={300}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
                </div>

              <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-bold text-2xl mb-2 text-gray-900">{quarto.nome}</h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{quarto.descricao}</p>

                  {/* Informações */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Users className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-gray-600">{quarto.capacidade} pessoas</p>
                    </div>
                    <div className="text-center">
                      <Maximize2 className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-gray-600">{quarto.tamanho}</p>
                    </div>
                    <div className="text-center">
                      <Bed className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-gray-600 capitalize">{quarto.tipo}</p>
                    </div>
                  </div>

                {/* Comodidades */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Comodidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {quarto.comodidades.slice(0, 5).map((comodidade, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs"
                          title={getComodidadeNome(comodidade)}
                        >
                          {getComodidadeIcon(comodidade)}
                        </div>
                      ))}
                      {quarto.comodidades.length > 5 && (
                        <span className="text-xs text-gray-500 px-2 py-1">+{quarto.comodidades.length - 5}</span>
                      )}
                    </div>
                  </div>

                  {/* Características */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Destaques:</p>
                    <ul className="space-y-1">
                      {quarto.caracteristicas.slice(0, 3).map((carac, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {carac}
                        </li>
                      ))}
                    </ul>
                </div>

                {/* Preço + Reservar */}
                  <div className="mt-auto pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500">A partir de</p>
                        <p className="font-bold text-2xl text-yellow-600">
                          Kz {quarto.preco.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">por noite</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  <Link
                    href="/reservas"
                      className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                      Reservar Agora
                  </Link>
                  </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-12 text-center shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Não Encontrou o Quarto Ideal?
        </h2>
        <p className="text-lg text-black/90 mb-6 max-w-2xl mx-auto">
          Entre em contato conosco e nossa equipe ajudará você a encontrar a acomodação perfeita para sua estadia.
        </p>
        <Link
          href="/contato"
          className="inline-block bg-black text-white font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-gray-800 hover:scale-105 transition-all transform"
        >
          Falar com Especialista
        </Link>
      </section>
    </div>
  );
}
