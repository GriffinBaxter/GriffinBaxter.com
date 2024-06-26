import type { Project } from "../../../models";
import { languageBadgeColour } from "../post-header";
import Image from "next/image";
import Link from "next/link";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={project.slug}>
      <div className="card max-w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={`/images/${project.featuredImage.node.sourceUrl}`}
            alt="Project Image"
            width={384}
            height={216}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{project.title}</h2>
          <p className="font-semibold">{project.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {project.categories.nodes.map((category) =>
              Object.keys(languageBadgeColour).includes(category.slug) ? (
                <div
                  key={category.slug}
                  className={`badge ${languageBadgeColour[category.slug] as string}`}
                >
                  {category.name}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
