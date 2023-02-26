import {Badge} from "flowbite-react";
import { type NextPage } from "next";
import type { Project } from "../../../server/wpgraphql/models";
import {languageBadgeColour} from "../../../pages/[postSlug]";
import Image from "next/image";
import Link from "next/link";

interface Props {
    projectObject: Project
}

const ProjectCard: NextPage<Props> = ({projectObject: project}) => {
    return (
        <Link href={project.slug}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><Image src={project.featuredImage.node.sourceUrl} alt="Project Image" width={384} height={216}/></figure>
                <div className="card-body">
                    <h2 className="card-title">{project.title}</h2>
                    <p className="font-semibold">{project.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.categories.nodes.map((category) => (
                            (Object.keys(languageBadgeColour).includes(category.slug)) ?
                                <Badge key={category.slug} color={languageBadgeColour[category.slug]} size="sm">
                                    {category.name}
                                </Badge> : null
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
