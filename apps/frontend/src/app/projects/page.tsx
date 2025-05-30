'use client'
import { useMemo, useState } from "react";
import Link from "next/link";
import { Outfit } from 'next/font/google'



import Separator from "@/components/Separator";
import { AnimatePresence, motion } from "framer-motion";
import { useProjects } from "@/services/apiCalls";

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})


export default function Projects() {
    const [tempFilterTags, setTempFilterTags] = useState<string[]>([]);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const allProjects = useProjects();
    
    

    const toggleTag = (tag: string) => {
        setTempFilterTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const applyFilters = () => {
        setFilterTags(tempFilterTags);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setTempFilterTags([]);
    };

    const filteredProjects = useMemo(() => {
        if (filterTags.length === 0) return allProjects;
        return allProjects.filter(project =>
            project.tags?.some((tag: string) => filterTags.includes(tag))
        );
    }, [allProjects, filterTags]);

    const getShortDescription = (desc: string) => {
        const halfLength = Math.floor(desc.length / 2);
        return desc.length > 20 ? desc.slice(0, halfLength) + '...' : desc;
    };

    const uniqueTags = useMemo(() => {
        const tagSet = new Set<string>();
        allProjects.forEach(project => {
            project.tags?.forEach((tag: string) => tagSet.add(tag));
        });
        return Array.from(tagSet);
    }, [allProjects]);


    return (
        <section id="projects" className="mt-20 flex-grow">


            {/* Header and Filter Section */}
            <div className="flex justify-between">
                <section className="text-center mt-20">
                    <h2 className="text-4xl font-bold">Projects</h2>
                </section>

                {/* Filter Dropdown */}
                <div className="flex justify-center mt-8 relative z-20">
                    <button
                        onClick={() => setShowFilters(prev => !prev)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition h-[38px] self-end"
                    >
                        Sort by
                    </button>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md p-4 shadow-md w-72"
                            >
                                <div className="mb-2 font-semibold text-gray-700">Filter by Tag:</div>
                                {uniqueTags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2 py-1 text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={tempFilterTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                            className="accent-blue-600"
                                        />
                                        {tag}
                                    </label>
                                ))}

                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={applyFilters}
                                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Apply Changes
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Separator />

            {/* Filtered Blog Grid */}
            {filteredProjects.length <= 0 ? (
                <div className="text-center text-lg text-gray-500 mt-12">
                    We don&apos;t have a project with this settings.
                </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-8">
                    {filteredProjects.map((project) => (

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
                                    <source src={project.thumbnail} type="video/mp4" />
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
            )}

        </section>
    );
}

