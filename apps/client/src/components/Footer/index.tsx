'use client'
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { LinkedinLogo } from 'phosphor-react';

import LogoImg from '../../../public/logo.svg'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export function Footer() {

  return (
    <footer className={`${outfit.className} border-t border-gray-600 bg-gray-700 h-24 `}>
      <div className="bg-gray-700 flex justify-between items-center h-full px-4 mx-auto lg:max-w-[80%] md:items-center md:flex md:px-8">
        <Image src={LogoImg} alt="Logo" className='w-[6rem] h-[5rem]' style={{ filter: 'invert(1)' }} />
        <div>
          <p className="text-xl mb-2"> Keep in touch with me</p>
          <ul>
            <li>
              <Link href="https://www.linkedin.com/in/felipe-viana/">
                <LinkedinLogo size={30} className="hover:text-purple-500"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
