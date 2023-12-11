import { ReactNode } from 'react';

interface NavProps {
  children: ReactNode;
}


export default function Nav({ children } : NavProps ) {
  return (
    <nav className="pb-4 pt-[7rem] px-6 text-sm font-medium mt-16 ">
      <ul className="flex space-x-3">
        {children}
      </ul>
    </nav>
  )
}
