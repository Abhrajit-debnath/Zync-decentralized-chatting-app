'use client';


import Image from "next/image";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setvisible] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            setvisible(window.scrollY > 40)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return visible ? (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-background rounded-full border border-gray-400 w-10 h-10 cursor-pointer flex justify-center items-center z-50"
        >
            <Image
                src="/assets/icons/arrow.svg"
                alt="Arrow icon"
                fill
                className="object-contain"
            />
        </button>
    ) : null

}