"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'ADMIN' | 'MANAGER' | 'STAFF' | 'GUEST';
  requireAdmin?: boolean;
  requireStaff?: boolean;
  requireManager?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requireAdmin = false,
  requireStaff = false,
  requireManager = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check authentication
      if (!isAuthenticated || !user) {
        router.push(redirectTo);
        return;
      }

      // Check role requirements
      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on user role
        switch (user.role) {
          case 'ADMIN':
            router.push('/admin');
            break;
          case 'MANAGER':
            router.push('/staff');
            break;
          case 'STAFF':
            router.push('/staff');
            break;
          case 'GUEST':
            router.push('/dashboard');
            break;
          default:
            router.push(redirectTo);
        }
        return;
      }

      // Check specific role requirements
      if (requireAdmin && user.role !== 'ADMIN') {
        router.push('/unauthorized');
        return;
      }

      if (requireManager && !['MANAGER', 'ADMIN'].includes(user.role)) {
        router.push('/unauthorized');
        return;
      }

      if (requireStaff && !['STAFF', 'MANAGER', 'ADMIN'].includes(user.role)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, loading, requiredRole, requireAdmin, requireStaff, requireManager, redirectTo, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  if (requireAdmin && user.role !== 'ADMIN') {
    return null;
  }

  if (requireManager && !['MANAGER', 'ADMIN'].includes(user.role)) {
    return null;
  }

  if (requireStaff && !['STAFF', 'MANAGER', 'ADMIN'].includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
