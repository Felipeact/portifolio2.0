
import { Outfit } from 'next/font/google';



const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

export function Footer() {

  return(
    <footer className={`${outfit.className} w-full bg-gray-700 border-b border-gray-600`}>
      
    </footer>
  )
}
