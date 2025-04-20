import Link from "next/link";
import { Outfit } from 'next/font/google'


const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})

interface MoreProps {
    title: string,
    projectId : string
}


export function MoreButton( {title, projectId } : MoreProps ) {
    return (


        <Link href={`/blog/${projectId}`}>
            <div className="flex items-center space-x-2 mt-8">
                <button className="relative flex w-36  items-center border-2 border-solid border-black p-2 rounded-full hover:bg-[url(../../public/matrix-animation.gif)] hover:text-white hover:font-bold transition delay-150 duration-300 ease-in-out">
                    <span className="absolute left-3 w-4 h-4 bg-black object-fit rounded-full border-2 border-black-800"></span>
                    <span className="ml-6">{title}</span>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </Link>

    );
}

