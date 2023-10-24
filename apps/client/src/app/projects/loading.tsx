import { Outfit } from "next/font/google"


const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
})


export default function Loading() {
    return (
        <main className="min-h-screen">

            <div className="mx-auto lg:max-w-[78%]">

                <section>
                    <h1 className={`${outfit.className} text-center font-bold text-5xl mb-12 pt-20`}>Best Projects</h1>


                </section>

                <div className={`flex justify-between w-[76%]  md:w-[28rem] mb-16 mx-auto `}>
                    <p >All</p>
                    <p >Front End</p>
                    <p >Back End</p>
                    <p>Full Stack</p>
                </div>

                <div className='grid grid-rows-1 w-11/12 items-center mx-auto sm:justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                    <div className='bg-gray-900 mb-4 rounded-lg'>
                        <div className="animate-pulse">
                            <div className="rounded-l-lg bg-slate-700 h-64 w-full"></div>
                            <div className="flex flex-col p-4">
                                <div className="h-4 bg-slate-700 rounded w-16 mb-4"></div>
                                <div className="h-2 bg-slate-700 rounded w-16"></div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-900 mb-4 rounded-lg'>
                        <div className="animate-pulse">
                            <div className="rounded-l-lg bg-slate-700 h-64 w-full"></div>
                            <div className="flex flex-col p-4">
                                <div className="h-4 bg-slate-700 rounded w-16 mb-4"></div>
                                <div className="h-2 bg-slate-700 rounded w-16"></div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-900 mb-4 rounded-lg'>
                        <div className="animate-pulse">
                            <div className="rounded-l-lg bg-slate-700 h-64 w-full"></div>
                            <div className="flex flex-col p-4">
                                <div className="h-4 bg-slate-700 rounded w-16 mb-4"></div>
                                <div className="h-2 bg-slate-700 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
