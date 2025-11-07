"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = 'd45a9a449547537b010834a340b07e5b'; // Please replace with your own WalletConnect Project ID

const config = createConfig({
  chains: [base],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId, metadata: {
        name: 'AaveBaseYield',
        description: 'One-Click Aave Yield Deposit on Base Mainnet',
        url: 'https://aave-base-yield.web.app', // replace with your app url
        icons: ['https://aave-base-yield.web.app/icon.png'] // replace with your app icon
    } }),
    coinbaseWallet({ appName: 'AaveBaseYield', darkMode: true }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
