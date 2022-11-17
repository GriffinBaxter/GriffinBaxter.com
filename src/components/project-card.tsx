import { type posts } from "@prisma/client";
import {Badge, Card} from "flowbite-react";
import { type NextPage } from "next";

enum Language {
    C_CPlusPlus = 0,
    HTML_CSS = 1,
    Java = 2,
    JavaScript_TypeScript = 3,
    Python = 4,
    SQL = 5,
}

interface LanguageData {
    name: string,
    badgeColour: string,
}

const languageMap: Record<Language, LanguageData> = {
    [Language.C_CPlusPlus]: {name: "C / C++", badgeColour: "purple"},
    [Language.HTML_CSS]: {name: "HTML / CSS", badgeColour: "pink"},
    [Language.Java]: {name: "Java", badgeColour: "failure"},
    [Language.JavaScript_TypeScript]: {name: "JavaScript / TypeScript", badgeColour: "warning"},
    [Language.Python]: {name: "Python", badgeColour: "info"},
    [Language.SQL]: {name: "SQL", badgeColour: "success"},
}

interface Props {
    projectObject: posts
}

const ProjectCard: NextPage<Props> = ({projectObject: project}) => {
    const languages = project.languages as Language[]

    return (
        <Card
            imgSrc="/placeholder.jpg"
            imgAlt="Image"
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.title}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.subtitle}
            </h6>
            <div className="flex flex-wrap gap-2">
                {languages?.map((language) => (
                    <Badge key={language} color={languageMap[language].badgeColour} size="sm">
                        {languageMap[language].name}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard
