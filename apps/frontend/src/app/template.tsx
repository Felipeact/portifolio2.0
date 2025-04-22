import { Contact } from "@/components/Contact";
import { Header } from "../components/Header";



export default function Template({ children }: {
  children: React.ReactNode
}) {

  
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 scroll-smooth flex flex-col">
        <Header />
        {children}
        <Contact />
    </div>
  );
}
