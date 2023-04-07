import Image from 'next/image'

import StudyingImg from '../images/Studying-amico.svg'
import { Outfit, Roboto } from 'next/font/google'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export default function Home() {


  return (
    <main className="min-h-screen bg-blur bg-cover bg-no-repeat bg-fixed px-4 mx-auto flex items-center justify-center ">


      <section className='md:w-3/6'>
        <h1 className="text-5xl xl:text-7xl font-bold my-12">I am a Software Developer and Front End Developer</h1>
        <p className={` ${roboto.className} text-lg mt-16`}>passionate to help you solve problem , build products or grow an existing project .</p>
        <button 
        className={` ${roboto.className} mt-12 p-1 w-28 h-12 text-white font-bold bg-purple-600 rounded-md animate-bounce hover:animate-none hover:bg-transparent hover:border-2 hover:border-purple-600 `}>
          Hire me
        </button>
      </section>

      <Image src={StudyingImg} alt="Studying Img" className=' hidden md:block' />


    </main>
  )
}
