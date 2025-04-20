'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="p-4 bg-white shadow-md rounded-lg">
      {!menuOpen && (
        <div className="flex justify-between items-center">
          
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Image
                src="/logoDesign.svg"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <h1 className="text-2xl font-bold">Felipe Viana</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <Link href="/projects" className={pathname == "/projects" ? ' font-bold' : ''}><span className="mx-4">Projects</span></Link>
            <Link href="/blog" className={pathname == "/blog" ? ' font-bold' : ''}><span className="mx-4">Blog</span></Link>
            <Link href="#about" className={pathname == "#about" ? ' font-bold' : ''}><span className="mx-4">About</span></Link>
            <Link href="/#contact" className={pathname == "#contact" ? ' font-bold' : ''}><span className="mx-4">Contact</span></Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="w-full h-[90vh] bg-white flex flex-col gap-4 items-center pt-10 relative md:hidden">
          {/* Close Button */}
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>

          {/* Mobile Logo and Title */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Image
                src="/logoDesign.svg"
                alt="Logo"
                width={73}
                height={73}
              />
            </div>
            <h1 className="text-2xl font-bold">Felipe Viana</h1>
          </Link>

          {/* Mobile Nav Links */}
          <Link href="/projects" onClick={() => setMenuOpen(false)} className={pathname == "/projects" ? ' font-bold' : ''}><span className="py-2 text-xl">Projects</span></Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className={pathname == "/blog" ? ' font-bold' : ''}><span className="py-2 text-xl">Blog</span></Link>
          <Link href="#about" onClick={() => setMenuOpen(false)} className={pathname == "#about" ? ' font-bold' : ''}><span className="py-2 text-xl">About</span></Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)} className={pathname == "#contact" ? ' font-bold' : ''}><span className="py-2 text-xl">Contact</span></Link>
        </nav>
      )}
    </header>
  );
}
