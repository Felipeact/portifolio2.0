import { Outfit } from 'next/font/google'
import Image from 'next/image'
import ExmploImg from '../../images/slide-3.jpg'

import styles from './styles.module.scss'


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

interface GetProjectsProps {
  data: {
    imageUrl?: string,
    projectId: string,
    projectName: string,
    projectDescription: string,
  }
}

export function GetProjects( { data }: GetProjectsProps ) {
  return (
    <div className={styles.project__container}>
      <Image className={styles.project__img} src={ExmploImg} alt="Exemplo" />
      <section className={styles.project__description}>
        <h1 className={outfit.className}>{data.projectName}</h1>
        <p>{data.projectDescription}</p>
        <a href={`/projects/${data.projectId}`}>More</a>
      </section>
    </div>
  )
}