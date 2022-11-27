import type {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Divider from "../components/divider";
import ProjectCard from "../components/post/project/project-card";
import {getProjects, getReviews} from "../server/wpgraphql/api";
import type {Project, Review} from "../server/wpgraphql/models";
import ReviewCard from "../components/post/review/review-card";
import FooterComponent from "../components/footer";

interface Props {
    latestProjects: Project[],
    latestReviews: Review[],
}

const Home: NextPage<Props> = ({ latestProjects, latestReviews }) => {
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
                    I’m Griffin Baxter, a Graduate Software Engineer in Christchurch, New Zealand.
                </p>
                <Divider/>
                <p className="text-5xl font-bold py-8">Latest Software Projects</p>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">{latestProjects?.map(project => (
                    <div key={project.slug} className="max-w-sm">
                        <ProjectCard projectObject={project}/>
                    </div>
                ))}</div>
                <Divider/>
                <p className="text-5xl font-bold py-8">Latest Game Reviews</p>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">{latestReviews?.map(review => (
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

export const getStaticProps: GetStaticProps = async () => {
    const latestProjects = await getProjects(3)
    const latestReviews = await getReviews(3)
    return {
        props: {
            latestProjects,
            latestReviews,
        },
    }
}
