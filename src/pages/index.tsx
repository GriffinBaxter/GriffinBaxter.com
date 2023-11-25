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

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center pb-8">
        <p className="py-8 text-center text-5xl font-medium">
          I’m <span className="font-bold">Griffin</span>, a{" "}
          <span className="font-bold">Full-Stack</span> Web Software Engineer
        </p>
        <p className="pb-8 text-center text-xl">
          Based in <span className="font-bold">Christchurch, New Zealand</span>
        </p>
        <Divider />
        <p className="pb-12 pt-8 text-center text-3xl font-extrabold uppercase">
          Featured Projects
        </p>
        <div className="grid grid-cols-1 gap-4 pb-8 pt-4 lg:grid-cols-2 xl:grid-cols-3">
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

      <FooterComponent />
    </>
  );
};

export default Home;
