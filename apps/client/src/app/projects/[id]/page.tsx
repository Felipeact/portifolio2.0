'use client'
import Image from 'next/image'
import { Outfit, Roboto } from 'next/font/google'

import { api } from '../../../services/api';
import { useState, useEffect } from 'react';
import { Loading } from '../../../components/Widget/Loading'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

interface GetProjectsProps {
  id: string
  slug: string
  title: string
  thumbnail: any
  images: [],
  description: string
  technologies: [],
  role: string,
  overview: string
  timeline: string
}

export default function ProjectsId({
  params: { id },
}: {
  params: { id: string };
}) {

  const [project, setProject] = useState<GetProjectsProps>()
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    async function getProjectById() {
      setLoading(true);
      const { data } = await api.get(`projects/${id}`)
      const result = Object.assign(data)
      setProject(result);
      setLoading(false)
    }

    getProjectById()
  },[])  


  return (
    <main className="min-h-screen bg-blur bg-cover bg-no-repeat bg-fixed ">

      <div className="mx-auto lg:max-w-[78%]">


        <div>
          <h1 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>{project?.title}.</h1>

          <section className='flex flex-col items-center'>
            <div className='flex justify-between mt-32 items-center w-[60%] md:w-[25%] '>
              <div className='text-center'>
                <p className={`${roboto.className} text-xl`}> Time Line</p>
                <span className={`${roboto.className} text-sm`}>{project?.timeline}</span>
              </div>

              <div className='text-center'>
                <p className={`${roboto.className} text-xl`}> Role </p>
                <span className={`${roboto.className} text-sm`}>{project?.role} </span>
              </div>
            </div>

            <Image className='mt-28 h-[400px] md:h-[500px] w-[80%]  md:w-auto rounded-lg' 
            width={500} 
            height={500} 
            src={project?.thumbnail} 
            alt='Project Name' />
          </section>
        </div>

        <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>Overview.</h2>

          <section className='flex flex-col items-center'>
            <div className='flex justify-between mt-12 items-center w-[85%] md:w-[50%]  '>
              <p className='p-4 text-lg'>
                {project?.overview}
              </p>
            </div>
          </section>
        </div>

        <div className=" w-full max-w-[67rem] mx-auto">
          <div className="relative">
              <div id="default-carousel" className="relative w-full" data-carousel="slide">
            {/* <!-- Carousel wrapper --> */}
            <       div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* <!-- Item 1 --> */}
                {project?.images.map((url : string) => (
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <Image src={url} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
            ))}
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>
            {/* <!-- Slider controls --> */}
            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>Description.</h2>

          <section className='flex flex-col items-center'>
            <div className='flex justify-between mt-12 items-center w-[85%] md:w-[50%]  '>
              <p className='p-4 text-lg'>
                {project?.description}
              </p>
            </div>
          </section>
        </div>

        <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl pt-20`}>Technologies.</h2>

          <div className="grid grid-cols-3 w-2/4 justify-items-center mx-auto sm:justify-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-8">
            { project?.technologies.map( url => (
              <img src={url} className="filter brightness-0 invert-[1] h-12 mt-8"  key={url}/>

            ))}
          </div>
        </div> 

      </div>
    </main>
  )
}
