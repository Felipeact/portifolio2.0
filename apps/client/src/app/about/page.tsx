'use client'
import { motion } from "framer-motion"
import { Outfit, Roboto } from "next/font/google"
import Image from "next/image"
import { Cards, HardDrives } from "phosphor-react"

import FronEndIcon from '../../assets/frontend.svg'
import StudyingImg from '../../images/Studying-amico.svg'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
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
        <div className="mx-auto mt-56">
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
            <Image src={StudyingImg} alt="Studying Img" />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-11/12 mt-40 md:flex md:justify-between ">
        <div className="flex items-center justify-center mb-8 p-8 md:flex-col md:justify-start">
          <h2 className={`${outfit.className} text-6xl capitalize font-bold text-right md:mb-14`}> 2+ </h2>
          <p className={`${roboto.className} text-4xl capitalize font-bold text-center md:w-[24%] md:text-start`}> Years experience working</p>
        </div>
        <div className="md:w-1/2 md:p-8">
          <h2 className={`${outfit.className} text-3xl capitalize font-bold mb-8 text-center md:text-left md:mx-auto `}> Software Developer, Passionate for Learning new Technologies and Developing Systems.</h2>

          <div className="flex flex-col justify-center items-center sm:flex-row gap-4 md:mt-12">
            <div className=" bg-purple-500 rounded-lg w-[322px] h-[304px] mb-8 flex flex-col justify-end p-8">
              <Cards size={32} className="mb-4" />
              <p>Front End Developer</p>
              <a href="/projects" className="mt-4">Discover More</a>
            </div>

            <div className=" bg-gray-600 rounded-lg w-[322px] h-[304px] mb-8 flex flex-col justify-end p-8">
              <HardDrives size={32} className="mb-4" />
              <p>Back End Developer</p>
              <a href="/projects" className="mt-4">Discover More</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[80%] lg:max-w-[78%] mt-28">
        <h2 className="text-6xl capitalize font-bold mb-14">Education</h2>
        
        <div className="md:flex md:justify-between mb-8">
          <div className="cursor-pointer">
            <h3 className="text-4xl capitalize font-bold mb-2">Computer System</h3>
            <p className="mb-2">British Columbia Institute of Technology <span>(BCIT)</span></p>
            <span>Vancouver | Canada</span>
          </div>
          <span className="hidden md:p-2 md:border md:border-purple-600 md:rounded-lg md:font-bold md:h-fit ">Current</span>
        </div>

        <div className="md:flex md:justify-between mb-8">
          <div className="cursor-pointer">
            <h3 className="text-4xl capitalize font-bold mb-2">React JS Developer</h3>
            <p className="mb-2">Rocketseat</p>
            <span>Online | Brazil</span>
          </div>
          <span className="hidden md:p-2 md:border md:border-purple-600 md:rounded-lg md:font-bold md:h-fit ">Current</span>
        </div>

      </div>

    </main>
  )
}