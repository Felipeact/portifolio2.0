'use client'
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { LinkedinLogo } from 'phosphor-react';

import LogoImg from '../../../public/logo.png'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export function Footer() {

  return (
    <footer className={`${outfit.className}  border-t border-gray-600  h-24`}>
      <div className=" w-full bg-gray-700 flex justify-around items-center h-full">
        <Image src={LogoImg} alt="Logo" />
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
