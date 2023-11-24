import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import FooterComponent from "../components/footer";
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

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center">
        <p className="py-8 text-center text-3xl">
          Full-Stack Web Software Engineer in Christchurch, New Zealand
        </p>
        <Divider />
        <p className="py-8 text-5xl font-bold">Featured Projects</p>
        <div className="grid grid-cols-1 gap-4 pb-8 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjectSlugs
            .map((slug) =>
              projectsJson.find((project) => project.slug === slug),
            )
            .filter(Boolean)
            .map((project) =>
              project ? (
                <div key={project.slug} className="max-w-sm">
                  <ProjectCard projectObject={project} />
                </div>
              ) : null,
            )}
        </div>
      </main>

      <FooterComponent />
    </>
  );
};

export default Home;
