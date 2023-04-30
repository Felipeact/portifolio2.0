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
          <h1 className={`${outfit.className} text-5xl xl:text-7xl font-bold my-12`}>
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
          <p className={` ${roboto.className} text-lg mt-16`}>Passionate to help you solve problems , build products or grow an existing project .</p>
        </section>
        <Image src={StudyingImg} alt="Studying Img" className=' hidden md:block' />
      </div>


      <div className="mx-auto pb-24 xl:max-w-[80%]  md:flex md:flex-col ">
        <h2 className="text-5xl font-bold mb-8"> My Time Line </h2>
        <motion.div
        >
          <section className="">
            <h3 className="text-3xl font-bold mb-4">2023</h3>

            <div className=' mb-4' >
              <p className=' before:content-["🔵"] before:m-2 text-xl font-medium mb-2'>Started Computer System program at BCIT</p>
              <p className='text-stone-300 ml-12'> After finished smy react js certification I decided to join a college to improve more my knowledge.</p>
            </div>

            <div className='mb-4' >
              <p className='before:content-["🔵"] before:m-2 text-xl font-medium mb-2'> Dispatcher </p>
              <p className='text-stone-300 ml-12'> Im working as dispatcher at Diamond Delivery </p>
            </div>

            <div className='mb-4' >
              <p className='before:content-["🔵"] before:m-2 text-xl font-medium mb-2'> My Portifolio </p>
              <p className='text-stone-300 ml-12'> Started to design my portifolio </p>
            </div>
          </section>
        </motion.div>
        <motion.div
          className="mt-4"
          animate={isVisible ? show : hide}
        >

          <section>
            <h3 className="text-3xl font-bold mb-4">2022</h3>

            <div className='mb-4' >
              <p className='before:content-["🔵"] before:m-2 text-xl font-medium mb-2'>From Driver to Dispatcher </p>
              <p className='text-stone-300 ml-12'> I was working as a driver for a company
                called Diamond Delivery and after 8 I got a offer to work as dispatcher</p>
            </div>

            <div className='mb-4' >
              <p className='before:content-["🔵"] before:m-2 text-xl font-medium mb-2'> Working on front end Projects </p>
            </div>

            <div className='mb-4' >
              <p className='before:content-["🔵"] before:m-2 text-xl font-medium mb-2'>Web Developer Volunteer </p>
            </div>

          </section>

        </motion.div>
        <span
          className="cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? 'close' : ' show more'}
        </span>
      </div>

    </main >
  )
}
