import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import FooterComponent from "../components/footer";
import projectsJson from "../data/projects.json";

const featuredProjectSlugs = ["codewof", "reusability", "griffinbaxter-com", "video-speed-keys", "events-app", "guess-it"];

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Griffin Baxter</title>
                <meta name="description" content="Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.Home} />

            <main className="container mx-auto flex flex-col justify-center max-w-[1200px]">
                <p className="text-3xl text-center py-8">
                    Full-Stack Web Software Engineer in Christchurch, New Zealand
                </p>
                <Divider />
                <p className="text-5xl font-bold py-8">Featured Projects</p>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">{featuredProjectSlugs.map(slug => projectsJson.find((project) => project.slug === slug)).filter(Boolean).map(project => project ? (
                        <div key={project.slug} className="max-w-sm">
                            <ProjectCard projectObject={project} />
                        </div>
                    ) : null)}</div>
            </main>

            <FooterComponent />
        </>
    );
};

export default Home;
