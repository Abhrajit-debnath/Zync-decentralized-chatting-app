'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Faq() {
    const faqs = [
        {
            question: "How does Zync ensure message self-destruction?",
            answer:
                "Messages in Zync are encrypted and automatically deleted from all devices after a set time, leaving no trace behind.",
        },
        {
            question: "Can I own my identity in Zync?",
            answer:
                "Yes, Zync uses decentralized identity protocols so you always stay in control of your profile and credentials.",
        },
        {
            question: "Is Zync end-to-end encrypted?",
            answer:
                "Absolutely. All messages and files are secured using state-of-the-art end-to-end encryption protocols.",
        },
        {
            question: "What is self-destruction?",
            answer:
                "Self destruction is a feature by which your message self destruct by itself at a fixed time",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };


    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-20">
            <div
                className="max-w-[90%] mx-auto text-center flex flex-col items-center"

            >
                {/* Title */}
                <motion.div className=""

                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    initial={{
                        opacity: 0,
                        y: 20
                    }}

                    animate={{

                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        duration: 1,
                        ease: "easeIn"
                    }}



                >
                    <h2

                        className="font-heading text-white font-semibold text-3xl tracking-widest uppercase pb-10"
                    >
                        FAQs
                    </h2>

                    {/* FAQ Cards */}
                    <motion.div
                        className="w-full max-w-3xl space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}

                    >
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                transition={{ duration: 0.7, ease: "linear", type: "spring", damping: 15, stiffness: 90 }}
                                className="bg-gray-600/5 border border-white/10 rounded-xl px-6 py-4 text-left backdrop-blur-lg shadow-md hover:border-white/20 transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex justify-between items-center text-left text-white font-medium text-lg focus:outline-none"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-logo text-xl">
                                        {openIndex === idx ? '-' : '+'}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx
                                        ? 'max-h-[300px] mt-4 opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-subtext text-sm font-body">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
