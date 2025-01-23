import type { Metadata } from "next";
import Navbar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import projectsJson from "../data/projects.json";

const featuredProjectSlugs = [
  "codewof",
  "the-assembly-line",
  "griffinbaxter-com",
  "scaled-to-nothing",
  "video-speed-keys",
  "guess-it",
];

export const customMetadata = (
  name: string | undefined,
): Metadata | undefined => {
  if (name) {
    return {
      title: name === "Home" ? "Griffin Baxter" : `${name} - Griffin Baxter`,
      description: name,
      icons: "/favicon.ico",
    };
  }
};

export const metadata = customMetadata("Home");

export default function Page() {
  return (
    <>
      <Navbar currentPage={NavigationPage.Home} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="text-balance py-8 text-center text-3xl font-medium sm:text-5xl">
          I’m <span className="font-bold">Griffin</span>, a{" "}
          <span className="font-bold">Full-Stack</span> Web/Mobile Software
          Engineer
        </p>
        <p className="text-md pb-8 text-center sm:text-xl">
          Based in <span className="font-bold">Christchurch, New Zealand</span>
        </p>
        <Divider />
        <p className="pb-12 pt-8 text-center text-2xl font-extrabold uppercase sm:text-3xl">
          Featured Projects
        </p>
        <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjectSlugs
            .map((slug) =>
              projectsJson.find((project) => project.slug === slug),
            )
            .map((project) =>
              project ? (
                <div key={project.slug} className="max-w-sm">
                  <ProjectCard postDetails={project} />
                </div>
              ) : null,
            )}
        </div>
      </main>
    </>
  );
}
