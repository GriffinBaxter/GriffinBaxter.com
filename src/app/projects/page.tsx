import { customMetadata } from "../../components/metadata";
import Navbar, { NavigationPage } from "../../components/navbar";
import { getAllProjects } from "../../project-content";
import Divider from "../../components/divider";
import ProjectsClient from "./projects-client";

export const metadata = customMetadata("Projects");

export default function Page() {
  const projects = getAllProjects();
  const categories = [
    ...new Map(
      projects
        .flatMap((project) => project.categories)
        .map((item) => [item.slug, item]),
    ).values(),
  ]
    .filter((category) => category.slug !== "projects")
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <>
      <Navbar currentPage={NavigationPage.Projects} />

      <main className="container mx-auto flex max-w-300 flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-bold sm:text-5xl">
          Projects
        </p>
        <Divider />
        <ProjectsClient categories={categories} projects={projects} />
      </main>
    </>
  );
}
