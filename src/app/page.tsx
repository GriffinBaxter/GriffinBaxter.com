import Navbar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import HomeClient from "./home-client";
import Link from "next/link";
import { customMetadata } from "../components/metadata";
import { getAllProjects } from "../project-content";

export const metadata = customMetadata("Home");

const featuredProjectSlugs = [
  "codewof",
  "the-assembly-line",
  "griffinbaxter-com",
  "scaled-to-nothing",
  "video-speed-keys",
  "guess-it",
];

export default function Page() {
  const allProjects = getAllProjects();
  const featuredProjects = featuredProjectSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> =>
      Boolean(project),
    );

  return (
    <>
      <Navbar currentPage={NavigationPage.Home} />

      <main className="container mx-auto flex max-w-300 flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-medium text-balance sm:text-5xl">
          I’m <span className="font-bold">Griffin</span>, a{" "}
          <span className="font-bold">Full-Stack</span> Software Engineer
        </p>
        <p className="pb-8 text-center sm:text-xl">
          Based in <span className="font-bold">Christchurch, New Zealand</span>
        </p>
        <Divider />
        <p className="pt-8 pb-12 text-center text-2xl font-extrabold uppercase sm:text-3xl">
          Featured Projects
        </p>
        <HomeClient featuredProjects={featuredProjects} />
        <Link href="projects" className="mx-auto my-2 sm:mx-0">
          <button className="btn btn-info">View All Projects</button>
        </Link>
      </main>
    </>
  );
}
