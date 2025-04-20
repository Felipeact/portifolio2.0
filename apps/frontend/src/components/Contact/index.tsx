import Image from "next/image";
import Link from "next/link";

export function Contact() {
  return (
    <footer className="bg-white text-black text-xl mt-20">
      <div className=" mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Image
              className=""
              src="/logoDesign.svg" // replace with your logo path
              alt="Logo"
              width={73}
              height={73}
            />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            <div>
              <h4 className="font-semibold mb-2 ">Contact</h4>
              <p>Email: <Link href="mailto:felipetiburcioviana@gmail.com" className="text-blue-600 block overflow-hidden text-clip">felipetiburcioviana@gmail.com</Link></p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Social</h4>
              <p><Link href="https://linkedin.com/in/felipe-viana" target="_blank" className="text-black">LinkedIn</Link></p>
              <p><Link href="https://github.com/felipeact" target="_blank" className="text-black">GitHub</Link></p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <p><Link href="/resume.pdf" className="text-black">Resume</Link></p>
              <p><Link href="/projects" className="text-black">Projects</Link></p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">More</h4>
              <p><Link href="/#about" className="text-black">About Me</Link></p>
              <p><Link href="/#contact" className="text-black">Contact Page</Link></p>
            </div>
          </div>
        </div>

        {/* Language Selector + Bottom Text */}
        <div className="mt-16 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-6">
          {/* <div className="flex items-center gap-2 mb-16 sm:mb-0">
            <span className="text-xl">🌐 Language:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option selected>Canada</option>
              <option>United States</option>
              <option>Brazil</option>
              <option>France</option>
            </select>
          </div> */}
          <div className="text-xl text-black text-center text-xs sm:text-right">
            © {new Date().getFullYear()} Felipe Viana. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
