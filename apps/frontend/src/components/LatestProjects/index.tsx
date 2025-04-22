import Link from 'next/link'
import { Outfit } from 'next/font/google'

import { data } from "@/services/data";
import { SearchButton } from "../SearchButton";

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})



export function LatestProjects() {
    return (

        <section id="projects" className="mt-20">
            <h3 className={`${outfit.className} text-center text-4xl my-12 text-purple-500 font-bold`}>Latest Projects</h3>


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


            <SearchButton href="/projects" title="Explore My Projects" />

        </section>
    );
}

