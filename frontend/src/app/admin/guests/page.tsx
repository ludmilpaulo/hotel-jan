"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Users, Search, Mail, Phone } from "lucide-react";

interface Guest {
  email: string;
  name: string;
  phone: string;
  total_bookings: number;
  total_spent: number;
}

export default function AdminGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = guests.filter(
        (g) =>
          g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests(guests);
    }
  }, [searchTerm, guests]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/bookings/");
      interface BookingData {
        email: string;
        name: string;
        phone: string;
        total_price: string;
      }

      const bookings: BookingData[] = response.data;

      // Group bookings by email
      const guestMap = new Map<string, Guest>();

      bookings.forEach((booking) => {
        const existing = guestMap.get(booking.email);
        if (existing) {
          existing.total_bookings += 1;
          existing.total_spent += parseFloat(booking.total_price);
        } else {
          guestMap.set(booking.email, {
            email: booking.email,
            name: booking.name,
            phone: booking.phone,
            total_bookings: 1,
            total_spent: parseFloat(booking.total_price),
          });
        }
      });

      const guestList = Array.from(guestMap.values());
      guestList.sort((a, b) => b.total_bookings - a.total_bookings);

      setGuests(guestList);
      setFilteredGuests(guestList);
    } catch (error) {
      console.error("Error fetching guests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Gestão de Hóspedes</h1>
          <p className="text-black/80">Lista de todos os hóspedes do hotel</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link href="/admin" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Reservas
            </Link>
            <Link href="/admin/rooms" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Quartos
            </Link>
            <Link href="/admin/guests" className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-2">
              Hóspedes
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
            />
          </div>
          <p className="mt-4 text-gray-600">
            <span className="font-semibold">{filteredGuests.length}</span> hóspedes encontrados
          </p>
        </div>

        {/* Guests Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando hóspedes...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Nome</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Telefone</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-700">Reservas</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Total Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.email} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-yellow-600" />
                          </div>
                          <p className="font-semibold text-gray-900">{guest.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {guest.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {guest.phone}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {guest.total_bookings}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-gray-900">
                        Kz {guest.total_spent.toLocaleString('pt-PT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

