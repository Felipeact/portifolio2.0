interface ListProps {
  children: ReactNode;
}

export default function List({ children } : ListProps ) {
  return (
    <ul className="divide-y divide-slate-100">
      {children}
    </ul>
  )
}
