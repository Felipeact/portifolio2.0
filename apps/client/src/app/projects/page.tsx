'use client'


import { Outfit, Roboto } from 'next/font/google'
import { GetProjects } from '../../components/GetProjetcs'

import { useEffect, useState } from 'react'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})


export default function Projects() {
  
  const [query, setQuery] = useState('all');

  const projects = [
    {
      projectId: '1',
      projectName: 'News',
      projectDescription: 'exemplo 1',
      type: 'frontend'
      
    },
    {
      projectId: '2',
      projectName: 'News 2',
      projectDescription: 'exemplo 2',
      type: 'backend'
      
    },
    {
      projectId: '3',
      projectName: 'News 3',
      projectDescription: 'exemplo 3',
      
    },
  ]



  const results = projects.filter((value) => {
    if (value.type === query)
    return value.type

    if ( query === 'all')
    return value
  } 
    
  )

  
  return (
    <div className="px-4 mx-auto lg:max-w-[78%]">

      <section className="mt-20">
        <h1 className={`${outfit.className} text-center font-bold text-5xl mb-12`}>Best Projects</h1>

      </section>

      <div className={`${roboto.className} flex justify-between w-full md:w-[28rem] mb-16`}>
        <p onClick={ () => setQuery('all')}>All</p>
        <p onClick={ () => setQuery('frontend')} >Front End</p>
        <p onClick={ () => setQuery('backend')}>Back End</p>
        <p>Full Stack</p>
      </div>

      <div className='flex flex-col items-center justify-center md:flex-wrap md:flex-row md:justify-between'>
      { results.map(data => (
        <GetProjects data={data} key={data.projectId} />
      ))}
        
      </div>
    </div>
  )
}
