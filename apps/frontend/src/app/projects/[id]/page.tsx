'use client'
import { usePathname } from "next/navigation";
import { useProjectById } from "@/services/apiCalls";





export default function ProjectPage() {

  const pathname = usePathname();
  const projectId = pathname.replace('/projects/', '');
  const project = useProjectById(projectId);

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <p>Loading Game...</p>
      </div>
    )

  }

  return (
    <div className="flex flex-col justify-center flex-grow">
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
            src={project.thumbnail}
            type="video/mp4"
          />
        </video>
      </div>

      <div className=" block w-full  mx-auto  mt-[2rem] mb-10">
        {/* Date */}
        <p className="text-gray-500 text-sm sm:text-base">
          Published on: {new Date(project.createdAt || Date.now()).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(project.tags || ["Unreal Engine", "Multiplayer", "Pixel Streaming"]).map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Engine */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            className="bg-yellow-100 text-black-800 text-xs font-medium px-3 py-1 rounded-full"
          >
            {project.engine}
          </span>

        </div>
      </div>

      {/* Game Demo */}
      <section className="mt-[2rem] mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🎮 Game Demo</h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          This video demonstrates the core gameplay loop, including movement mechanics, user interface interactions, and basic combat elements. It was built using Unreal Engine and showcases early gameplay features.
        </p>
      </section>

      <section className="mt-[2rem] mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🎓 What I Learned</h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {project.description}
        </p>

        <p dangerouslySetInnerHTML={{ __html: `${project.description3}`}} />
      </section>



      {/* Try It Out */}
      <section className="mt-[2rem] hidden xl:block">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🚀 Try it Out</h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Play the game directly in your browser using Pixel Streaming. No downloads required!
        </p>
        <div className=" mt-[1rem] aspect-video w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://your-pixelstreaming-domain.com"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; gamepad;"
            allowFullScreen
          />
        </div>
      </section>

      <a
        href="https://your-pixelstreaming-domain.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden xl:inline-block bg-green-600 w-[12rem] mt-[1rem] text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors"
      >
        Launch in New Tab
      </a>


    </div>
  );
}