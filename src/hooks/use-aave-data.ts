"use client";

import { useBalance, useReadContract } from "wagmi";
import {
  AAVE_POOL_ABI,
  AAVE_POOL_ADDRESS,
  DATA_PROVIDER_ABI,
  POOL_DATA_PROVIDER,
  USDC_ADDRESS,
  WETH_ADDRESS,
} from "@/lib/constants";
import { useMemo } from "react";

const REFETCH_INTERVAL = 10000; // 10 seconds

export function useAaveData(address?: `0x${string}`) {
  const { data: ethBalance, isLoading: isEthBalanceLoading } = useBalance({
    address,
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL, enabled: !!address },
  });

  const { data: usdcBalance, isLoading: isUsdcBalanceLoading } = useBalance({
    address,
    token: USDC_ADDRESS,
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL, enabled: !!address },
  });

  const { data: ethReserveData, isLoading: isEthApyLoading } = useReadContract({
    address: POOL_DATA_PROVIDER,
    abi: DATA_PROVIDER_ABI,
    functionName: 'getReserveData',
    args: [WETH_ADDRESS],
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL },
  });
  
  const { data: usdcReserveData, isLoading: isUsdcApyLoading } = useReadContract({
    address: POOL_DATA_PROVIDER,
    abi: DATA_PROVIDER_ABI,
    functionName: 'getReserveData',
    args: [USDC_ADDRESS],
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL },
  });
  
  const { data: userEthData, isLoading: isUserEthDataLoading, refetch: refetchUserEthData } = useReadContract({
    address: POOL_DATA_PROVIDER,
    abi: DATA_PROVIDER_ABI,
    functionName: 'getUserReserveData',
    args: [WETH_ADDRESS, address!],
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL, enabled: !!address },
  });

  const { data: userUsdcData, isLoading: isUserUsdcDataLoading, refetch: refetchUserUsdcData } = useReadContract({
    address: POOL_DATA_PROVIDER,
    abi: DATA_PROVIDER_ABI,
    functionName: 'getUserReserveData',
    args: [USDC_ADDRESS, address!],
    chainId: 8453,
    query: { refetchInterval: REFETCH_INTERVAL, enabled: !!address },
  });
  
  const calculateApy = (liquidityRate: bigint) => {
    const RAY = 10n ** 27n;
    const SECONDS_PER_YEAR = 31536000;
    const depositAPR = Number(liquidityRate) / Number(RAY);
    const depositAPY = (Math.pow(1 + (depositAPR / SECONDS_PER_YEAR), SECONDS_PER_YEAR) - 1);
    return depositAPY;
  }

  const ethApy = useMemo(() => ethReserveData ? calculateApy(ethReserveData[3]) : 0, [ethReserveData]);
  const usdcApy = useMemo(() => usdcReserveData ? calculateApy(usdcReserveData[3]) : 0, [usdcReserveData]);

  const {data: usdcAllowance, isLoading: isUsdcAllowanceLoading, refetch: refetchUsdcAllowance} = useReadContract({
    address: USDC_ADDRESS,
    abi: AAVE_POOL_ABI,
    functionName: "allowance",
    args: [address!, AAVE_POOL_ADDRESS],
    chainId: 8453,
    query: { enabled: !!address }
  });

  return {
    ethBalance: ethBalance?.value ?? 0n,
    usdcBalance: usdcBalance?.value ?? 0n,
    ethApy,
    usdcApy,
    userEthData: userEthData?.[0] ?? 0n,
    userUsdcData: userUsdcData?.[0] ?? 0n,
    usdcAllowance: usdcAllowance ?? 0n,
    isLoading: isEthBalanceLoading || isUsdcBalanceLoading || isEthApyLoading || isUsdcApyLoading || isUserEthDataLoading || isUserUsdcDataLoading || isUsdcAllowanceLoading,
    refetch: () => {
        refetchUserEthData();
        refetchUserUsdcData();
        refetchUsdcAllowance();
    }
  };
}
