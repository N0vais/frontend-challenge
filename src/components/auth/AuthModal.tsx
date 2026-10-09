import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from '@tanstack/react-router';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Estados dos formulários
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'register' && password !== confirmPassword) {

      setErrorMessage('As senhas não coincidem!');
      return;
    }

    try {
      setIsLoading(true);

      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }, // Salva o nome de usuário nos metadados do Supabase Auth
          },
        });

        if (error) throw error;

        alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
        onClose();
        navigate({ to: '/' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        alert('Login efetuado com sucesso!');
        onClose();
        navigate({ to: '/perfil' });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro durante a autenticação.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers para login social (OAuth)
  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono text-[#F3E5D8]">
      <div className="relative w-full max-w-[460px] bg-[#140D0A] border border-[#261E17] rounded-2xl p-8 shadow-2xl overflow-hidden border-b-[6px] border-b-[#D28A4C]">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 text-[#A89F91] hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Abas Superiores */}
        <div className="flex items-center justify-center gap-3 text-xl font-bold mb-3 mt-2">
          <button
            type="button"
            onClick={() => handleModeSwitch('login')}
            className={`cursor-pointer transition-colors ${
              mode === 'login' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            Entrar
          </button>
          <span className="text-[#3D3024]">|</span>
          <button
            type="button"
            onClick={() => handleModeSwitch('register')}
            className={`cursor-pointer transition-colors ${
              mode === 'register' ? 'text-[#D28A4C]' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* Subtítulo dinâmico */}
        <p className="text-xs text-[#A89F91] text-center max-w-[340px] mx-auto leading-relaxed mb-4">
          {mode === 'login'
            ? 'Entre para gerenciar sua carteira, coleção e perfil de criador.'
            : 'Crie seu perfil de colecionador e conecte uma carteira quando quiser.'}
        </p>

        {/* Mensagem de Erro */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-red-950/50 border border-red-800/50 rounded-xl text-red-300 text-xs text-center">
            {errorMessage}
          </div>
        )}

        {/* Formulário Tradicional */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <input
                type="text"
                required
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-xl px-4 py-3 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors font-mono"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              placeholder={mode === 'login' ? 'contato@email.com' : 'Digite seu e-mail'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-xl px-4 py-3 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors font-mono"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder={mode === 'login' ? '************' : 'Senha'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1510] border border-[#261E17] rounded-xl px-4 py-3 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors font-mono pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-white transition-colors cursor-pointer"
              aria-label="Alternar visibilidade da senha"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.959 8.959 0 013.682-.783c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          {mode === 'register' && (
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1A1510] border border-[#261E17] rounded-xl px-4 py-3 text-xs text-white placeholder-[#A89F91]/50 outline-none focus:border-[#D28A4C] transition-colors font-mono"
              />
            </div>
          )}

          {/* Link Esqueceu a Senha */}
          {mode === 'login' && (
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                className="text-[11px] text-[#D28A4C] hover:underline cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading
                ? 'Processando...'
                : mode === 'login'
                ? 'Entrar'
                : 'Criar conta'}
            </button>
          </div>
        </form>

        {/* Divisor "Ou continue com" */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-[#261E17] w-full" />
          <span className="bg-[#140D0A] px-3 text-[11px] text-[#A89F91] whitespace-nowrap">
            Ou continue com
          </span>
          <div className="border-t border-[#261E17] w-full" />
        </div>

        {/* Botões Sociais */}
        <div className="space-y-3">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1A1510] border border-[#261E17] hover:border-[#3D3024] text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-[#F3E5D8]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar com Google</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('facebook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1A1510] border border-[#261E17] hover:border-[#3D3024] text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-[#F3E5D8]"
          >
            <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continuar com Facebook</span>
          </button>
        </div>

      </div>
    </div>
  );
};



































