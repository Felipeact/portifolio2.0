interface NavItemProps {
  id: string
  setIsActive: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}


export default function NavItem({  id, isActive, children, setIsActive} : NavItemProps ) {
  return (
    <li>
      <a
        onClick={setIsActive}
        className={`block px-3 py-2 rounded-md ${isActive ? 'bg-purple-500 text-white' : 'bg-black-50'}`}
      >
        {children}
      </a>
    </li>
  )
}
