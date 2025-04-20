import Link from "next/link";

interface SearchButtonProps {
    title: string,
    href: string
}


export function SearchButton({ title, href }: SearchButtonProps) {
    return (

        <button className="bg-white flex items-center justify-center  mt-[6rem] mx-auto p-4 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 font-bold">
            <Link href={href} className="flex items-center justify-center gap-2">
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </Link>
        </button>


    );
}