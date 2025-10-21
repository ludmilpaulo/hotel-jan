"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { 
  Star, 
  Bed, 
  Filter,
  X,
  BedDouble
} from "lucide-react";
import ImageSlider from "@/components/ImageSlider";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface RoomImage {
  id: number;
  image_url: string;
  alt_text?: string;
  order: number;
}

interface Room {
  id: number;
  name: string;
  room_type: string;
  description: string;
  price_per_night: string;
  image: string | null;
  images: RoomImage[];
}

export default function QuartosPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [ordenacao, setOrdenacao] = useState<string>("preco-asc");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://taki.pythonanywhere.com/api/rooms/");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      // Set empty array on error to prevent display issues
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };


  const roomsFiltered = rooms
    .filter(room => filtroTipo === "todos" || room.room_type === filtroTipo)
    .sort((a, b) => {
      switch (ordenacao) {
        case "preco-asc": return parseFloat(a.price_per_night) - parseFloat(b.price_per_night);
        case "preco-desc": return parseFloat(b.price_per_night) - parseFloat(a.price_per_night);
        case "nome": return a.name.localeCompare(b.name);
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
                {roomsFiltered.length} {roomsFiltered.length === 1 ? "quarto encontrado" : "quartos encontrados"}
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
                <option value="nome">Nome</option>
              </select>
            </div>
          </div>

          {/* Painel de Filtros */}
          {mostrarFiltros && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100 grid md:grid-cols-2 gap-6 animate-fade-in">
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

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFiltroTipo("todos");
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
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Carregando quartos...</p>
          </div>
        ) : roomsFiltered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Nenhum quarto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomsFiltered.map((room) => (
            <div
              key={room.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col card-hover group relative"
              >
                <div className="relative overflow-hidden">
                  <ImageSlider 
                    images={room.images || []} 
                    roomName={room.name}
                    className="h-56"
                  />
                </div>

              <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-bold text-2xl mb-2 text-gray-900">{room.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{room.description}</p>

                  {/* Informações */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Bed className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-gray-600 capitalize">{room.room_type}</p>
                    </div>
                    <div className="text-center">
                      <Star className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <p className="text-xs text-gray-600">Hotel Jan</p>
                    </div>
                  </div>

                {/* Preço + Reservar */}
                  <div className="mt-auto pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500">A partir de</p>
                        <p className="font-bold text-2xl text-yellow-600">
                          Kz {parseFloat(room.price_per_night).toLocaleString()}
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
