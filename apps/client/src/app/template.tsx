'use client'
import { useState, useEffect } from 'react';


import { Widget } from "../components/Widget";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';
import { usePathname  } from 'next/navigation';


export default function Template({ children }: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true); // Define a loading state
  const pathName = usePathname(); // Get the router instance

  useEffect(() => {
    // Check if the current route is the homepage
    const isHomepage = pathName  === '/';

    if (isHomepage) {
      // Simulate loading process only for the homepage
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after a certain time (simulating loading completion)
      }, 4000); // Adjust the timeout according to your loading time

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timer);
    } else {
      // If it's not the homepage, set loading to false immediately
      setLoading(false);
    }
  }, [pathName]); // Listen to changes in router.pathname

  return (
    <>
       {loading ? ( // Fixed the conditional rendering syntax 
         <Loading /> 
        ) : ( 
        <>
          <Header />
          <Widget />
          {children}
        </>
       )} 
    </>
  );
}
