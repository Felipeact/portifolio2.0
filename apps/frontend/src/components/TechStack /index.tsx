// components/TechStack.tsx
import Image from 'next/image';

const tools = [
  {
    name: 'Unreal Engine',
    icon: '/icons/unreal.svg', // Place this in your public/icons folder
  },
  {
    name: 'C++',
    icon: '/icons/cpp.svg',
  },
  {
    name: 'VS Code',
    icon: '/icons/vscode.svg',
  },
  {
    name: 'JavaScript',
    icon: '/icons/javascript.svg',
  },
  {
    name: 'TypeScript',
    icon: '/icons/typescript.svg',
  },
  {
    name: 'Node.js',
    icon: '/icons/nodejs.svg',
  },
  {
    name: 'React',
    icon: '/icons/react.svg',
  },
];

export function TechStack ()  {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6">Tech Stack</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-center items-center">
          {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center">
              <Image
                src={tool.icon}
                alt={tool.name}
                width={64}
                height={64}
                className="mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
