'use client'
import { useEffect, useState } from 'react'
import { Outfit, Roboto } from 'next/font/google'

import { api } from '../../services/api'
import Loading from './loading'
import { GetFeedBack } from '../../components/GetFeedBack'


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
  return (
    <main>
      <div> Working on it </div>
    </main>
  )
}
