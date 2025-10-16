"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { StaffHelpGuide } from '@/components/HelpGuide';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  BarChart3,
} from "lucide-react";

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  totalRooms: number;
  occupancyRate: number;
  upcomingCheckIns: number;
}

interface Booking {
  id: number;
  booking_number: string;
  name: string;
  room_name: string;
  check_in: string;
  status: string;
  total_price: string;
  created_at: string;
}

function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    totalRooms: 0,
    occupancyRate: 0,
    upcomingCheckIns: 0,
  });

  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, roomsRes] = await Promise.all([
        axios.get("https://taki.pythonanywhere.com/api/bookings/"),
        axios.get("https://taki.pythonanywhere.com/api/rooms/"),
      ]);

      const bookings: Booking[] = bookingsRes.data;
      const rooms: { id: number }[] = roomsRes.data;

      // Calculate stats
      const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
      const pendingCount = bookings.filter((b) => b.status === "pending").length;
      const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;
      
      const totalRevenue = bookings
        .filter((b) => b.status !== "cancelled")
        .reduce((sum: number, b) => sum + parseFloat(b.total_price || "0"), 0);

      const today = new Date();
      const upcomingCheckIns = bookings.filter((b) => {
        const checkIn = new Date(b.check_in);
        return checkIn >= today && b.status === "confirmed";
      }).length;

      setStats({
        totalBookings: bookings.length,
        confirmedBookings: confirmedCount,
        pendingBookings: pendingCount,
        cancelledBookings: cancelledCount,
        totalRevenue,
        totalRooms: rooms.length,
        occupancyRate: rooms.length > 0 ? (confirmedCount / rooms.length) * 100 : 0,
        upcomingCheckIns,
      });

      // Get recent bookings (last 10)
      setRecentBookings(bookings.slice(0, 10));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
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
              <h1 className="text-3xl font-bold mb-2">
                {user?.role === 'MANAGER' ? 'Dashboard do Gerente' : 'Dashboard da Equipe'}
              </h1>
              <p className="text-white/80">
                Bem-vindo, {user?.first_name || user?.username}
              </p>
            </div>
            <div className="flex gap-3">
              <StaffHelpGuide />
              <Link
                href="/"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Voltar ao Site
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link
              href="/staff"
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
            >
              Dashboard
            </Link>
            <Link
              href="/staff/bookings"
              className="text-gray-600 hover:text-blue-600 font-medium pb-2 transition"
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

      {/* Stats Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total de Reservas</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          </div>

          {/* Confirmed Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Confirmadas</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.confirmedBookings}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Receita Total</h3>
            <p className="text-3xl font-bold text-gray-900">
              Kz {stats.totalRevenue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Upcoming Check-ins */}
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Check-ins Próximos</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.upcomingCheckIns}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8" />
              <span className="text-3xl font-bold">{stats.pendingBookings}</span>
            </div>
            <h3 className="text-lg font-semibold">Pendentes</h3>
            <p className="text-white/80">Aguardando confirmação</p>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <XCircle className="w-8 h-8" />
              <span className="text-3xl font-bold">{stats.cancelledBookings}</span>
            </div>
            <h3 className="text-lg font-semibold">Canceladas</h3>
            <p className="text-white/80">Reservas canceladas</p>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8" />
              <span className="text-3xl font-bold">{stats.occupancyRate.toFixed(1)}%</span>
            </div>
            <h3 className="text-lg font-semibold">Taxa de Ocupação</h3>
            <p className="text-white/80">Quartos ocupados</p>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reservas Recentes</h2>
            <Link
              href="/staff/bookings"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Ver Todas →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nº Reserva</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hóspede</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Quarto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-semibold text-gray-900">
                        {booking.booking_number}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{booking.name}</td>
                    <td className="py-3 px-4 text-gray-700">{booking.room_name}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(booking.check_in).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status === "confirmed"
                          ? "Confirmada"
                          : booking.status === "pending"
                          ? "Pendente"
                          : "Cancelada"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      Kz {parseFloat(booking.total_price).toLocaleString('pt-PT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StaffPage() {
  return (
    <ProtectedRoute requireStaff={true}>
      <StaffDashboard />
    </ProtectedRoute>
  );
}
