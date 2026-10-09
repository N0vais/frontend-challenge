// src/routes/perfil.tsx
import { createFileRoute } from '@tanstack/react-router';
import { ProfileSection } from '@/features/profile/ProfileSection'; // 👈 Importa o seu componente existente

export const Route = createFileRoute('/perfil')({
  component: ProfileSection,
});













