'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

import Separator from '@/components/Separator';
import { useBlogs } from '@/services/apiCalls';
import { MoreButton } from '@/components/MoreButton';

export default function Blog() {
  const [tempFilterTags, setTempFilterTags] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allBlogs = useBlogs();

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

  const filteredBlogs = useMemo(() => {
    if (filterTags.length === 0) return allBlogs;
    return allBlogs.filter(blog =>
      blog.tags?.some((tag: string) => filterTags.includes(tag))
    );
  }, [allBlogs, filterTags]);

  const getShortDescription = (desc: string) => {
    const halfLength = Math.floor(desc.length / 2);
    return desc.length > 20 ? desc.slice(0, halfLength) + '...' : desc;
  };

  const uniqueTags = useMemo(() => {
    const tagSet = new Set<string>();
    allBlogs.forEach(blog => {
      blog.tags?.forEach((tag: string) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [allBlogs]);

  return (
    <div className="md:px-8">

      <Image src="/blog.svg" width={500} height={500} alt='My blog' className='mx-auto w-[50rem]'   />


      {/* Header and Filter Section */}
      <div className="flex justify-between">
        <section className="text-center mt-20">
          <h2 className="text-4xl font-bold">Blog Posts</h2>
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
      {filteredBlogs.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-12">
          We don&apos;t have a project with this settings.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredBlogs.map(blog => (
            <div className="bg-white shadow-md rounded-lg p-4" key={blog.id}>
              <Image
                src={blog.thumbnail}
                alt="Gameplay Ability System"
                width={500}
                height={500}
                className="w-full h-40 object-cover rounded-md"
                priority
              />
              <h4 className="text-xl font-semibold mt-4">{blog.title}</h4>
              <p className="text-gray-600">{getShortDescription(blog.description)}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <MoreButton projectId={blog.id} title="Read More" />
                <div className="flex gap-2 items-center text-sm text-gray-500 mt-[2rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  <p>{format(new Date(blog.createdAt), 'PPP')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Author Info */}
      <section className="mt-20 text-center">
        <h3 className="text-3xl font-bold">About the Author</h3>
        <p className="mt-4 text-gray-700">
          Felipe Viana - A passionate game and software developer specializing in Unreal Engine, C++, and web technologies.
        </p>
      </section>
    </div>
  );
}
