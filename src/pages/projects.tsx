import type {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import ProjectCard from "../components/post/project/project-card";
import {getProjects} from "../server/wpgraphql/api";
import type {Project} from "../server/wpgraphql/models";

interface Props {
    projects: Project[]
}

const Projects: NextPage<Props> = ({ projects }) => {
    return (
        <>
            <Head>
                <title>Software Projects - Griffin Baxter</title>
                <meta name="description" content="Software Projects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.SoftwareProjects}/>

            <main className="container mx-auto flex flex-col items-center justify-center p-4">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{projects?.map(project => (
                    <div key={project.slug} className="max-w-sm">
                        <ProjectCard projectObject={project}/>
                    </div>
                ))}</div>
            </main>
        </>
    );
};

export default Projects;

export const getStaticProps: GetStaticProps = async () => {
    const projects = await getProjects()
    return {
        props: {
            projects,
        },
    }
}
