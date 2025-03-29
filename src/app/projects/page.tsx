import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import projectsJson from "../../data/projects.json";
import Divider from "../../components/divider";
import ProjectsClient from "./projects-client";

export const metadata = customMetadata("Projects");

export default function Page() {
  const categories = [
    ...new Map(
      projectsJson
        .flatMap((project) => project.categories)
        .map((item) => [item.slug, item]),
    ).values(),
  ]
    .filter((category) => category.slug !== "projects")
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <>
      <Navbar currentPage={NavigationPage.Projects} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-bold sm:text-5xl">
          Projects
        </p>
        <Divider />
        <ProjectsClient categories={categories} />
      </main>
    </>
  );
}
