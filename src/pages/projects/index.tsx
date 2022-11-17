import {type NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../../components/navbar";
import ProjectCard from "../../components/project-card";
import {trpc} from "../../utils/trpc";
import {Spinner} from "flowbite-react";

const Projects: NextPage = () => {
    const projects = trpc.posts.getAllProjects.useQuery();

    return (
        <>
            <Head>
                <title>Software Projects - Griffin Baxter</title>
                <meta name="description" content="Software Projects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.SoftwareProjects}/>

            <main className="container mx-auto flex flex-col items-center justify-center p-4">
                {projects.data ?
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{projects.data.map(project => (
                        <div key={project.id} className="max-w-sm">
                            <ProjectCard projectObject={project}/>
                        </div>
                    ))}</div> : <Spinner className="min-h-[380px]" size="xl" />}
            </main>
        </>
    );
};

export default Projects;
