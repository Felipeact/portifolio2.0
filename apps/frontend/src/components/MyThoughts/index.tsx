'use client'
import Image from "next/image";
import { format } from 'date-fns';
import { Outfit } from 'next/font/google'

import { MoreButton } from "../MoreButton";
import { SearchButton } from "../SearchButton";
import { useLatestBlogs } from "@/services/apiCalls";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})



export function MyThoughts() {
  const blog = useLatestBlogs();

  const getShortDescription = (desc: string) => {
    const halfLength = Math.floor(desc.length / 2);
    return desc.length > 20 ? desc.slice(0, halfLength) + '...' : desc;
  };


  return (
    <div>

      <section className="text-center mt-16">
        <h2 className={`${outfit.className} text-center text-4xl my-12 text-purple-500 font-bold`}> My Thoughts </h2>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">

        {blog?.map(index => (

          <div className="bg-white shadow-md rounded-lg p-4 flex " key={index.id}>
            <div>
              <Image
                src={index.thumbnail}
                alt={index.title}
                width={500}
                height={500}
                className="w-full h-[20rem] object-fit rounded-md"
              />
              <h4 className="text-xl font-semibold mt-4">{index.title}</h4>
              <p className="text-gray-600">{getShortDescription(index.description)}</p>
              <div className="flex flex-wrap mt-2">
              {index.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

              <div className="flex items-center justify-between">

                <MoreButton projectId={index.id} title="Read More" />

                <div className="flex gap-2 items-center self-end text-sm mb-[9px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" style={ { fill: "transparent !important"}} />
                  </svg>

                  <p className="text-gray-500"> {format(new Date(index.createdAt), 'PPP')} </p>
                </div>
              </div>
            </div>


          </div>
        ))}


      </div>


      <SearchButton href="/blog" title="Explore My Blog" />

    </div>
  );
}