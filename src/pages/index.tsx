import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import projectsJson from "../data/projects.json";

const featuredProjectSlugs = [
  "codewof",
  "reusability",
  "griffinbaxter-com",
  "video-speed-keys",
  "events-app",
  "guess-it",
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Griffin Baxter</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.Home} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-medium sm:text-5xl">
          I’m <span className="font-bold">Griffin</span>, a{" "}
          <span className="font-bold">Full-Stack</span> Web Software Engineer
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
                  <ProjectCard projectObject={project} />
                </div>
              ) : null,
            )}
        </div>
      </main>
    </>
  );
};

export default Home;
