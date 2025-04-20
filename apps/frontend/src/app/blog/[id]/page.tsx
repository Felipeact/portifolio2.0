'use client'
import { useState } from 'react'

export default function BlogPage() {
  const [mainImage, setMainImage] = useState<string>(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  );

  return (
    <main className="mt-4">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Creating a Dynamic HUD in Unreal Engine Using UMG
          </h1>
          <p className="text-lg">
            Beginner-friendly guide to building a responsive health, energy, and ammo HUD with Blueprints
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <div className="grid gap-4 mt-8">
        <div className="flex justify-center">
          <img
            className="h-auto w-[80%] max-w-full rounded-lg object-cover object-center md:h-[480px]"
            src={mainImage}
            alt="main-hero"
          />
        </div>

        <div className="grid grid-cols-5 gap-4 w-[50%] justify-self-center">
          {[
            "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2762&q=80",
            "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
          ].map((url, index) => (
            <div key={index}>
              <img
                onClick={() => setMainImage(url)}
                src={url}
                className="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
                alt={`gallery-${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      <section>
        
      </section>
    </main>
  );
}
