'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useWallet } from '@/lib/wallet/Usewallet';
export default function Header() {
  const { isConnected, disconnect } = useWallet()

  const [isClient, setisClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  // bg-[linear-gradient(to_top,_rgba(21,23,24,0)_20%,_rgba(21,23,24,3.9)_60%)]

  useEffect(() => {
    console.log(isConnected);

    setisClient(true)
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen])

  return (
    <header className="w-full sticky top-0 z-50 text-white bg-background/60 backdrop-blur-3xl">
      <div className="max-w-[90%] mx-auto">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <a href="#" className="text-2xl lg:text-3xl font-heading font-bold tracking-wide capitalize">
            zy<span className="text-logo">nc</span>
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <img
                src="/assets/icons/close.svg"
                alt="Close menu"
                className="w-7 "
              />
            ) : (
              <img
                src="/assets/icons/hamburger.svg"
                alt="Open menu"
                className="w-7"
              />
            )}
          </button>

          {/* Nav Links */}
          {
            isClient && (
              <AnimatePresence>
                {(isDesktop || isOpen) && (
                  <motion.nav
                    key="main-nav"
                    initial={isDesktop ? false : { y: -40, opacity: 0 }}
                    animate={isDesktop ? {} : { y: 0, opacity: 1 }}
                    exit={isDesktop ? {} : { y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, }}
                    className={`
      ${isDesktop ? "block" : "flex justify-center items-center h-screen bg-background/40 backdrop-blur-md"}
      absolute top-18 left-0 w-full
      
      lg:static lg:flex lg:items-center lg:w-auto lg:bg-transparent
      p-6 lg:p-0 z-50
    `}
                  >
                    <ul className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                      <li><a href="#features" className=" capitalize font-logo text-lg font-medium sm:text-xl md:text-2xl lg:text-lg xl:text-lg">features</a></li>
                      <li><a href="#demo" className=" capitalize font-logo text-lg font-medium sm:text-xl md:text-2xl lg:text-lg xl:text-lg">demo</a></li>
                      <li>
                        <motion.div
                          className="p-[2px] rounded-3xl inline-block"
                          style={{
                            background: "linear-gradient(270deg, #A020F0, #00C6FF, #0FF0FC, #A020F0)",
                            backgroundSize: "400% 400%",
                          }}
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                        >
                          <button className="bg-[#151718] px-6 py-2 rounded-3xl text-white font-normal capitalize font-body cursor-pointer brightness-105 text-sm sm:text-lg md:text-xl lg:text-[15px]">
                            <Link href={isConnected ? '/chat' : '/connect-wallet'} >Launch app</Link>
                          </button>
                        </motion.div>
                      </li>
                    </ul>
                  </motion.nav>
                )}
              </AnimatePresence>
            )
          }

        </div>
      </div>
    </header>
  );
}
