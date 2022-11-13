import {Badge, Card} from "flowbite-react";
import { type NextPage } from "next";

export enum Language {
    C_CPlusPlus,
    HTML_CSS,
    Java,
    JavaScript_TypeScript,
    Python,
    SQL,
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
    projectName: string,
    projectDate: string,
    projectLanguages: Language[],
}

const ProjectCard: NextPage<Props> = ({projectName: name, projectDate: date, projectLanguages: languages}) => {
    return (
        <Card
            imgSrc="/logo.png"
            imgAlt="Image"
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {date}
            </h6>
            <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                    <Badge key={language} color={languageMap[language].badgeColour} size="sm">
                        {languageMap[language].name}
                    </Badge>
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard
