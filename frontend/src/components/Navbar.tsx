"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Home, BedDouble, CalendarDays, Phone, LogIn, LogOut, User, Settings } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Início", icon: <Home size={18} /> },
    { href: "/quartos", label: "Quartos", icon: <BedDouble size={18} /> },
    { href: "/reservas", label: "Reservas", icon: <CalendarDays size={18} /> },
    { href: "/contato", label: "Contato", icon: <Phone size={18} /> },
  ];

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return null;
    
    switch (user.role) {
      case 'ADMIN':
        return { href: "/admin", label: "Admin" };
      case 'MANAGER':
      case 'STAFF':
        return { href: "/staff", label: "Staff" };
      case 'GUEST':
        return { href: "/dashboard", label: "Meu Painel" };
      default:
        return { href: "/dashboard", label: "Dashboard" };
    }
  };

  const dashboardLink = getDashboardLink();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-extrabold tracking-wide text-gray-900 hover:text-yellow-600 transition"
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

        {/* Auth & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 transition p-2 rounded-lg hover:bg-gray-50"
              >
                <User className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">{user?.first_name || user?.username}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-yellow-600 font-medium">
                      {user?.role === 'ADMIN' ? 'Administrador' :
                       user?.role === 'MANAGER' ? 'Gerente' :
                       user?.role === 'STAFF' ? 'Funcionário' :
                       'Hóspede'}
                    </p>
                  </div>
                  
                  {dashboardLink && (
                    <Link
                      href={dashboardLink.href}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      {dashboardLink.label}
              </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              )}
          </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 text-sm font-medium transition"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Link>
          )}
          
          <div className="w-px h-6 bg-gray-300"></div>
          <Link
            href="/reservas"
            className="bg-yellow-500 text-black font-semibold px-3 sm:px-5 py-2 rounded-lg shadow hover:bg-yellow-400 transition text-sm sm:text-base"
          >
            Reservar Agora
          </Link>
        </div>

        {/* Menu Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg animate-fade-in">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-4 font-medium">
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
            
            <div className="border-t pt-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-yellow-600 font-medium">
                      {user?.role === 'ADMIN' ? 'Administrador' :
                       user?.role === 'MANAGER' ? 'Gerente' :
                       user?.role === 'STAFF' ? 'Funcionário' :
                       'Hóspede'}
                    </p>
                  </div>
                  
                  {dashboardLink && (
                    <Link
                      href={dashboardLink.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-yellow-600 transition"
                      onClick={() => setOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      {dashboardLink.label}
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-600 hover:text-red-700 transition w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 text-gray-600 hover:text-yellow-600 transition"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Link>
              )}
            </div>
            
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