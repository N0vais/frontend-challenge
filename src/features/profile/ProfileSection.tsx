import React, { useState, useRef, useEffect } from 'react';
import { WalletsTab } from '@/features/profile/compoments/WalletsTab';
import { supabase } from '@/lib/supabase';
type TabType = 'dados' | 'carteiras' | 'atividade' | 'interesse' | 'ofertas' | 'arquivos' | 'suporte';

export const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dados');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de feedback e carregamento
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isFirstFill, setIsFirstFill] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);

  // Controle de avatar
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Formulário de dados
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    ensName: '.eth',
    ensHandle: '',
    walletNickname: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Buscar dados do usuário logado ao carregar
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      setFormData((prev) => ({ ...prev, email: user.email || '' }));

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setIsFirstFill(false);
        setFormData({
          displayName: data.display_name || '',
          username: data.username || '',
          email: user.email || '',
          ensName: data.ens_name || '.eth',
          ensHandle: data.ens_handle || '',
          walletNickname: data.wallet_nickname || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //  Lógica de Logout do Supabase com Redirecionamento Direto
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Desconecta no Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Redireciona diretamente para a rota inicial garantindo o carregamento da HomePage
      window.location.href = '/?view=home';
    } catch (err) {
      console.error('Erro ao encerrar sessão:', err);
      setFeedback({
        type: 'error',
        message: 'Erro ao tentar sair da conta. Tente novamente.',
      });
      setIsLoggingOut(false);
    }
  };

  // Upload do Avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFeedback({ type: 'error', message: 'Por favor, selecione um arquivo de imagem válido.' });
        return;
      }
      setSelectedFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    if (avatarUrl && avatarUrl.startsWith('blob:')) {
      URL.revokeObjectURL(avatarUrl);
    }
    setSelectedFile(null);
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Salvar alterações de perfil
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setFeedback({
          type: 'warning',
          message: 'É preciso efetuar o login para salvar as alterações.',
        });
        setIsLoading(false);
        return;
      }

      let uploadedAvatarUrl = avatarUrl;

      // Upload do arquivo para o bucket do Storage se selecionado
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, selectedFile, { upsert: true });

        if (uploadError) {
          throw new Error('Erro ao fazer upload da imagem de avatar.');
        }

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        uploadedAvatarUrl = publicUrlData.publicUrl;
      }

      // Alteração opcional de senha
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('A nova senha e a confirmação não coincidem.');
        }

        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.newPassword,
        });

        if (passwordError) throw passwordError;
      }

      // Upsert no banco de dados
      const profilePayload = {
        id: user.id,
        display_name: formData.displayName,
        username: formData.username,
        ens_name: formData.ensName,
        ens_handle: formData.ensHandle,
        wallet_nickname: formData.walletNickname,
        avatar_url: uploadedAvatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert(profilePayload);

      if (dbError) throw dbError;

      if (isFirstFill) {
        setFeedback({ type: 'success', message: 'Dados salvos com sucesso!' });
        setIsFirstFill(false);
      } else {
        setFeedback({ type: 'success', message: 'Dados alterados com sucesso!' });
      }

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar os dados no banco.';
      setFeedback({
        type: 'error',
        message: `Erro: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#0F0C08] min-h-screen text-[#F3E5D8] font-mono py-8 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* BARRA LATERAL (3 COLS)  */}
        <aside className="lg:col-span-3 bg-[#1A1510] border border-[#261E17] rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Meu perfil
          </h2>

          <nav className="space-y-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('dados')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'dados'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Dados do perfil</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('carteiras')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'carteiras'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Carteiras</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('atividade')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'atividade'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span>Atividade</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('interesse')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'interesse'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Lista de interesse</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ofertas')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ofertas'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Ofertas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('arquivos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'arquivos'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Arquivos baixados</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('suporte')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${activeTab === 'suporte'
                  ? 'text-[#D28A4C] bg-[#261E17]/50 font-bold border-l-2 border-[#D28A4C]'
                  : 'text-[#A89F91] hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Suporte</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-[#261E17]">
            {/* BOTÃO SAIR INTEGRADO COM O SUPABASE */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-[#A89F91] hover:text-red-400 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
            </button>
          </div>
        </aside>

        {/*  CONTEÚDO PRINCIPAL (9 COLS)  */}
        <main className="lg:col-span-9">
          {activeTab === 'dados' && (
            <form onSubmit={handleSave} className="space-y-8">

              {/* Caixas de Alerta / Feedback */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl text-xs font-bold border transition-all ${feedback.type === 'success'
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                      : feedback.type === 'warning'
                        ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                    }`}
                >
                  {feedback.message}
                </div>
              )}

              {/* Perfil do Colecionador */}
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-6">
                  Perfil do colecionador
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-4 items-start">
                  <div className="md:col-span-6">
                    <label className="text-xs text-[#F3E5D8] block mb-1.5">
                      Nome de exibição<span className="text-[#D28A4C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.displayName}
                      onChange={(e) => handleChange('displayName', e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-xs text-[#F3E5D8] block mb-1.5">
                      Nome de usuário<span className="text-[#D28A4C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-xs text-[#F3E5D8] block mb-1.5">
                      E-mail<span className="text-[#D28A4C]">*</span>
                    </label>
                    <input
                      type="email"
                      disabled
                      value={formData.email}
                      className="w-full bg-[#1A1510]/50 border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-[#A89F91] cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-xs text-[#F3E5D8] block mb-1.5">
                      Nome ENS <span className="text-[#D28A4C]">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.ensName}
                        onChange={(e) => handleChange('ensName', e.target.value)}
                        className="bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors cursor-pointer appearance-none shrink-0"
                      >
                        <option value=".eth">.eth</option>
                        <option value=".xyz">.xyz</option>
                      </select>
                      <input
                        type="text"
                        value={formData.ensHandle}
                        onChange={(e) => handleChange('ensHandle', e.target.value)}
                        className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-6">
                    <label className="text-xs text-[#F3E5D8] block mb-1.5">
                      Apelido da carteira<span className="text-[#D28A4C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.walletNickname}
                      onChange={(e) => handleChange('walletNickname', e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  {/* Avatar */}
                  <div className="md:col-span-6">
                    <label className="text-xs text-[#A89F91] block mb-1.5">Avatar</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#1A1510] border border-[#261E17] overflow-hidden flex items-center justify-center shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Avatar do usuário" className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-5 h-5 text-[#A89F91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#D28A4C] hover:bg-[#E5B484] text-[#0F0C08] font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
                      >
                        {avatarUrl ? 'Alterar' : 'Escolher foto'}
                      </button>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          className="text-xs text-[#A89F91] hover:text-red-400 transition-colors cursor-pointer"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alterar Senha */}
              <div className="pt-4 border-t border-[#261E17] space-y-4 max-w-md">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Alterar senha
                </h3>

                <div>
                  <label className="text-xs text-[#A89F91] block mb-1.5">Nova senha</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleChange('newPassword', e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-white cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.959 8.959 0 013.682-.783c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#A89F91] block mb-1.5">Confirmar nova senha</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className="w-full bg-[#1A1510] border border-[#261E17] rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-[#D28A4C] transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F91] hover:text-white cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.959 8.959 0 013.682-.783c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão Salvar */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#D28A4C] hover:bg-[#E5B484] disabled:opacity-50 text-[#0F0C08] font-bold text-xs py-3 px-8 rounded-lg transition-all cursor-pointer uppercase active:scale-[0.98]"
                >
                  {isLoading ? 'Salvando no banco...' : 'Salvar'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'carteiras' && <WalletsTab />}

          {['atividade', 'interesse', 'ofertas', 'arquivos', 'suporte'].includes(activeTab) && (
            <div className="bg-[#1A1510] border border-[#261E17] rounded-2xl p-12 text-center text-[#A89F91] text-xs">
              Seção em desenvolvimento.
            </div>
          )}
        </main>
      </div>
    </section>
  );
};