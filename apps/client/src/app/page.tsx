'use client'
import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'

import StudyingImg from '../images/Studying-amico.svg'
import { Outfit, Roboto } from 'next/font/google'
import { motion } from 'framer-motion'
import { useState } from 'react'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

const show = {
  opacity: 1,
  display: "block"
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none"
  }
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <main className="min-h-screen md:min-h-[calc(100vh_-_5rem)] bg-blur bg-cover bg-no-repeat bg-fixed px-4 mx-auto  ">

      <div className='flex items-center justify-center h-screen'>

        <section className='md:w-3/6'>
          <h1 className={`${outfit.className} text-center md:text-left text-5xl xl:text-7xl font-bold my-12`}>
            I am a
            <Typewriter

              words={[' Software', ' Front End']}
              loop={5}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            <br />
            Developer
          </h1>
          <p className={` ${roboto.className} text-center md:text-left text-lg mt-16`}>Passionate to help you solve problems , build products or grow an existing project .</p>
        </section>
        <Image src={StudyingImg} alt="Studying Img" className=' hidden md:block' />
      </div>

        <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl mb-20`}>My Technologies.</h2>

          <div className="grid grid-cols-3 w-[90%] md:w-2/4 justify-items-center mx-auto sm:justify-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-8 ">
              <img src='https://upload-images-projects.s3.us-east-1.amazonaws.com/b1a7f0a21cec06a11f5dc3f42097feb3-typescript.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/737d48b4c831ae3ce167b5af094703c8-tailwindcss.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/afe3777d886669e33bb6a0a700bc9fce-nodejs-icon.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/be1b286637e169a85c64d1aae3d0d38a-vitejs.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/5c73baaef633e851f50a3d738743ae5a-graphql.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/d77b2c1ee7596b7efbefbdb6963be115-react.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/03555ac8dbd63fd489a2a25cd16c2f1e-Fauna-Logo.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/815bf9e9fd6eb68d9ff225fb395fe0de-next-js.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/45c0cd42a899239b7bd70506672ee43f-stripe.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/9c9b9bce8c9d1a3394c6331366b1a893-kafka.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
          </div>
        </div>

    </main >
  )
}
