import { type Post } from "@prisma/client";
import {Badge, Card} from "flowbite-react";
import { type NextPage } from "next";
import {languageMap, type ProjectExtra} from "./project-page";

interface Props {
    projectObject: Partial<Post>
}

const ProjectCard: NextPage<Props> = ({projectObject: project}) => {
    const extra = project.extra as unknown as ProjectExtra

    return (
        <Card
            imgSrc={`/images/posts/${project.slug}/main.png`}
            imgAlt="Project Image"
            href={project.slug}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.title}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.subtitle}
            </h6>
            <div className="flex flex-wrap gap-2">
                {extra.languages.map((language) => (
                    <Badge key={language} color={languageMap[language].badgeColour} size="sm">
                        {languageMap[language].name}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard
