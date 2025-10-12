"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Loader2 } from "lucide-react";

export default function ContatoPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    setLoading(false);
    
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      setNome("");
      setEmail("");
      setTelefone("");
      setAssunto("");
      setMensagem("");
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl bg-[url('/contato-hero.jpg')] bg-cover bg-center animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex flex-col items-center justify-center text-center px-6">
          <Mail className="w-16 h-16 text-yellow-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
            Tire suas dúvidas ou fale conosco diretamente. Estamos aqui para ajudar!
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 animate-fade-in-up">
        {/* Informações */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informações de Contato</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
            Nossa equipe está disponível para ajudar com reservas, dúvidas ou informações adicionais.
          </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-100 card-hover">
              <div className="bg-yellow-500 p-3 rounded-xl">
                <MapPin className="text-black w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Endereço</h3>
            <p className="text-gray-700">
              Rua Hotel Jan Camama, Talatona, Belas, Angola
            </p>
              </div>
          </div>

            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 card-hover">
              <div className="bg-blue-500 p-3 rounded-xl">
                <Phone className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telefone</h3>
            <p className="text-gray-700">+244 914 260 030</p>
                <p className="text-sm text-gray-500">Ligação ou WhatsApp</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 card-hover">
              <div className="bg-green-500 p-3 rounded-xl">
                <Mail className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">E-mail</h3>
                <p className="text-gray-700">reservas@hoteljan.co.ao</p>
                <p className="text-sm text-gray-500">Resposta em até 24h</p>
              </div>
          </div>

            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 card-hover">
              <div className="bg-purple-500 p-3 rounded-xl">
                <Clock className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Horário</h3>
                <p className="text-gray-700">24 horas por dia, 7 dias por semana</p>
                <p className="text-sm text-gray-500">Atendimento 24/7</p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
           <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.780055389501!2d13.2425!3d-8.9242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTUnMjcuMSJTIDEzwrAxNCcxMy4wIlc!5e0!3m2!1sen!2sao!4v1694450000000!5m2!1sen!2sao"
                    width="100%"
              height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    title="Localização do Hotel Jan"
                    />
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Envie uma Mensagem</h2>
          
          {success ? (
            <div className="py-12 text-center animate-scale-in">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-600">
                Recebemos sua mensagem e entraremos em contato em breve.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block mb-2 font-semibold text-gray-700">Nome Completo *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                  placeholder="João Silva"
                required
              />
            </div>

              <div className="grid md:grid-cols-2 gap-4">
            <div>
                  <label className="block mb-2 font-semibold text-gray-700">E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                    placeholder="joao@email.com"
                required
              />
            </div>

            <div>
                  <label className="block mb-2 font-semibold text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                    placeholder="+244 914 260 030"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Assunto *</label>
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="reserva">Reserva</option>
                  <option value="informacao">Informação</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="elogio">Elogio</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Mensagem *</label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition h-40 resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                required
              ></textarea>
            </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Campos obrigatórios
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 animate-fade-in-up">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-600">Respostas rápidas para as dúvidas mais comuns</p>
            </div>

        <div className="space-y-4">
          {[
            {
              q: "Qual o horário de check-in e check-out?",
              a: "Check-in a partir das 14h e check-out até às 12h."
            },
            {
              q: "O hotel oferece estacionamento?",
              a: "Sim, temos estacionamento privado gratuito para hóspedes."
            },
            {
              q: "Aceita animais de estimação?",
              a: "Sim, aceitamos animais de estimação de pequeno porte mediante taxa adicional."
            },
            {
              q: "O Wi-Fi é gratuito?",
              a: "Sim, Wi-Fi de alta velocidade gratuito em todas as áreas do hotel."
            }
          ].map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 card-hover group"
            >
              <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                {faq.q}
                <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
