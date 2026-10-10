import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#0F0C08] text-[#F3E5D8] flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  ),
});