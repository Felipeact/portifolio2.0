'use client'
import { Header } from '@/components/hearder'
import { EmblaOptionsType } from 'embla-carousel-react'


import { Outfit, Roboto } from 'next/font/google'
import   EmblaCarousel  from '@/components/EmblaCarousel'
import { GetProjects } from '@/components/GetProjetcs'

import styles from './styles.module.scss'
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



const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
  
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
    <>
      <Header />

      <section className={styles.carousel__content}>
        <h1 className={outfit.className}>Best ones</h1>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} /> 

      </section>

      <div className={`${styles.filter} ${roboto.className}`}>
        <p onClick={ () => setQuery('all')}>All</p>
        <p onClick={ () => setQuery('frontend')} >Front End</p>
        <p onClick={ () => setQuery('backend')}>Back End</p>
        <p>Full Stack</p>
      </div>

      <div className={styles.overall__project__container}>
      { results.map(data => (
        <GetProjects data={data} key={data.projectId} />
      ))}
        
      </div>
    </>
  )
}
