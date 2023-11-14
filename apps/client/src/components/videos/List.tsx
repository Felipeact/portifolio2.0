import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

export default function List({ children } : ListProps ) {
  return (
    <ul className="divide-y divide-slate-100 h-full overflow-y-scroll scrollbar-hide">
      {children}
    </ul>
  )
}
