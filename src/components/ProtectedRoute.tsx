import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    //  Checa sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    //  Escuta mudanças de estado (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-[#A89F91] font-mono text-xs">
        A verificar autenticação...
      </div>
    );
  }

  // O <Outlet /> renderiza as rotas filhas configuradas no App.tsx (ex: /perfil)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};