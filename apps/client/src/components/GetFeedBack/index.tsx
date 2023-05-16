import Image from "next/image";

import LogoImg from '../../../public/logo.png'

interface GetFeedbackProps {
  data: {
    id: string
    name: string
    company: string
    description: string
  }
}

export function GetFeedBack( { data }: GetFeedbackProps) {
  return (
    <div className="bg-gray-700 p-8 rounded-lg w-[90%] md:w-[60%]">
      <div className="flex gap-6 mb-6">
        <Image src={LogoImg} alt="logo" className=" rounded-full w-16 h-16" />
        <div>
          <p className="mb-2">{data.name}</p>
          <span className="text-gray-400"> {data.company == ""? 'Worked with Felipe before' : data.company}</span>
        </div>
      </div>

      <p>{data.description}</p>
    </div>
  )
}