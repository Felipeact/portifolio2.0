'use client'
import Image from 'next/image'
import Movies from '../components/videos'
import { Outfit, Roboto } from 'next/font/google'
import { useState, useEffect } from 'react';
import { youtubeApi } from '../services/youtubeApi';
import Button3D from '../components/Button3D';
import LoadingIndicator from '../components/LoadingIndicator'; // Import your loading indicator component

import MyPhoto from "../../public/myphoto.jpg"

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export default function Home() {
  const [loading, setLoading] = useState(true); // Define a loading state
  
  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a certain time (simulating loading completion)
    }, 3000); // Adjust the timeout according to your loading time

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen md:min-h-[calc(100vh_-_5rem)] mx-auto lg:max-w-[90%] md:overflow-hidden ">
      {/* Render loading indicator when loading is true */}
      {loading && 
        <h1>
          Loading
        </h1>
      }
      
      <div className=' flex lg:flex-row flex-col items-center justify-between mx-auto p-8 '>
        <div className="p-4 md:mt-[4rem]">
          <div>
            <h1 className={`${outfit.className} text-center text-5xl xl:text-7xl font-bold my-12`}> Who am I?</h1>
          </div>
          <div className="w-96 h-96 mx-auto rounded-full shadow-md overflow-hidden  border-solid border-2 border-white-500 ">
              <Image src={MyPhoto} width={0} height={0} alt="Studying Img" className=" w-full object-cover h-auto"/>
          </div>
          
          <div  className={` ${roboto.className} text-center lg:text-left text-lg mt-4`}>
            <h5> Felipe Viana </h5>
            <p> Gameplay Programmer </p>
            <p>Passionate to help you solve problems , build products or grow an existing project .</p>
          </div>
            
            <Button3D />
        </div>
        
        <Movies />
      </div>
    </main>
  )
}
