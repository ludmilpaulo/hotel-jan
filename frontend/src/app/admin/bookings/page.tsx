"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Mail,
  XCircle,
  Eye,
} from "lucide-react";

interface Booking {
  id: number;
  booking_number: string;
  room: number;
  room_name: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  check_in: string;
  check_out: string;
  nights: number;
  status: string;
  payment_status: string;
  total_price: string;
  special_requests?: string;
  created_at: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/bookings/");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

    try {
      await axios.post(`http://localhost:8000/api/bookings/${bookingId}/cancel/`);
      alert("Reserva cancelada com sucesso!");
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Erro ao cancelar reserva.");
    }
  };

  const handleResendEmail = async (bookingId: number) => {
    try {
      await axios.post(`http://localhost:8000/api/bookings/${bookingId}/resend_confirmation/`);
      alert("Email reenviado com sucesso!");
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Erro ao reenviar email.");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Gestão de Reservas</h1>
          <p className="text-black/80">Gerencie todas as reservas do hotel</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link href="/admin" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-2">
              Reservas
            </Link>
            <Link href="/admin/rooms" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Quartos
            </Link>
            <Link href="/admin/guests" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Hóspedes
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pesquisar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Número, nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none appearance-none bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="pending">Pendentes</option>
                  <option value="cancelled">Canceladas</option>
                  <option value="completed">Completas</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredBookings.length}</span> reservas encontradas
            </p>
            <button
              onClick={fetchBookings}
              className="text-yellow-600 hover:text-yellow-700 font-semibold"
            >
              Atualizar ↻
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando reservas...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Reserva</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Hóspede</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Quarto</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Datas</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Total</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-mono text-sm font-semibold text-gray-900">
                            {booking.booking_number}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(booking.created_at).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.name}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                          <p className="text-xs text-gray-400">{booking.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-700">{booking.room_name}</p>
                        <p className="text-xs text-gray-500">{booking.guests} hóspede(s)</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-700">
                            {new Date(booking.check_in).toLocaleDateString('pt-PT')}
                          </p>
                          <p className="text-gray-500">→</p>
                          <p className="text-gray-700">
                            {new Date(booking.check_out).toLocaleDateString('pt-PT')}
                          </p>
                          <p className="text-xs text-gray-400">{booking.nights} noite(s)</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status === "confirmed"
                            ? "Confirmada"
                            : booking.status === "pending"
                            ? "Pendente"
                            : booking.status === "cancelled"
                            ? "Cancelada"
                            : "Completa"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="font-bold text-gray-900">
                          Kz {parseFloat(booking.total_price).toLocaleString('pt-PT')}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Ver Detalhes"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => downloadInvoice(booking.id, booking.booking_number)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Baixar Fatura"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleResendEmail(booking.id)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            title="Reenviar Email"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                          {booking.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Cancelar"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-black rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Detalhes da Reserva</h2>
                  <p className="text-black/80">#{selectedBooking.booking_number}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-black/10 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Hóspede</p>
                  <p className="font-bold text-gray-900">{selectedBooking.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Telefone</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Hóspedes</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.guests}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Quarto</p>
                  <p className="font-semibold text-gray-900">{selectedBooking.room_name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedBooking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {selectedBooking.status === "confirmed" ? "Confirmada" : "Pendente"}
                  </span>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Pedidos Especiais:</p>
                  <p className="text-blue-800">{selectedBooking.special_requests}</p>
                </div>
              )}

              <div className="bg-yellow-500 text-black p-4 rounded-lg text-center">
                <p className="text-sm mb-1">Total</p>
                <p className="text-2xl font-bold">
                  Kz {parseFloat(selectedBooking.total_price).toLocaleString('pt-PT')}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

