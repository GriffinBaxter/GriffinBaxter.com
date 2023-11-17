import type {NextPage} from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import ReviewCard from "../components/post/review/review-card";
import FooterComponent from "../components/footer";
import projectsJson from "../data/projects.json";
import reviewsJson from "../data/reviews.json";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Griffin Baxter</title>
                <meta name="description" content="Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.Home}/>

            <main className="container mx-auto flex flex-col justify-center max-w-[1200px]">
                <p className="text-3xl text-center py-8">
                    Full-Stack Web Software Engineer in Christchurch, New Zealand
                </p>
                <Divider/>
                <p className="text-5xl font-bold py-8">Latest Software Projects</p>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">{projectsJson.slice(0, 3).map(project => (
                    <div key={project.slug} className="max-w-sm">
                        <ProjectCard projectObject={project}/>
                    </div>
                ))}</div>
                <Divider/>
                <p className="text-5xl font-bold py-8">Latest Game Reviews</p>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">{reviewsJson.slice(0, 3).map(review => (
                    <div key={review.slug} className="max-w-sm">
                        <ReviewCard reviewObject={review}/>
                    </div>
                ))}</div>
            </main>

            <FooterComponent/>
        </>
    );
};

export default Home;
