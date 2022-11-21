import { type NextPage } from "next";
import { type Post } from "@prisma/client";
import Image from 'next/image';
import PostContent, { type Content } from "../post-content";
import {Badge} from "flowbite-react";

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

export const languageMap: Record<Language, LanguageData> = {
    [Language.C_CPlusPlus]: {name: "C / C++", badgeColour: "purple"},
    [Language.HTML_CSS]: {name: "HTML / CSS", badgeColour: "pink"},
    [Language.Java]: {name: "Java", badgeColour: "failure"},
    [Language.JavaScript_TypeScript]: {name: "JavaScript / TypeScript", badgeColour: "warning"},
    [Language.Python]: {name: "Python", badgeColour: "info"},
    [Language.SQL]: {name: "SQL", badgeColour: "success"},
}

export interface ProjectExtra {
    languages: Language[]
}

interface Props {
    postObject: Partial<Post>
}

const ProjectPage: NextPage<Props> = ({postObject: project}) => {
    const content = project.content as unknown as Content
    const extra = project.extra as unknown as ProjectExtra

    return (
        <>
            <p className="text-7xl font-bold text-center pt-10">{project.title}</p>
            <p className="text-4xl text-center py-10">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2 pb-6 mx-auto">
                {extra.languages.map((language) => (
                    <Badge key={language} color={languageMap[language].badgeColour} size="sm">
                        {languageMap[language].name}
                    </Badge>
                ))}
            </div>
            <Image className="py-3 mx-auto" src={`/images/posts/${project.slug}/main.png`} alt="Main Post Image" width="1200" height="675" priority={true}></Image>
            {project.slug ? <PostContent contentObject={content} postSlug={project.slug} /> : <p></p>}
        </>
    )
}

export default ProjectPage
