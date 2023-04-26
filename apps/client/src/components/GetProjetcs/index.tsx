import { Outfit } from 'next/font/google'
import Image from 'next/image'
import ExmploImg from '../../images/slide-3.jpg'
import Link from 'next/link'




const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

interface GetProjectsProps {
  data: {
    imageUrl?: string,
    projectId: string,
    projectName: string,
    projectDescription: string,
  }
}

export function GetProjects( { data }: GetProjectsProps ) {
  return (
      <div className='bg-gray-900 mb-4 rounded-lg'>
        <Link href={`/projects/${data.projectId}`}>
          <Image className="rounded-l-lg w-full" loading='lazy' src={ExmploImg} alt="Exemplo" />
          <section className='p-4 w-3/6 rounded-r-lg flex flex-col justify-around' >
            <h1 className={`${outfit.className} font-bold text-xl`}>{data.projectName}</h1>
            <p>{data.projectDescription}</p>
          </section>
        </Link>
      </div>
  )
}