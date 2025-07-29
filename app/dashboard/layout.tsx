import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { PremiumBanner } from '@/components/dashboard/premium-banner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <PremiumBanner />
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}