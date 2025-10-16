'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Booking {
  id: number;
  booking_number: string;
  room: number;
  room_name: string;
  room_type: string;
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
  updated_at: string;
  is_upcoming: boolean;
  is_active: boolean;
  confirmation_email_sent: boolean;
  invoice_generated: boolean;
}

export default function UserBookings() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.email) {
      setEmail(user.email);
      fetchBookings(user.email);
    }
  }, [isAuthenticated, user, router]);

  const fetchBookings = async (userEmail: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://taki.pythonanywhere.com/api/bookings/my_bookings/?email=${encodeURIComponent(userEmail)}`,
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setBookings(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Erro ao carregar reservas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      fetchBookings(email.trim());
    }
  };

  const downloadInvoice = async (bookingId: number, bookingNumber: string) => {
    try {
      const response = await axios.get(
        `https://taki.pythonanywhere.com/api/bookings/${bookingId}/invoice/`,
        {
          headers: {
            'Authorization': `Token ${localStorage.getItem('authToken')}`,
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${bookingNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading invoice:', err);
      alert('Erro ao baixar fatura. Tente novamente.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Minhas Reservas</h1>
          <p className="mt-2 text-gray-600">
            Gerencie suas reservas e visualize o histórico de estadias
          </p>
        </div>

        {/* Email Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Buscar Reservas por Email
          </h2>
          <form onSubmit={handleEmailSearch} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h3>
                <p className="mt-2 text-gray-600">
                  Não foram encontradas reservas para este email.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/reservas')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Fazer Nova Reserva
                  </button>
                </div>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.room_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Reserva: {booking.booking_number}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status === 'confirmed' ? 'Confirmada' : booking.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.payment_status)}`}>
                          {booking.payment_status === 'pending' ? 'Pagamento Pendente' : booking.payment_status === 'paid' ? 'Pago' : booking.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Check-in</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(booking.check_in)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Check-out</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(booking.check_out)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Hóspedes</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.guests} pessoa(s)</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Total</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">
                          ${booking.total_price}
                        </dd>
                      </div>
                    </div>

                    {booking.special_requests && (
                      <div className="mt-4">
                        <dt className="text-sm font-medium text-gray-500">Pedidos Especiais</dt>
                        <dd className="mt-1 text-sm text-gray-900">{booking.special_requests}</dd>
                      </div>
                    )}

                    <div className="mt-6 flex space-x-4">
                      {booking.invoice_generated && (
                        <button
                          onClick={() => downloadInvoice(booking.id, booking.booking_number)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Baixar Fatura
                        </button>
                      )}
                      
                      <button
                        onClick={() => router.push('/contato')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Contatar Hotel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
