
import { Header } from '@/components/hearder'
import Image from 'next/image'

import StudyingImg from '../images/Studying-amico.svg'
import { Outfit, Roboto } from 'next/font/google'

import styles from './styles/page.module.scss'

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
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <section>
          <h1 className={outfit.className}>I am A Software developer and Front End Developer</h1>
          <p className={roboto.className}>passionate to help you solve problem , build products or grow a existing project .</p>
          <button> Hire me</button>
        </section>

        <Image src={StudyingImg} alt="Studying Img"/>

        
      </div>
    </main>
  )
}
