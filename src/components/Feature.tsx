'use client'
import { motion } from "framer-motion";

export default function Feature() {
    const Features = [
        {
            featureName: "⚡ Self-Destruct Messages",
            featureDesc: "Messages vanish after viewing — leaving no trace behind.",
        },
        {
            featureName: "⚡ Own Your Identity",
            featureDesc: "Your data stays yours. No central authority, just your key and control.",
        },
        {
            featureName: "⚡ Decentralized",
            featureDesc: "Powered by decentralized protocols — no single server owns your chat.",
        },
        {
            featureName: "⚡ Instant & Real-Time Messaging",
            featureDesc: "Send and receive messages instantly, securely, and globally.",
        },
    ];

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
        <section className="py-16">
            <div className="max-w-[90%] mx-auto text-center flex flex-col items-center gap-12">
                <motion.div
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

                    className="bg-background/40 backdrop-blur-[4px] border-[0.5px] border-gray-700 rounded-lg py-10 px-5 w-[90%] lg:w-[75%]">
                    <h2 className="font-heading text-white font-medium text-2xl tracking-widest pb-10 uppercase">
                        Why Zync ?
                    </h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col gap-6 justify-center items-center md:flex-row md:gap-10 flex-wrap"
                    >
                        {Features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                transition={{ duration: 0.7, ease: "linear", type: "spring", damping: 15, stiffness: 90 }}
                                className="flex flex-col items-center justify-evenly gap-2 w-full xs:w-[80%] md:w-[45%] lg:w-[40%] xl:w-[25%] px-4 py-6 rounded-xl "
                            >
                                <h3 className="text-white font-semibold font-body text-lg sm:text-xl">
                                    {feature.featureName}
                                </h3>
                                <p className="text-subtext font-body text-xs sm:text-sm md:text-base">
                                    {feature.featureDesc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
