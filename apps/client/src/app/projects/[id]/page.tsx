'use client'
import Image from 'next/image'
import { Outfit, Roboto } from 'next/font/google'

import { Carousel } from '../../../components/Carousel'
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
            <Carousel urls={project?.images}/>
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
