interface NavProps {
  children: ReactNode;
}


export default function Nav({ children } : NavProps ) {
  return (
    <nav className="py-4 px-6 text-sm font-medium">
      <ul className="flex space-x-3">
        {children}
      </ul>
    </nav>
  )
}
