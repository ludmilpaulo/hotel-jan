"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Award, Gift, Star, Trophy, Crown, Zap } from "lucide-react";

interface BookingData {
  status: string;
}

export default function RewardsPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      fetchUserBookings(savedEmail);
    }
  }, []);

  const fetchUserBookings = async (email: string) => {
    try {
      const response = await axios.get("https://hoteljan.shop/api/bookings/my_bookings/", {
        params: { email },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const points = confirmedBookings * 100;
  const level =
    points >= 1000 ? "Diamante" : points >= 500 ? "Ouro" : points >= 200 ? "Prata" : "Bronze";

  const rewards = [
    {
      id: 1,
      name: "10% de Desconto",
      points: 200,
      icon: <Gift className="w-8 h-8" />,
      color: "from-blue-400 to-blue-500",
      unlocked: points >= 200,
    },
    {
      id: 2,
      name: "Upgrade de Quarto Grátis",
      points: 500,
      icon: <Star className="w-8 h-8" />,
      color: "from-purple-400 to-purple-500",
      unlocked: points >= 500,
    },
    {
      id: 3,
      name: "1 Noite Grátis",
      points: 1000,
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-400 to-yellow-500",
      unlocked: points >= 1000,
    },
    {
      id: 4,
      name: "Suite Premium Grátis",
      points: 2000,
      icon: <Crown className="w-8 h-8" />,
      color: "from-pink-400 to-pink-500",
      unlocked: points >= 2000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Programa de Recompensas</h1>
          <p className="text-black/80">Ganhe pontos e desfrute de benefícios exclusivos</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Dashboard
            </Link>
            <Link href="/dashboard/bookings" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Minhas Reservas
            </Link>
            <Link href="/dashboard/rewards" className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-2">
              Recompensas
            </Link>
            <Link href="/dashboard/profile" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Perfil
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Points Overview */}
        <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl shadow-2xl p-8 mb-8 text-black">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Seus Pontos</h2>
              <p className="text-black/80">Continue reservando para ganhar mais pontos!</p>
            </div>
            <Award className="w-16 h-16" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
              <p className="text-black/80 mb-2">Pontos Totais</p>
              <p className="text-4xl font-bold">{points}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
              <p className="text-black/80 mb-2">Nível Atual</p>
              <p className="text-4xl font-bold">{level}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
              <p className="text-black/80 mb-2">Reservas Confirmadas</p>
              <p className="text-4xl font-bold">{confirmedBookings}</p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">1. Reserve</h3>
              <p className="text-sm text-gray-600">Faça uma reserva no Hotel Jan</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">2. Ganhe Pontos</h3>
              <p className="text-sm text-gray-600">100 pontos por reserva confirmada</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">3. Suba de Nível</h3>
              <p className="text-sm text-gray-600">Alcance novos níveis de status</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">4. Resgate</h3>
              <p className="text-sm text-gray-600">Troque pontos por recompensas</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recompensas Disponíveis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`rounded-2xl shadow-lg p-6 text-white ${
                  reward.unlocked ? "opacity-100" : "opacity-50"
                } bg-gradient-to-br ${reward.color} card-hover`}
              >
                <div className="flex items-center justify-between mb-4">
                  {reward.icon}
                  {reward.unlocked && <CheckCircle className="w-6 h-6" />}
                </div>

                <h3 className="font-bold text-xl mb-2">{reward.name}</h3>
                <p className="text-white/90 mb-4">{reward.points} pontos</p>

                {reward.unlocked ? (
                  <button className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-100 transition">
                    Resgatar
                  </button>
                ) : (
                  <div className="text-white/80 text-sm">
                    Faltam {reward.points - points} pontos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Níveis de Status</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border-2 ${level === "Bronze" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>
              <h3 className="font-bold text-lg mb-2">🥉 Bronze</h3>
              <p className="text-sm text-gray-600">0-199 pontos</p>
            </div>

            <div className={`p-6 rounded-xl border-2 ${level === "Prata" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>
              <h3 className="font-bold text-lg mb-2">🥈 Prata</h3>
              <p className="text-sm text-gray-600">200-499 pontos</p>
            </div>

            <div className={`p-6 rounded-xl border-2 ${level === "Ouro" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>
              <h3 className="font-bold text-lg mb-2">🥇 Ouro</h3>
              <p className="text-sm text-gray-600">500-999 pontos</p>
            </div>

            <div className={`p-6 rounded-xl border-2 ${level === "Diamante" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}>
              <h3 className="font-bold text-lg mb-2">💎 Diamante</h3>
              <p className="text-sm text-gray-600">1000+ pontos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

