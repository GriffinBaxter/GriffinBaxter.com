import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ProjectCard from "../components/post/project/project-card";
import projectsJson from "../data/projects.json";
import Divider from "../components/divider";
import { languageBadgeColour } from "./[postSlug]";
import { useState } from "react";

const Projects: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const categories = [
    ...new Map(
      projectsJson
        .flatMap((project) => project.categories.nodes)
        .map((item) => [item.slug, item]),
    ).values(),
  ]
    .filter((category) => category.slug !== "projects")
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <>
      <Head>
        <title>Projects - Griffin Baxter</title>
        <meta name="description" content="Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.SoftwareProjects} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-bold sm:text-5xl">
          Projects
        </p>
        <Divider />
        <div className="py-8">
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`badge badge-lg ${
                languageBadgeColour[category.slug]
              } m-1 ${
                selectedCategory && selectedCategory !== category.slug
                  ? "opacity-25"
                  : null
              }`}
              onClick={() =>
                selectedCategory === category.slug
                  ? setSelectedCategory(undefined)
                  : setSelectedCategory(category.slug)
              }
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsJson
            .filter((project) =>
              selectedCategory
                ? project.categories.nodes.find(
                    (category) => category.slug === selectedCategory,
                  )
                : true,
            )
            .map((project) => (
              <div key={project.slug} className="max-w-sm">
                <ProjectCard projectObject={project} />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Projects;
