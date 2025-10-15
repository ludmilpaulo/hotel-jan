"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  HelpCircle,
  Search,
  Filter,
} from "lucide-react";

interface Booking {
  id: number;
  booking_number: string;
  name: string;
  email: string;
  phone: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  status: string;
  total_price: string;
  created_at: string;
}

function StaffBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

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

  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:8000/api/bookings/${bookingId}/`, {
        status: newStatus
      });
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Erro ao atualizar status da reserva.");
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestão de Reservas</h1>
              <p className="text-white/80">
                Gerencie todas as reservas do hotel
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                Ajuda
              </button>
              <Link
                href="/staff"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Voltar ao Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
          <div className="container mx-auto">
            <h3 className="text-lg font-bold text-blue-800 mb-3">Guia de Gestão de Reservas</h3>
            <div className="text-blue-700 space-y-2">
              <p><strong>1. Visualizar Reservas:</strong> Veja todas as reservas do hotel em uma lista organizada</p>
              <p><strong>2. Filtrar:</strong> Use os filtros para encontrar reservas específicas por status ou nome</p>
              <p><strong>3. Buscar:</strong> Digite o nome do hóspede, email ou número da reserva para encontrar rapidamente</p>
              <p><strong>4. Alterar Status:</strong> Clique nos botões para confirmar, cancelar ou marcar como pendente</p>
              <p><strong>5. Ver Detalhes:</strong> Clique no ícone de olho para ver informações completas da reserva</p>
              <p><strong>6. Status das Reservas:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <strong>Pendente:</strong> Aguardando confirmação</li>
                <li>• <strong>Confirmada:</strong> Reserva aprovada e válida</li>
                <li>• <strong>Cancelada:</strong> Reserva cancelada</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link
              href="/staff"
              className="text-gray-600 hover:text-blue-600 font-medium pb-2 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/staff/bookings"
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
            >
              Reservas
            </Link>
            <Link
              href="/staff/rooms"
              className="text-gray-600 hover:text-blue-600 font-medium pb-2 transition"
            >
              Quartos
            </Link>
            <Link
              href="/staff/guests"
              className="text-gray-600 hover:text-blue-600 font-medium pb-2 transition"
            >
              Hóspedes
            </Link>
            {user?.role === 'MANAGER' && (
              <Link
                href="/staff/reports"
                className="text-gray-600 hover:text-blue-600 font-medium pb-2 transition"
              >
                Relatórios
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou número da reserva..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendentes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Reservas ({filteredBookings.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Reserva</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Hóspede</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Quarto</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Total</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-mono text-sm font-semibold text-gray-900">
                        {booking.booking_number}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString('pt-PT')}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{booking.name}</p>
                      <p className="text-sm text-gray-500">{booking.email}</p>
                      <p className="text-sm text-gray-500">{booking.phone}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <p>{booking.room_name}</p>
                      <p className="text-sm text-gray-500">{booking.guests} hóspede(s)</p>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <p>{new Date(booking.check_in).toLocaleDateString('pt-PT')}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.check_out).toLocaleDateString('pt-PT')}
                      </p>
                      <p className="text-sm text-gray-500">{booking.nights} noite(s)</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-gray-900">
                      Kz {parseFloat(booking.total_price).toLocaleString('pt-PT')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                          title="Ver detalhes"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        {booking.status === "pending" && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
                            title="Confirmar reserva"
                          >
                            Confirmar
                          </button>
                        )}
                        
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
                            title="Cancelar reserva"
                          >
                            Cancelar
                          </button>
                        )}
                        
                        {booking.status === "cancelled" && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, "pending")}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
                            title="Reativar reserva"
                          >
                            Reativar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nenhuma reserva encontrada
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" 
                  ? "Tente ajustar os filtros de busca."
                  : "Ainda não há reservas no sistema."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StaffBookingsPageWrapper() {
  return (
    <ProtectedRoute requireStaff={true}>
      <StaffBookingsPage />
    </ProtectedRoute>
  );
}
