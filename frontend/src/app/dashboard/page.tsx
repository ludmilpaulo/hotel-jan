"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Calendar,
  Download,
  Award,
  User,
  Star,
  CheckCircle2,
} from "lucide-react";

interface Booking {
  id: number;
  booking_number: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  status: string;
  total_price: string;
  is_upcoming: boolean;
  is_active: boolean;
}

export default function UserDashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setShowEmailInput(false);
      fetchUserBookings(savedEmail);
    }
  }, []);

  const fetchUserBookings = async (email: string) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/bookings/my_bookings/", {
        params: { email },
      });
      setBookings(response.data);
      
      // Calculate reward points (100 points per booking)
      const points = response.data.filter((b: Booking) => b.status === "confirmed").length * 100;
      setRewardPoints(points);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
      setShowEmailInput(false);
      fetchUserBookings(userEmail);
    }
  };

  const downloadInvoice = async (bookingId: number, bookingNumber: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/bookings/${bookingId}/invoice/`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `fatura_${bookingNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Erro ao baixar fatura.");
    }
  };

  const upcomingBookings = bookings.filter((b) => b.is_upcoming && b.status !== "cancelled");
  const pastBookings = bookings.filter((b) => !b.is_upcoming && b.status !== "cancelled");
  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + parseFloat(b.total_price), 0);

  if (showEmailInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
          <div className="text-center mb-6">
            <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel do Hóspede</h1>
            <p className="text-gray-600">
              Entre com seu email para ver suas reservas
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                placeholder="seu@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
            >
              Acessar Minhas Reservas
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-yellow-600 transition"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Meu Painel</h1>
              <p className="text-black/80">{userEmail}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Voltar ao Site
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  setUserEmail("");
                  setShowEmailInput(true);
                  setBookings([]);
                }}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link
              href="/dashboard"
              className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-2"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/bookings"
              className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition"
            >
              Minhas Reservas
            </Link>
            <Link
              href="/dashboard/rewards"
              className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition"
            >
              Recompensas
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition"
            >
              Perfil
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando suas reservas...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total de Reservas</h3>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Próximas Estadias</h3>
                <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Pontos de Recompensa</h3>
                <p className="text-3xl font-bold text-gray-900">{rewardPoints}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Gasto</h3>
                <p className="text-xl font-bold text-gray-900">
                  Kz {totalSpent.toLocaleString('pt-PT')}
                </p>
              </div>
            </div>

            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximas Estadias</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-6 border-2 border-green-200 card-hover"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-mono text-sm font-semibold text-gray-900">
                            {booking.booking_number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.room_name}
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Confirmada
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(booking.check_in).toLocaleDateString('pt-PT')} →{" "}
                            {new Date(booking.check_out).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.nights} noite(s) • {booking.guests} hóspede(s)
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="font-bold text-lg text-gray-900">
                          Kz {parseFloat(booking.total_price).toLocaleString('pt-PT')}
                        </span>
                        <button
                          onClick={() => downloadInvoice(booking.id, booking.booking_number)}
                          className="text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Fatura
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico de Estadias</h2>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Reserva</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Quarto</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Data</th>
                        <th className="text-right py-4 px-6 font-semibold text-gray-700">Total</th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-700">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastBookings.map((booking) => (
                        <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <p className="font-mono text-sm font-semibold text-gray-900">
                              {booking.booking_number}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-gray-700">{booking.room_name}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {new Date(booking.check_in).toLocaleDateString('pt-PT')}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-gray-900">
                            Kz {parseFloat(booking.total_price).toLocaleString('pt-PT')}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => downloadInvoice(booking.id, booking.booking_number)}
                              className="text-yellow-600 hover:text-yellow-700 p-2 rounded-lg hover:bg-yellow-50 transition"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {bookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhuma reserva encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  Você ainda não tem reservas. Que tal fazer sua primeira reserva?
                </p>
                <Link
                  href="/reservas"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-xl transition"
                >
                  Fazer Reserva
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

