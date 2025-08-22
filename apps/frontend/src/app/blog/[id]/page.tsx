'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useBlogById } from '@/services/apiCalls';

export default function BlogPage() {
  
  const pathname = usePathname();
  const blogId = pathname.replace('/blog/', '');
  const blog = useBlogById(blogId);
  const [mainImage, setMainImage] = useState<any>();
  
  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center h-[40vh]">
          <p>Loading Blog...</p>
        </div>
      )
      
    }

  
  



  return (
    <main className="mt-4 flex flex-col items-center">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 w-full text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="text-lg opacity-80">
            
          </p>
        </div>
      </section>

      {/* Main Image + Thumbnails */}
      <div className="max-w-5xl w-full px-4 mt-10">
        <div className="flex justify-center">
          <img
            className="h-auto w-full rounded-xl object-cover object-center max-h-[500px] transition-all duration-500"
            src={blog.thumbnail}
            alt={blog.title}
          />
        </div>

        
          <div className="grid grid-cols-5 gap-4 mt-6">
            {blog.photos.map((photo) => (
              <div key={photo.id} className="group relative">
                <img
                  onClick={() => setMainImage(photo.url)}
                  src={photo.url}
                  className="object-cover object-center h-24 w-full rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  alt={`gallery-${photo.title}`}
                />
              </div>
            ))}
          </div>
      </div>

      {/* Blog Content Sections */}
      <div className="max-w-4xl w-full px-4 mt-14 space-y-12 text-gray-800">

        {blog?.description && (
          // <section>
          //   <img
          //   className="h-auto w-full rounded-xl object-cover object-center max-h-[500px] transition-all duration-500"
          //   src={blog?.photos[2].url}
          //   alt="main-hero"
          // />
            <p className="text-lg leading-relaxed">{blog.description}</p>
          // </section>
        )}

        {blog?.description2 && (
          <section>
            {/* <h2 className="text-2xl font-bold mb-2">🖼️ Photo 2</h2> */}
            <p className="text-lg leading-relaxed">{blog.description2}</p>
          </section>
        )}

        {blog?.description3 && (
          <section>
            {/* <h2 className="text-2xl font-bold mb-2">🖼️ Photo 3</h2> */}
            <p className="text-lg leading-relaxed">{blog.description3}</p>
          </section>
        )}

        {blog?.description4 && (
          <section>
            {/* <h2 className="text-2xl font-bold mb-2">🖼️ Photo 4</h2> */}
            <p className="text-lg leading-relaxed">{blog.description4}</p>
          </section>
        )}

        {blog?.description5 && (
          <section>
            {/* <h2 className="text-2xl font-bold mb-2">🖼️ Photo 5</h2> */}
            <p className="text-lg leading-relaxed">{blog.description5}</p>
          </section>
        )}

        <p>
          <a 
            href="https://github.com/felipeact" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline"
          >
            Visit my GitHub profile
          </a>
        </p>
        
      </div>
    </main>
  );
}
