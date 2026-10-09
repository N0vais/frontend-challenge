// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  username: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // 1. Pega o usuário autenticado na sessão atual
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 2. Busca os dados da tabela pública 'profiles' usando o ID do usuário
          const { data, error } = await supabase
            .from('profiles')
            .select('id, username')
            .eq('id', user.id)
            .single();

          if (!error && data) {
            setProfile(data);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};