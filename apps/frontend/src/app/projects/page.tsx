'use client'
import { useState } from "react";
import Link from "next/link";
import { Outfit } from 'next/font/google'



import { data } from "@/services/data";
import Separator from "@/components/Separator";
import Image from "next/image";

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})


export default function Projects() {
    const [filter, setFilter] = useState(false);


    return (
        <section id="projects" className="mt-20">


            <h3 className={`${outfit.className} text-center text-4xl my-12 text-purple-500 font-bold`}> Projects </h3>

            <div className="flex flex-col items-end w-[92%]" >

                <button
                    onClick={() => setFilter(!filter)}
                    defaultValue=""
                    className="bg-white flex p-4 rounded-md font-bold "
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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-8">
                {data.projects.map((project) => (

                    <div
                        key={project.id}
                        className=" relative bg-white shadow-md rounded-lg w-[90%] group overflow-hidden max-h-[300px] hover:max-h-[500px] transition-all duration-500 ease-in-out"
                    >
                        <Link href={`/projects/${project.title}`}>

                            <video
                                className="w-full h-full object-cover"
                                muted
                                loop
                                autoPlay
                                playsInline

                            >
                                <source src="https://upload-images-projects.s3.amazonaws.com/HomeVideoV1.mp4" type="video/mp4" />
                            </video>

                            {/* Title overlay at bottom of video */}
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 px-4 py-2">
                                <h4 className="text-white text-lg font-semibold group-hover:hidden">{project.title}</h4>
                            </div>

                            {/* Description and button - hidden until hover */}
                            <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="mb-4">{project.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>



        </section>
    );
}

