"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, BedDouble, CalendarDays, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início", icon: <Home size={18} /> },
    { href: "/quartos", label: "Quartos", icon: <BedDouble size={18} /> },
    { href: "/reservas", label: "Reservas", icon: <CalendarDays size={18} /> },
    { href: "/contato", label: "Contato", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-gray-900 hover:text-yellow-600 transition"
        >
          <span className="text-yellow-500">Hotel</span> Jan
        </Link>

        {/* Links Desktop */}
        <div className="hidden md:flex gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2 text-gray-700 hover:text-yellow-600 transition relative"
            >
              {link.icon}
              {link.label}
              {/* underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Botão CTA */}
        <Link
          href="/reservas"
          className="hidden md:inline-block bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
        >
          Reservar Agora
        </Link>

        {/* Menu Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-4 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 text-gray-700 hover:text-yellow-600 transition"
                onClick={() => setOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservas"
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 text-center transition"
              onClick={() => setOpen(false)}
            >
              Reservar Agora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
