"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank,Coins } from "lucide-react";
import { useAaveData } from "@/hooks/use-aave-data";
import { formatBigInt } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { ETH_DECIMALS, USDC_DECIMALS } from "@/lib/constants";

export function BalanceCard({ address }: { address: `0x${string}` }) {
  const { ethBalance, usdcBalance, isLoading } = useAaveData(address);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <PiggyBank className="h-5 w-5 text-primary" />
          Your Wallet Balances
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-2">
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Ethereum</title><path d="M11.944 17.97L4.58 13.62l7.364 4.35zM12 17.97v-6.573l7.359-4.35L12 17.97zm0-7.704v.001L4.58 5.91l7.42 4.356zM12.005 5.91L19.42 10.27l-7.415-4.36zm0-4.71v6.573l7.359 4.35L12 1.2zM12 1.2L4.58 5.57l7.359 4.35L12 1.2zM4.58 13.62l7.364-4.35v6.573L4.58 13.62zm7.42 8.73l7.42-4.356L12.005 22.35zm0 0v-6.573l-7.42-4.35L12 22.35z"/></svg>
            ETH
          </span>
          {isLoading ? <Skeleton className="h-6 w-24" /> : <span className="font-mono font-semibold text-lg">{formatBigInt(ethBalance, ETH_DECIMALS, 4)}</span>}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-2">
            <Coins className="h-5 w-5" />
            USDC
          </span>
          {isLoading ? <Skeleton className="h-6 w-24" /> : <span className="font-mono font-semibold text-lg">{formatBigInt(usdcBalance, USDC_DECIMALS, 2)}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
