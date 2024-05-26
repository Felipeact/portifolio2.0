'use client';

import { useEffect, useState } from 'react';
import { fetchEntryById } from '../../../services/contentful';
import Head from 'next/head';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Video } from '../../../types/types';
import { Footer } from '../../../components/Footer';

export default function ProjectDetails({ params: { id } }: { params: { id: string }; }) {
  const [project, setProject] = useState<Video | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data: any = await fetchEntryById(id);
          setProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };

      fetchData();
    }
  }, [id]);

  if (!project) return <div className="flex justify-center items-center h-screen text-xl text-white">Loading...</div>;

  if (!project.fields.videosDetails) return <div className="flex justify-center items-center h-screen text-xl text-white">Coming soon...</div>;

  const images = project.fields.videosDetails?.map((image) => ({
    original: image.fields.file.url,
    thumbnail: image.fields.file.url,
    originalAlt: image.fields.title,
    thumbnailAlt: image.fields.title,
  })) || []

  return (
    <>
      <Head>
        <title>{project.fields.title}</title>
        <meta name="description" content={project.fields.description} />
      </Head>

      <main className="h-[100vh] flex flex-col pt-20 mx-auto lg:max-w-[80%] ">
        <div className='flex-1'>

        <h1 className="text-5xl font-bold text-center text-purple-500 my-10">{project.fields.title}</h1>

        {project.fields.videosDetails.length > 0 && (
          <section className="w-[90%] md:w-[60%] mx-auto">
            <h2 className="text-5xl font-bold text-center text-purple-500 my-10">Gallery</h2>
            <ImageGallery items={images} showPlayButton={false} />
          </section>
        )}

        {/* {project.fields.technologies && (
          <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-500 mb-2">Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-200 pl-5 space-y-1">
          {project.fields.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
          </ul>
          </section>
        )}
        
        {project.fields.features && (
          <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-500 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-200 pl-5 space-y-1">
          {project.fields.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
          </ul>
          </section>
        )} */}

        {project.fields.videoUrl && (
          <section className="mb-8">
            <h2 className="text-5xl font-bold text-center  text-purple-500 my-10">Video Demo</h2>
            <div className="w-full mt-4">
              <video className="w-[60%] mx-auto" controls>
                <source src={project.fields.videoUrl.fields.file.url} type={project.fields.videoUrl.fields.file.contentType} />
              </video>
            </div>
          </section>
        )}
        <p className="text-lg text-gray-200 mb-8 leading-relaxed p-6 w-[90%] md:w-[60%] mx-auto" dangerouslySetInnerHTML={{ __html: project.fields.description }} />
        {/* Footer */}
        <Footer />
        </div>
      </main>
    </>
  );
}
