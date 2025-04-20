import Link from "next/link";
import Image from 'next/image'
import { Outfit } from 'next/font/google'

import { motion } from 'framer-motion';

import MyPhoto from "../../../public/myphoto.png"



const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})

interface AboutMeProps {
    title: string;
 
}

export function AboutMe({ title }: AboutMeProps) {

    return (
        <>
            {/* About me */}
            <div className=' mt-[6rem] lg:flex lg:flex-wrap lg:content-center'>
                {/* Title and Introduction */}
                <div className='lg:w-[46%]'>
                    {/* Title */}
                    <h2 className={`${outfit.className} text-center text-4xl my-12 text-purple-500 font-bold`}>{title}</h2>

                    {/* Short Introduction  */}
                    <p className='p-4 text-xl text-center'>
                        I'm Felipe Viana, a passionate gameplay programmer with a relentless drive to craft immersive and captivating gaming experiences.
                        With a fervent love for both technology and creativity, I thrive in the dynamic world where code meets artistry,
                        bringing virtual worlds to life one line at a time.
                    </p>

                    <Link href="/blog" className="block bg-black text-white font-bold p-6 rounded-full w-2/4 my-8 mx-auto bg-[url(../../public/giphy.gif)] animate-bounce text-center">
                        My Blog
                    </Link>
                    
                </div>

                {/* My Image */}
                <motion.div
                    className=" md:w-96 md:h-96 mx-auto my-4 rounded-full shadow-md overflow-hidden "
                   
                >
                    <Image src={MyPhoto} width={0} height={0} alt="Studying Img" className=" w-full object-cover h-auto z-0" />
                </motion.div>

                {/* mMore about me */}
                <div className='p-4'>

                    <p className='text-xl text-center'>
                        Driven by a profound fascination for interactive storytelling and game mechanics,
                        I've embarked on a journey to master the craft of gameplay programming.
                        With a keen eye for detail and a dedication to pushing the boundaries of what's possible,
                        I constantly seek to innovate and elevate gameplay experiences to new heights.
                    </p>

                    <p className='text-xl text-center p-4'>
                        In every project I undertake, my goal is clear: to create experiences that not only entertain but resonate,
                        leaving players with memories that linger long after they've put down the controller.
                        Join me on this journey as we delve into the boundless realms of possibility, where imagination knows no bounds and gameplay knows no limits.
                    </p>

                </div>
            </div>
        </>
    )
}

