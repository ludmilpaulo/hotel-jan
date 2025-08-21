"use client";

import { useState } from "react";
import { CalendarDays, Users, BedDouble } from "lucide-react";

export default function ReservasPage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hospedes, setHospedes] = useState(1);
  const [quarto, setQuarto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui futuramente conecta ao backend Django
    alert(
      `Reserva enviada:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nHóspedes: ${hospedes}\nQuarto: ${quarto}`
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-[url('/reserva-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Faça a sua Reserva
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Reserve sua estadia no Hotel Jan de forma rápida e prática.
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Formulário de Reserva
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Data de Check-in
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Data de Check-out
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Hóspedes */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Número de Hóspedes
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                min="1"
                value={hospedes}
                onChange={(e) => setHospedes(Number(e.target.value))}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Tipo de Quarto */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Tipo de Quarto
            </label>
            <div className="relative">
              <BedDouble className="absolute left-3 top-3 text-gray-400" />
              <select
                value={quarto}
                onChange={(e) => setQuarto(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                required
              >
                <option value="">Selecione um quarto</option>
                <option value="Deluxe">Quarto Deluxe</option>
                <option value="Standard">Quarto Standard</option>
                <option value="Suite Presidencial">Suite Presidencial</option>
              </select>
            </div>
          </div>

          {/* Botão */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-400 transition"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
