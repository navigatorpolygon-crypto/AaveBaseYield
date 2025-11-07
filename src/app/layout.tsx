import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/components/providers/web3-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
  title: 'AaveBaseYield',
  description: 'One-Click Aave Yield Deposit on Base Mainnet',
  icons: {
    icon: '/cat.jpg',
  },
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ErrorBoundary>
          <Web3Provider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </Web3Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
