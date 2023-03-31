import { Outfit } from 'next/font/google'
import Image from 'next/image'
import ExmploImg from '../../images/slide-3.jpg'



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
    <div>
      <Image src={ExmploImg} alt="Exemplo" />
      <section>
        <h1 className={outfit.className}>{data.projectName}</h1>
        <p>{data.projectDescription}</p>
        <a href={`/projects/${data.projectId}`}>More</a>
      </section>
    </div>
  )
}