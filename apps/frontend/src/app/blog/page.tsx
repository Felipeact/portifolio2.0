'use client'
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image'

import { data } from "@/services/data";
import Separator from "@/components/Separator";

export default function Blog() {
  const [filter, setFilter] = useState(false);

  return (
    <div>

      <section className="text-center mt-16">
        <h2 className="text-4xl font-bold">Latest Blog Posts</h2>
        <p className="mt-4 text-gray-700">Insights on game development, software engineering, and tech trends.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {data.blog.map(index => (

          <div className="bg-white shadow-md rounded-lg p-4" key={index.id}>
            <Image src="/unreal-engine.jpeg" alt="Gameplay Ability System" width={800} height={800} className="w-full h-40 object-cover rounded-md" priority />
            <h4 className="text-xl font-semibold mt-4">{index.title}</h4>
            <p className="text-gray-600">{index.description}</p>
            <Link href={`/blog/${index.id}`}>
              <p className="mt-4">Read More</p>
            </Link>
          </div>
        ))}


      </div>

      <section className="text-center mt-16">
        <h2 className="text-4xl font-bold">Blog Posts</h2>
      </section>

      <div className="flex flex-col items-end">

        <button
          onClick={() => setFilter(!filter)}
          defaultValue=""
          className="bg-white flex p-4 rounded-md font-bold mt-8"
        >
          Sort By
        </button>
        <div className={filter ? 'absolute  bg-white flex p-4 rounded-md w-[5.5rem] flex flex-col' : 'hidden'} >
          <button value="name" onClick={() => setFilter(false)} >Name</button>
          <button value="date" onClick={() => setFilter(false)} >Date</button>
          <button value="type" onClick={() => setFilter(false)}>Type</button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">

        {data.blog.map(index => (

          <div className="bg-white shadow-md rounded-lg p-4" key={index.id}>
            <Image src="/unreal-engine.jpeg" alt="Gameplay Ability System" width={500} height={500} className="w-full h-40 object-cover rounded-md" priority />
            <h4 className="text-xl font-semibold mt-4">{index.title}</h4>
            <p className="text-gray-600">{index.description}</p>
            <Link href={`/blog/${index.id}`}>
              <p className="mt-4">Read More</p>
            </Link>
          </div>
        ))}


      </div>

      <section className="mt-20 text-center">
        <h3 className="text-3xl font-bold">About the Author</h3>
        <p className="mt-4 text-gray-700">Felipe Viana - A passionate game and software developer specializing in Unreal Engine, C++, and web technologies.</p>
      </section>

      <section className="mt-20 text-center">
        <h3 className="text-3xl font-bold">Stay Connected</h3>
        <p className="mt-4">Follow me on <a href="https://linkedin.com/in/felipeviana" className="text-blue-600">LinkedIn</a> | <a href="https://github.com/felipeviana" className="text-blue-600">GitHub</a></p>
        <p>Email: <a href="mailto:felipe@example.com" className="text-blue-600">felipe@example.com</a></p>
      </section>


    </div >
  );
}

