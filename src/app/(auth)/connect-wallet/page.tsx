'use client';

import CustomWalletModal from "@/components/CustomWalletModal";
import { useWallet } from "@/lib/wallet/Usewallet";
import { useState } from "react";


export default function ConnectWallet() {
  const { isConnected, status } = useWallet()
  const [isModalOpen, setisModalOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(status !== "idle");

  return (
    <div className="bg-background w-screen h-screen flex items-center justify-center bg-[url('/assets/images/element2.png')] bg-center bg-no-repeat">
      <div className="text-center flex flex-col items-center gap-7 max-w-xl">
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="font-heading font-extrabold uppercase bg-gradient-to-t from-gray-500/40 to-gray-100 text-transparent bg-clip-text text-3xl sm:text-4xl md:text-5xl tracking-widest">
            Connect Wallet
          </h1>
          <p className="text-subtext font-body text-sm sm:text-base capitalize">
            Click to connect your wallet and lets you in our next-gen messaging app.
          </p>
        </div>
        <div className="">
          <button
            className="bg-logo py-2 px-3 rounded-md text-white font-body cursor-pointer capitalize font-medium text-sm lg:text-lg disabled:opacity-50"
            onClick={() => {
              setisModalOpen(true)
              setRedirecting(true)
            }
            }
            disabled={status !== 'idle'}
          >
            {(redirecting || (status === 'pending' && isModalOpen)) ? 'Connecting...' : 'Connect Wallet'}

          </button>

        </div>

        <CustomWalletModal isOpen={isModalOpen} setisModalOpen={setisModalOpen} onClose={() => setisModalOpen(false)} setRedirecting={setRedirecting}/>
      </div>
    </div>
  )
}