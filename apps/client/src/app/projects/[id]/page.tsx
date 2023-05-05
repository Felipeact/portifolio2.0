'use client'
import Image from 'next/image'

import { Outfit, Roboto } from 'next/font/google'

import ExmploImg from '../../../images/slide-3.jpg'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})



export default function ProjectsId() {
  return (
    <main className="min-h-screen bg-blur bg-cover bg-no-repeat bg-fixed ">

      <div className="mx-auto lg:max-w-[78%]">


        <div>
          <h1 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>Project name.</h1>

          <section className='flex flex-col items-center'>
            <div className='flex justify-between mt-32 items-center w-[60%] md:w-[25%] '>
              <div className='text-center'>
                <p className={`${roboto.className} text-xl`}> Time Line</p>
                <span className={`${roboto.className} text-sm`}>2022 - 2023</span>
              </div>

              <div className='text-center'>
                <p className={`${roboto.className} text-xl`}> Role </p>
                <span className={`${roboto.className} text-sm`}>Frontend </span>
              </div>
            </div>

            <Image className='mt-28 h-[400px] md:h-[500px] w-[80%]  md:w-auto rounded-lg' src={ExmploImg} alt='Project Name' />
          </section>
        </div>

        <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>Overview.</h2>

          <section className='flex flex-col items-center'>
            <div className='flex justify-between mt-12 items-center w-[85%] md:w-[50%]  '>
              <p className='p-4 text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam omnis repudiandae similique deserunt, 
                vero magnam natus iure perspiciatis hic est ipsa obcaecati ducimus reiciendis et nulla sit ex voluptate commodi!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nisi sapiente ab, quaerat aut cum architecto repellendus 
                ucimus omnis provident voluptatibus distinctio! Saepe neque est necessitatibus, sapiente ducimus hic cumque.
              </p>
            </div>

          

          </section>
        </div>




      </div>
    </main>
  )
}
