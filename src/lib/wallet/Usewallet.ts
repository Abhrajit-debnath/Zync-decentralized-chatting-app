// /lib/wallet/useWallet.ts
'use client'

import {
    useAccount,
    useDisconnect,
    useConnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'
import { toast } from 'sonner';
import { useEffect, useRef } from "react";


export function useWallet() {
    const toastShownRef = useRef(false);
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const {
        connect,
        connectors,
        error,
        status,
        isPending,
    } = useConnect()

    useEffect(() => {
        if (isConnected && status === 'success' && !toastShownRef.current) {
            toast.success(`Wallet connected successfully`)
            toastShownRef.current = true
        }
    }, [isConnected, status])


    useEffect(() => {
        if (error) {
            toast.error(error.message || "Wallet connection failed.");
        }
    }, [error]);


    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined })


    const connectWallet = (connectorId: 'metaMaskSDK' | 'walletConnect' | 'coinbaseWalletSDK') => {
        const connector = connectors.find((c) => c.id === connectorId)
        console.log(connector);

        if (connector) connect({ connector })
    }

    return {
        isConnected,
        address,
        ensName,
        ensAvatar,
        connectWallet,
        disconnect,
        connectors,
        error,
        status,
        isPending,
    }
}
