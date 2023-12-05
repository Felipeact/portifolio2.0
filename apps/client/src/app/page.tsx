'use client'
import Image from 'next/image'
import Link from "next/link";
import Movies from '../components/videos'

import MyPhoto from "../../public/myphoto.jpg"
import { Outfit, Roboto } from 'next/font/google'
import { useState, useEffect } from 'react';
import { youtubeApi } from '../services/youtubeApi';
import Button3D from '../components/Button3D';


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export interface videosProps {
  id: string
  snippet: {
    title: string,
    publishedAt: string,
    videoOwnerChannelTitle: string,
    resourceId: {
      videoId: string
    }
  }

}

export default function Home() {

  const [videos, setVideos] = useState<videosProps[]>([]);
    
    useEffect( () => { 
        async function fetchData() {
            try {
              const res = await youtubeApi.get(`playlistItems?part=snippet&playlistId=PL6N9OJFlyLL3GRwaMecUht1zghKqonAEQ&key=AIzaSyCqsrqtdjfs14LSFzgGP5rbzMMFFZyR7Xs`);
              // const res = await youtubeApi.get(`search?part=snippet&forMine=true&maxResults=25&type=video&key=AIzaSyCqsrqtdjfs14LSFzgGP5rbzMMFFZyR7Xs`);
              const { items } = res.data 
              setVideos(items);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


  return (
    <main className="min-h-screen md:min-h-[calc(100vh_-_5rem)] mx-auto lg:max-w-[90%] ">

      <div className=' flex lg:flex-row flex-col items-center justify-between mx-auto p-8'>
        <div className="p-4">
          <div>
            <h1 className={`${outfit.className} text-center lg:text-left text-5xl xl:text-7xl font-bold my-12`}> Who am I?</h1>
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
        
        <Movies data={videos}/>
      </div>

{/*         <div>
          <h2 className={`${outfit.className} text-center font-bold text-5xl mb-20`}>My Technologies.</h2>

          <div className="grid grid-cols-3 w-[90%] md:w-2/4 justify-items-center mx-auto sm:justify-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 pb-8 ">
              <img src='https://upload-images-projects.s3.us-east-1.amazonaws.com/b1a7f0a21cec06a11f5dc3f42097feb3-typescript.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/737d48b4c831ae3ce167b5af094703c8-tailwindcss.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/afe3777d886669e33bb6a0a700bc9fce-nodejs-icon.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/be1b286637e169a85c64d1aae3d0d38a-vitejs.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/5c73baaef633e851f50a3d738743ae5a-graphql.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/d77b2c1ee7596b7efbefbdb6963be115-react.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/03555ac8dbd63fd489a2a25cd16c2f1e-Fauna-Logo.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/815bf9e9fd6eb68d9ff225fb395fe0de-next-js.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/45c0cd42a899239b7bd70506672ee43f-stripe.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
              <img src='https://upload-images-projects.s3.amazonaws.com/9c9b9bce8c9d1a3394c6331366b1a893-kafka.svg' className="filter brightness-0 h-12 mt-8 invert-[0.6] hover:invert-[1] cursor-pointer"/>
          </div>
        </div> */}

    </main >
  )
}
