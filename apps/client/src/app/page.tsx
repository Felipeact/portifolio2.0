'use client'
import { useRef } from 'react';
import { useInView, useScroll, } from 'framer-motion';

import Projects from '../components/Projects';
import AboutMe from '../components/AboutMe';
import { Footer } from '../components/Footer';


export default function Home() {


  const { scrollYProgress } = useScroll();
  const ref = useRef(null)
  const isInView = useInView(ref)

  // useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
  //   console.log("Page scroll: ", latest)
  // })

  return (
    <main className='h-[100vh] flex flex-col'>
      <div className='flex-1'>

        {/* Video Introduction */}
        <div className="flex-1 ">
          <div className="inset-0 flex justify-center items-center z-0">
            <div className="h-[80vh] w-full ">
              <video className="w-full h-full" autoPlay preload='none'>
                <source src="../../" type="video/mp4" />
                
              </video>
            </div>
          </div>
        </div>


        <section className='mx-auto lg:max-w-[80%]'>
          {/* Projects Component */}
          <Projects title={'Gameplay Projects'} />

          {/* About me */}
          <AboutMe title={'About Me'} />

        </section>

        {/* Footer */}
        <Footer />
      </div>


    </main >
  )
}

