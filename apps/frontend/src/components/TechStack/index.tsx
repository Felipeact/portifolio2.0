import UnrealIcon from 'public/icons/unreal.svg';
import CppIcon from 'public/icons/cpp.svg';
import VscodeIcon from 'public/icons/vscode.svg';
import JavascriptIcon from 'public/icons/javascript.svg';
import TypescriptIcon from 'public/icons/typescript.svg';
import NodejsIcon from 'public/icons/nodejs.svg';
import ReactIcon from 'public/icons/react.svg';

const tools = [
  { name: 'Unreal Engine', icon: UnrealIcon },
  { name: 'C++', icon: CppIcon },
  { name: 'VS Code', icon: VscodeIcon },
  { name: 'JavaScript', icon: JavascriptIcon },
  { name: 'TypeScript', icon: TypescriptIcon },
  { name: 'Node.js', icon: NodejsIcon },
  { name: 'React', icon: ReactIcon },
];

export function TechStack() {
  return (
    <section className="py-12 bg-gray-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-[6rem] text-purple-500">Tech Stack</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-center items-center">
          {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center">
              <tool.icon className="w-16 h-16 mb-6 text-gray-500 hover:text-black" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
