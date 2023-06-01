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

<!--       <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>My Technologies.</h2>

          <div className="grid grid-cols-3 w-2/4 justify-items-center mx-auto sm:justify-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-8">
              <img className="filter brightness-0 invert-[1] h-12 mt-8"/>

          </div>
        </div>  -->

    </main >
  )
}
