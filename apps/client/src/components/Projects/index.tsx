import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fetchEntries } from '../../services/contentful';
import Link from 'next/link';
import { Video } from '../../types/types';


interface ProjectsProps {
    title: string;
}



export default function Projects({ title }: ProjectsProps) {
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [entries, setEntries] = useState<Video[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    console.log(entries)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: any = await fetchEntries();
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchData();

        // Animation every 2 minutes
        const intervalId = setInterval(() => {
            setShouldAnimate(true);
        }, 120000); // 2 minutes in milliseconds

        // Cleanup
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    // Your animation variants
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2
            }
        }
    };


    const handleVideoEnd = () => {
        // Restart the video
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const item = {
        hidden: {
            y: 0,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div>
            {/* Projects  */}
            <div>
                {/* Title */}
                <h2 className="text-center text-4xl my-12 text-purple-500">{title}</h2>

                {/* Description */}
                <p className='text-xl text-center p-4'>
                    Welcome to my world! where innovation meets inspiration, and every line of code is a step closer to unlocking the next level of interactive storytelling.
                </p>

                <motion.ul
                    className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
                    variants={container}
                    initial="hidden"
                    animate={shouldAnimate ? 'visible' : 'hidden'} // Animate initially and every 2 minutes
                >
                    {entries.map((index) => (
                        <Link href={`projects/${index.sys.id}`} key={index.fields.title} className='hover:border-solid hover:border-2 hover:border-purple-500'>
                            <motion.li key={index.fields.title} className="item bg-white rounded-md w-full" variants={item}>
                                <div className='w-full h-full'>
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full"
                                        title={index.fields.title}
                                        autoPlay
                                        muted  // Ensure video is muted for autoplay
                                        onEnded={handleVideoEnd} //
                                    >
                                        <source src={index.fields.videoUrl.fields.file.url} type={index.fields.videoUrl.fields.file.contentType} />
                                    </video>
                                </div>
                            </motion.li>
                        </Link>
                    ))}
                </motion.ul>
            </div>
        </div>
    )
}
