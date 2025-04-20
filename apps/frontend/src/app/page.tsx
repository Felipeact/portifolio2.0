'use client'
import { AboutMe } from '@/components/AboutMe';
import { LatestProjects } from '@/components/LatestProjects/Index';
import { MyThoughts } from '@/components/MyThoughts';
import Separator from '@/components/Separator';
import { TechStack } from '@/components/TechStack ';



export default function Home() {

  return (
    <div>

      <div className="relative flex-1 mt-4">
        {/* Text Overlay */}
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
            Software & Game Developer
          </h2>
          <p className="mt-4 text-gray-100 text-sm sm:text-base drop-shadow-sm">
            Passionate about Unreal Engine, C++, and Web Development.
          </p>
          
        </section>

        {/* Background Video */}
        <div className="h-[80vh] w-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            preload="none"
            loop
            muted
            playsInline
          >
            <source
              src="https://upload-images-projects.s3.amazonaws.com/HomeVideoV1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <LatestProjects />
      <Separator />
      <AboutMe title='About Me' />
      <TechStack />
      <Separator />
      <MyThoughts />
      

    </div>
  );
}

