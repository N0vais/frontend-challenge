import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthModal } from './components/auth/AuthModal';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ProfileSection } from '@/features/profile/ProfileSection';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F3E5D8] font-mono">
      {/* Barra de Navegação Simples */}
      <nav className="flex justify-between items-center p-4 border-b border-[#261E17] bg-[#1A1510]">
        <Link to="/" className="text-xl font-bold text-[#D28A4C]">
          MeuApp
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-white transition-colors">
            Início
          </Link>
          <Link to="/perfil" className="hover:text-white transition-colors">
            Perfil
          </Link>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Entrar / Cadastrar
          </button>
        </div>
      </nav>

      {/* Roteamento Principal */}
      <main className="p-6 max-w-4xl mx-auto">
        <Routes>
          {/* Rota Pública */}
          <Route
            path="/"
            element={
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4 text-[#D28A4C]">
                  Bem-vindo à Plataforma
                </h1>
                <p className="text-[#A89F91]">
                  Faça login para acessar seu perfil e gerenciar sua conta.
                </p>
              </div>
            }
          />

          {/* Rota Protegida (Perfil) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<ProfileSection />} />
          </Route>
        </Routes>
      </main>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}




