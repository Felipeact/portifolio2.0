
import { Header } from '@/components/hearder'

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
    <>
      <Header />


    </>
  )
}
