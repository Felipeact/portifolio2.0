import Link from "next/link";
import { Outfit } from 'next/font/google';

import styles from './styles.module.scss'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export function Header() {
  return(
    <header className={`${styles.headerContainer} ${outfit.className}`}>
      <Link href="/" >
        Felipe Viana
      </Link>


      <nav>
        <ul>
          <li><Link href="/about">about</Link></li>
          <li><Link href="/projects">projects</Link></li>
          <li><Link href="/my-world">my world</Link></li>
          <li><Link href="/resume">Resume</Link></li>
        </ul>
      </nav>
    </header>
  )
}