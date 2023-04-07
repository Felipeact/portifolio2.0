'use client'
import { motion } from "framer-motion"
import { Outfit } from "next/font/google"
import Image from "next/image"

import StudyingImg from '../../images/Studying-amico.svg'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export default function About() {
  return (
    <main className="min-h-screen bg-blur bg-cover bg-no-repeat bg-fixed md:p-8 ">

      <div className="mx-auto w-full lg:max-w-[78%] md:flex md:justify-center items-center">
        <div className="flex flex-col items-center justify-center md:items-start  z">
          <h1 className={`${outfit.className} font-bold text-6xl md:text-9xl mb-16 mt-40`}>
            Felipe <br />
            Viana
          </h1>
          <p className="text-3xl text-center md:w-3/4 md:text-left">Software Developer based in Vancouver Canada </p>
        </div>
        <div className="mx-auto mt-72">
        <motion.div
          className="w-52 h-52 md:w-80 md:h-80  mx-auto"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 9
          }}
        >
          <Image src={StudyingImg} alt="Studying Img" className=' hidden md:block' />
        </motion.div>
        </div>
      </div>


    </main>
  )
}