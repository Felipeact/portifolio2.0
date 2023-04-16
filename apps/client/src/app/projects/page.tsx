'use client'
import { Outfit, Roboto } from 'next/font/google'
import { GetProjects } from '../../components/GetProjetcs'

import { useState } from 'react'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

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
  const [selectedId, setSelectedId] : any = useState(null)

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
          {results.map(data => (
            <GetProjects data={data} key={data.projectId} />
          ))}

        </div>
      </div>
    </main>
  )
}
