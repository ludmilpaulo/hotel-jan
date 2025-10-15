"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta área.
        </p>
        
        {user && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Usuário: <span className="font-semibold">{user.username}</span>
            </p>
            <p className="text-sm text-gray-600">
              Função: <span className="font-semibold">
                {user.role === 'ADMIN' ? 'Administrador' :
                 user.role === 'MANAGER' ? 'Gerente' :
                 user.role === 'STAFF' ? 'Funcionário' :
                 'Hóspede'}
              </span>
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir para Admin
            </Link>
          )}
          
          {user?.role === 'STAFF' && (
            <Link
              href="/staff"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir para Staff
            </Link>
          )}
          
          {user?.role === 'MANAGER' && (
            <Link
              href="/staff"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir para Staff
            </Link>
          )}
          
          {user?.role === 'GUEST' && (
            <Link
              href="/dashboard"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir para Dashboard
            </Link>
          )}
          
          <Link
            href="/"
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Site
          </Link>
          
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            Fazer Logout
          </button>
        </div>
      </div>
    </div>
  );
}
