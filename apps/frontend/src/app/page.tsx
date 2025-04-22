'use client';

import Separator from '@/components/Separator';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

import { LatestProjects } from '@/components/LatestProjects';
import { AboutMe } from '@/components/AboutMe';
import { TechStack } from '@/components/TechStack';
import { MyThoughts } from '@/components/MyThoughts';



// Fade In animation configuration
const fadeInProps = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: 'easeInOut' },
};

export default function Home() {
  return (
    <div className="flex-grow">

      {/* Hero Section */}
      <div className="relative flex-1 mt-4">
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
            Software & Game Developer
          </h2>
          <p className="mt-4 text-gray-100 text-sm sm:text-base drop-shadow-sm">
            Passionate about Unreal Engine, C++, and Web Development.
          </p>
        </section>

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

      {/* Latest Projects */}
      <motion.div {...fadeInProps}>
        <Suspense fallback={<div className="text-center">Loading Latest Projects...</div>}>
          <LatestProjects />
        </Suspense>
      </motion.div>

      <Separator />

      {/* About Me */}
      <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
        <Suspense fallback={<div className="text-center">Loading About Me...</div>}>
          <AboutMe title="About Me" />
        </Suspense>
      </motion.div>

      {/* Tech Stack */}
      <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.3 }}>
        <Suspense fallback={<div className="text-center">Loading Tech Stack...</div>}>
          <TechStack />
        </Suspense>
      </motion.div>

      <Separator />

      {/* My Thoughts */}
      <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
        <Suspense fallback={<div className="text-center">Loading Blog Posts...</div>}>
          <MyThoughts />
        </Suspense>
      </motion.div>
    </div>
  );
}
