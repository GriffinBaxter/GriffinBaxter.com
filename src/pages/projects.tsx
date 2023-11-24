import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ProjectCard from "../components/post/project/project-card";
import FooterComponent from "../components/footer";
import projectsJson from "../data/projects.json";
import Divider from "../components/divider";

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>Software Projects - Griffin Baxter</title>
        <meta name="description" content="Software Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.SoftwareProjects} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center">
        <p className="py-8 text-center text-5xl font-bold">Software Projects</p>
        <p className="pb-8 text-center text-xl">
          In <span className="font-bold">reverse chronological</span> order
        </p>
        <Divider />
        <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsJson.map((project) => (
            <div key={project.slug} className="max-w-sm">
              <ProjectCard projectObject={project} />
            </div>
          ))}
        </div>
      </main>

      <FooterComponent />
    </>
  );
};

export default Projects;
