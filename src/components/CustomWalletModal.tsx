'use client';

import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@/lib/wallet/Usewallet'
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';



interface CustomWalletModalProps {
    isOpen: boolean;
    setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRedirecting: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}


export default function CustomWalletModal({ isOpen, onClose, setisModalOpen, setRedirecting }: CustomWalletModalProps) {
    const { isConnected,
        address,
        ensName,
        ensAvatar,
        connectWallet,
        disconnect,
        connectors,
        error,
        status,
        isPending } = useWallet()


    const router = useRouter();

    console.log(status);

    useEffect(() => {

        if (isConnected && status === 'success') {

            setTimeout(() => {
                router.replace('/chat');
            }, 500);
        }
    }, [isConnected, status]);

    if (isConnected && status === 'success') return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-background/20 p-10 backdrop-blur-md w-full max-w-xl border-[1px] border-gray-800 rounded-2xl flex flex-col justify-center items-center"
                    >
                        <h2 className="text-sm font-body capitalize font-medium mb-4 text-center text-white md:text-[16px] ">
                            Choose your preferred wallet
                        </h2>
                        <div className="flex flex-col space-y-3 w-[80%]">
                            <button
                                onClick={() => connectWallet('metaMaskSDK')}
                                className="px-4 flex justify-center items-center gap-1 py-2 border-[1px] border-gray-500 font-body text-white rounded-lg hover:bg-gray-900 cursor-pointer transition"
                            ><img className='w-6 h-6' src="/assets/images/metamask.png" alt="metamask logo" />  MetaMask
                            </button>
                            <button
                                onClick={() => connectWallet('walletConnect')}
                                className="px-4 flex justify-center items-center gap-1 py-2 border-[1px] border-gray-500 font-body text-white rounded-lg hover:bg-gray-900 cursor-pointer transition"
                            ><img className='w-9' src="/assets/images/wallet-connect.png" alt="wallet-connect-logo" />   Wallet Connect
                            </button>
                            <button
                                onClick={() => connectWallet('coinbaseWalletSDK')}
                                className="px-4 flex justify-center items-center gap-1 py-2 border-[1px] border-gray-500 font-body text-white rounded-lg hover:bg-gray-900 cursor-pointer transition"
                            ><img className='w-9' src="/assets/images/coinbase.png" alt="coinbase logo" />Coinbase Wallet
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                onClose()
                                setisModalOpen(false)
                                setRedirecting(false)
                            }}
                            className="mt-6 w-full font-body cursor-pointer text-sm text-red-500 text-center md:text-[16px]"
                        >Close
                        </button>
                    </motion.div>
                </motion.div>


            )}

        </AnimatePresence>
    )
}
