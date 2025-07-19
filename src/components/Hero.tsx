'use client';
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react';
const MotionImage = motion.create(Image);
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // delay between each letter
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
export default function Hero() {

  const Heading = "Decentralized. Self-destructing. Yours."
  const herosection = useRef<HTMLDivElement>(null)
  const SubPara = "Chat that fades. Identity that stays.".split("");
  const Sub2Para = "Zync is a next-gen messaging app where conversations self-destruct, you own your identity, and no central server controls your data.".split("")

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, {
    stiffness: 40,
    damping: 50,
    mass: 1.5,
  });

  const smoothY = useSpring(rawY, {
    stiffness: 40,
    damping: 50,
    mass: 1.5,
  });


  useEffect(() => {

    function handleMouseMove(e: MouseEvent) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (centerX - e.clientX) * 0.1;
      const offsetY = (centerY - e.clientY) * 0.1;

      rawX.set(offsetX);
      rawY.set(offsetY);
    }

    function handleMouseLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    const section = herosection.current;

    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);


  return (
    <section className="pt-12 pb-20" ref={herosection}>
      <div className="max-w-[90%] mx-auto text-center flex flex-col items-center gap-12">

        {/* HEADINGS */}
        <div className="flex flex-col gap-4">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="filter font-heading font-bold uppercase bg-gradient-to-t from-gray-500/40 to-gray-100 text-transparent bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-widest">

            {
              Heading.split("").map((char, idx) => {
                return (
                  <motion.span
                    variants={letter}
                    key={idx}
                    transition={{

                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1], // this is easeOut

                    }}

                    className="inline-block"
                  >

                    {char}
                  </motion.span>
                )
              })
            }
          </motion.h1>

          <motion.h3
            variants={containerVariants}
            initial="hidden"
            transition={{
              delay: 3, // delay entire h3
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-subtext font-body w-fit text-sm sm:text-base md:text-lg mx-auto">
            {SubPara.map((letter, idx) => {
              return (
                <motion.span
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: idx * 0.04,
                    duration: 1,
                    ease: "easeOut",
                  }}
                >{letter}</motion.span>
              )
            })}
          </motion.h3>
          <motion.p

            className="text-subtext font-body text-xs sm:text-sm max-w-2xl mx-auto md:text-lg">
            {Sub2Para.map((letter, idx) => {
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: idx * 0.03,
                    duration: 1,

                    ease: "easeOut",
                  }}
                >{letter}</motion.span>
              )
            })}
          </motion.p>


          <motion.div
            className="p-[2px] rounded-3xl w-fit mx-auto"
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
            <button className="bg-[#151718] px-6 py-2 rounded-3xl text-white font-normal capitalize font-body cursor-pointer brightness-105 text-sm md:text-lg">
              Demo
            </button>
          </motion.div>
        </div>

        {/* IMAGE */}

        <div className="relative w-full max-w-[900px] aspect-[1543/1000] mx-auto">

          {/* Layer 0 */}
          {/* <Image
                        src="/assets/images/banner-layer-1.png"
                        alt="Zync Layer 1"
                        fill
                        className="object-contain z-0"
                        priority
                    /> */}


          <div className="absolute inset-0 z-4 mt-25">
            <motion.div
              initial={{
                filter: 'blur(100px)'
              }}
              animate={{
                filter: 'blur(150px)'
              }}

              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: "mirror"
              }}

              className="w-full h-full mx-auto bg-purple-600 rounded-full " />
          </div>


          {/* Layer 2 */}
          <div className="h-64">

            <div className="perspective-[1200px] max-w-screen flex justify-center items-center h-[350px] xs:h-[450px] sm:h-[550px] md:h-[700px] xl:h-[750px]">
              <motion.div

                initial={{
                  filter: 'blur(2px)',
                }}
                animate={{
                  filter: 'blur(5px)',

                }}

                transition={{
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="w-56 h-56 rounded-full border-10 border-purple-500 blur-xs xs:w-72 xs:h-72 sm:w-82 sm:h-82 md:w-90 md:h-90 lg:w-[70%] lg:h-[75%] xl:w-[75%] xl:h-[80%]"
                style={{
                  transform: 'rotateX(55deg) rotateY(10deg) rotateZ(20deg)',
                }}
              ></motion.div>
            </div>


            <MotionImage
              src="/assets/images/banner-layer-2.png"
              alt="Zync Layer 2"
              fill
              className="object-contain z-10 mx-auto"
              initial={{
                scale: 5,
                rotateX: 0,
                rotateY: 0,
              }}
              animate={{
                scale: [0.98, 1.02, 0.99],
                rotateX: [0, 5, -10, 0],
                rotateY: [0, -5, -10, 0],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                x: smoothX,
                y: smoothY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              priority
            />



            {/* <MotionImage
              src="/assets/images/banner-layer-2.png"
              alt="Zync Layer 2"
              fill
              // filter drop-shadow-[0_5px_10px_#9024C9]
              className="object-contain z-10 "
              initial={{
                scale: 5,
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0.98, 1.02, 0.99],
                x: [0, 5, -4, 5, -4, 0],
                y: [0, -5, 5, -10, 10, 0],
                rotateX: [0, 5, -5, 0],
                rotateY: [0, -5, 5, 0],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                x,
                y,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}

              priority
            /> */}


          </div>

        </div>
      </div>
    </section>
  );
}
