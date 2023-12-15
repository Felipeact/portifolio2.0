import { ReactNode } from 'react';

interface NavProps {
  children: ReactNode;
}


export default function Nav({ children } : NavProps ) {
  return (
    <nav className="py-4  text-sm font-medium mt-16 md:mt-[6rem] ">
      <ul className="flex space-x-3 justify-center">
        {children}
      </ul>
    </nav>
  )
}
