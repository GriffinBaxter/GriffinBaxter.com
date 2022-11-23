import {Badge, Card} from "flowbite-react";
import { type NextPage } from "next";
import { type Project } from "../../../lib/api";
import {languageBadgeColour} from "../../../pages/[postSlug]";

interface Props {
    projectObject: Project
}

const ProjectCard: NextPage<Props> = ({projectObject: project}) => {
    return (
        <Card
            imgSrc={project.featuredImage.node.sourceUrl}
            imgAlt="Project Image"
            href={project.slug}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.title}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.excerpt}
            </h6>
            <div className="flex flex-wrap gap-2">
                {project.categories.nodes.map((category) => (
                    (Object.keys(languageBadgeColour).includes(category.slug)) ?
                    <Badge key={category.slug} color={languageBadgeColour[category.slug]} size="sm">
                        {category.name}
                    </Badge> : null
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard
