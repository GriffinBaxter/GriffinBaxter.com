import type {NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import ProjectCard from "../components/post/project/project-card";
import FooterComponent from "../components/footer";
import projectsJson from "../data/projects.json";

const Projects: NextPage = () => {
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{projectsJson.map(project => (
                    <div key={project.slug} className="max-w-sm">
                        <ProjectCard projectObject={project}/>
                    </div>
                ))}</div>
            </main>

            <FooterComponent/>
        </>
    );
};

export default Projects;
