import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import {
  metaMask,
  walletConnect,
  coinbaseWallet,
  safe,
  injected 
} from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask(), // ✅ Prefer metaMask over injected()
    walletConnect({
      projectId: '0b33335992e30ed4317b9ea7b9dce4f0',
    }),
    coinbaseWallet({
      appName: 'Zync Chat App',
    }),
    injected(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
