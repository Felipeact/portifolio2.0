'use client'
import { Suspense, useEffect, useState } from 'react'
import { Outfit, Roboto } from 'next/font/google'

import { GetProjects } from '../../components/GetProjetcs'
import { api } from '../../services/api'
import { Loading } from '../../components/Widget/Loading'


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
    thumbnail: string
    images: [],
    description: string
    technologies: [],
    role: string,
    timeline: string
}





export default function Projects() {
  const [query, setQuery] = useState('all');
  const [projects, setProjects] = useState<GetProjectsProps[]>([])
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    async function getProjects() {
      setLoading(true);
      const response = await api.get('/projects/')
      const projects = response.data
      setProjects(projects);
      setLoading(false)
    }

    getProjects()
  }, []);

  if(isLoading) return <Loading />
  if (!projects) return <p> No data</p>

    
  const results = projects.filter((value) => {
    if (value.role === query)
      return value.role

    if (query === 'all')
      return value
  }

  )


  return (
    <main className="min-h-screen bg-blur bg-cover bg-no-repeat bg-fixed ">

      <div className="mx-auto lg:max-w-[78%]">

        <section>
          <h1 className={`${outfit.className} text-center font-bold text-5xl mb-12 pt-20`}>Best Projects</h1>

          
        </section>

        <div className={`flex justify-between w-[76%]  md:w-[28rem] mb-16 mx-auto `}>
          <p onClick={() => setQuery('all')}>All</p>
          <p onClick={() => setQuery('frontend')} >Front End</p>
          <p onClick={() => setQuery('backend')}>Back End</p>
          <p>Full Stack</p>
        </div>
        
      
        <div className='grid grid-rows-1 w-11/12 items-center mx-auto sm:justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {projects.map( data  => (
              <GetProjects data={data} key={data.id}/>
          ))}

        </div>
      </div>
    </main>
  )
}
