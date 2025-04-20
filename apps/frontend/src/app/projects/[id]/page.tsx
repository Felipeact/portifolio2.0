




export default function ProjectPage({ params }: { params: { id: string } }) {
    return (
      <div className="flex items-center justify-center">
        <h1>Working on project: {params.id}</h1>
      </div>
    );
  }