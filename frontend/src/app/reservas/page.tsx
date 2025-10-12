"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Users, 
  BedDouble, 
  CheckCircle2,
  Loader2,
  AlertCircle,
  CreditCard,
  MapPin
} from "lucide-react";

interface Room {
  id: number;
  name: string;
  room_type: string;
  description: string;
  price_per_night: string;
  image: string;
}

export default function ReservasPage() {
  const [selection, setSelection] = useState<any>({
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
    key: "selection",
  });

  const [reservedDates, setReservedDates] = useState<any[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");

  // Buscar quartos e reservas
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [roomsRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/rooms/"),
    axios.get("http://localhost:8000/api/bookings/")
        ]);
        
        setRooms(roomsRes.data);
        if (roomsRes.data.length > 0) {
          setSelectedRoom(roomsRes.data[0]);
        }
        
        setReservedDates(bookingsRes.data.map((b: any) => ({
          startDate: new Date(b.check_in),
          endDate: new Date(b.check_out),
          key: "reserved"
        })));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setMessageType("error");
        setMessage("Erro ao carregar informações. Por favor, recarregue a página.");
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, []);

  const calculateNights = () => {
    return differenceInDays(selection.endDate, selection.startDate);
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    return nights * parseFloat(selectedRoom.price_per_night);
  };

  const handleReserve = async () => {
    if (!selectedRoom) return;
    
    // Validação
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setMessageType("error");
      setMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (guests < 1 || guests > 6) {
      setMessageType("error");
      setMessage("Número de hóspedes deve ser entre 1 e 6.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      
      await axios.post("http://localhost:8000/api/bookings/", {
        room: selectedRoom.id,
        name,
        email,
        check_in: selection.startDate.toISOString().split("T")[0],
        check_out: selection.endDate.toISOString().split("T")[0],
      });
      
      setMessageType("success");
      setMessage("✅ Reserva confirmada com sucesso!");
      setShowConfirmation(true);
      
      // Limpar formulário
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setGuests(1);
        setSpecialRequests("");
        setSelection({
          startDate: new Date(),
          endDate: addDays(new Date(), 2),
          key: "selection",
        });
      }, 3000);
      
    } catch (err: any) {
      setMessageType("error");
      if (err.response?.data?.reserved) {
        setMessage("⚠️ Quarto já reservado para essas datas. Por favor, escolha outras datas.");
      } else {
        setMessage("❌ Erro ao realizar reserva. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Carregando disponibilidade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black py-12 mb-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reserve Sua Estadia
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Escolha seu quarto ideal e garanta uma experiência inesquecível no Hotel Jan
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seção Principal - Calendário e Formulário */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seleção de Quarto */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transform hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <BedDouble className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Escolha o Quarto</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all transform hover:scale-105 ${
                      selectedRoom?.id === room.id
                        ? "border-yellow-500 bg-yellow-50 shadow-md"
                        : "border-gray-200 hover:border-yellow-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{room.name}</h3>
                      {selectedRoom?.id === room.id && (
                        <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                    <p className="font-bold text-yellow-600">
                      Kz {parseFloat(room.price_per_night).toLocaleString()} / noite
                    </p>
                  </div>
                ))}
              </div>
            </div>

        {/* Calendário */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transform hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Escolha as Datas</h2>
              </div>
              
              <div className="flex justify-center">
          <DateRange
            editableDateInputs={true}
                  onChange={(item: { selection: any }) => setSelection(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[selection]}
            minDate={new Date()}
                  rangeColors={["#EAB308"]}
                  className="rounded-xl"
            disabledDates={reservedDates.flatMap(r => {
              const dates = [];
              let d = new Date(r.startDate);
              while (d <= r.endDate) {
                dates.push(new Date(d));
                d.setDate(d.getDate() + 1);
              }
              return dates;
            })}
          />
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Datas em cinza já estão reservadas
                </p>
              </div>
        </div>

        {/* Formulário */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transform hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Seus Dados</h2>
              </div>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
        <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
                        placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
                        placeholder="joao@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+244 914 260 030"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Número de Hóspedes *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pedidos Especiais (Opcional)
                  </label>
                  <textarea
                    placeholder="Ex: Cama extra, quarto no último andar, preferências alimentares..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none resize-none"
                  />
                </div>

            <button
              onClick={handleReserve}
                  disabled={loading || !selectedRoom}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Confirmar Reserva
                    </>
                  )}
            </button>
          </div>

          {message && (
                <div
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                    messageType === "success"
                      ? "bg-green-50 border-2 border-green-200 text-green-800"
                      : "bg-red-50 border-2 border-red-200 text-red-800"
                  }`}
                >
                  {messageType === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="font-medium">{message}</p>
                </div>
              )}
            </div>
          </div>

          {/* Resumo da Reserva */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-yellow-500" />
                Resumo da Reserva
              </h3>

              <div className="space-y-4">
                {selectedRoom && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Quarto Selecionado</p>
                    <p className="font-bold text-gray-900">{selectedRoom.name}</p>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check-in</p>
                  <p className="font-semibold text-gray-900">
                    {selection.startDate.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {selection.endDate.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Duração</p>
                  <p className="font-semibold text-gray-900">
                    {calculateNights()} {calculateNights() === 1 ? "noite" : "noites"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Hóspedes</p>
                  <p className="font-semibold text-gray-900">{guests} {guests === 1 ? "pessoa" : "pessoas"}</p>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      Kz {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>Taxas e impostos</span>
                    <span>Incluídos</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-500 rounded-lg">
                    <span className="font-bold text-black">Total</span>
                    <span className="font-bold text-xl text-black">
                      Kz {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-xs text-blue-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Cancelamento gratuito até 48 horas antes do check-in</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
