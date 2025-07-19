"use client"

import { motion } from "framer-motion"
import Image from "next/image";
export default function Footer() {
    const socialLinks = [{
        icon: "/assets/icons/x.svg",
        link: "https://x.com/AbhrajitD18535?t=c3xOxK7GmZLfvKQMGghZgw&s=09",
        iconName: "X logo"
    },
    {
        icon: "/assets/icons/instagram.svg",
        link: "https://www.instagram.com/abhra.jit9?igsh=aTkwb3l4bDQ3Y2dt",
        iconName: "instagram logo"
    },
    {
        icon: "/assets/icons/linkedin.svg",
        link: "https://www.linkedin.com/in/abhrajit-debnath-ad2005?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        iconName: "linkedin logo"
    },
    {
        icon: "/assets/icons/github.svg",
        link: "https://github.com/Abhrajit-debnath",
        iconName: "github logo"
    },

        //     <a href="#" className="text-2xl font-heading font-medium tracking-wider text-white sm:text-3xl  xl:text-4xl capitalize">
        //     zy<span className="text-logo">nc</span>
        // </a>
    ]
    const headingVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: -80, scale: 0.5, rotate: -15 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,

        },
    };

    const footerBoxvariants = {
        hidden: {
            y: -30,
            opacity: 0,
            scale: 0.8, rotate: -5
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1, rotate: 0
        }
    }
    const iconContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5,
            },
        },
    };

    const iconItemVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,

        },
    };

    const footerTextvariants = {
        hidden: { opacity: 0, y: 20, scale: 0.5 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,

        },
    }

    return (
        <footer className="">
            <div className="max-w-[90%] mx-auto text-center flex flex-col items-center gap-12">
                <div className="">
                    <motion.h2
                        className="text-7xl cursor-crosshair uppercase font-heading bg-gradient-to-t from-gray-800/50 to-gray-300 text-transparent font-extrabold bg-clip-text md:text-8xl lg:text-9xl flex justify-center gap-1"
                        variants={headingVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {["z", "y", "n", "c"].map((char, i) => (
                            <motion.span
                                key={i}
                                variants={letterVariants}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    mass: 0.5,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: Math.random() > 0.5 ? 4 : -4,
                                    transition: {
                                        duration: 2,
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 30,
                                    },
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h2>

                </div>
                <motion.div
                    variants={footerBoxvariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 1 }}
                    transition={
                        {
                            duration: 0.8,
                            ease: "easeInOut",
                            type: "spring",
                            stiffness: 90,
                            damping: 20,
                        }
                    }
                    className="w-full bg-gray-700/15 backdrop-blur-xs relative -top-[70px] md:-top-[80px] lg:-top-[90px] p-10 rounded-3xl flex justify-center items-center flex-col space-y-5 lg:max-w-3xl">
                    <a href="#" className="text-2xl font-heading font-medium tracking-wider text-white sm:text-3xl  xl:text-4xl capitalize">
                        zy<span className="text-logo">nc</span>
                    </a>
                    <motion.div
                        className="flex items-center justify-center w-full shrink-0 gap-4"
                        variants={iconContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,

                        }}
                    >
                        {socialLinks.map((link, idx) => (
                            <motion.div
                                key={idx}
                                variants={iconItemVariants}
                                className="w-7 h-7 cursor-pointer md:w-8 md:h-8 lg:w-9 lg:h-9"
                            >
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={link.icon}
                                        alt={link.iconName}
                                        width={36}
                                        height={36}
                                        className="object-contain w-full h-full"
                                    />
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className=""
                        variants={footerTextvariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            delay: 1.2,
                            duration: 0.6,
                            ease: "easeOut",
                            type: "spring"
                        }}
                    >
                        <p className="font-body text-sm text-gray-400">
                            Made by Abhrajit Debnath ❤️
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </footer>
    )
}