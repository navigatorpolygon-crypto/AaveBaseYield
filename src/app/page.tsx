import { AaveDashboard } from '@/components/aave-dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-body">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <AaveDashboard />
      </div>
    </main>
  );
}
