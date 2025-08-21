"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContatoPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui futuramente conecta ao backend Django
    alert(`Mensagem enviada!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative h-[35vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-[url('/contato-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Tire suas dúvidas ou fale conosco diretamente.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Informações */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Informações de Contato</h2>
          <p className="text-gray-600">
            Nossa equipe está disponível para ajudar com reservas, dúvidas ou informações adicionais.
          </p>

          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-600" />
            <p className="text-gray-700">
              Rua Hotel Jan Camama, Talatona, Belas, Angola
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-yellow-600" />
            <p className="text-gray-700">+244 914 260 030</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-yellow-600" />
            <p className="text-gray-700">contato@hoteljan.com</p>
          </div>

          {/* Mapa */}
          <div className="rounded-lg overflow-hidden shadow-lg mt-6">
           <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.780055389501!2d13.2425!3d-8.9242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTUnMjcuMSJTIDEzwrAxNCcxMy4wIlc!5e0!3m2!1sen!2sao!4v1694450000000!5m2!1sen!2sao"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    title="Localização do Hotel Jan"
                    />

          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Seu e-mail"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Mensagem</label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none h-32"
                placeholder="Escreva sua mensagem"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-400 transition flex items-center gap-2 mx-auto"
              >
                <Send size={18} /> Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
