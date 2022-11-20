import {type NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import ReviewCard from "../components/review-card";
import {trpc} from "../utils/trpc";
import {Spinner} from "flowbite-react";

const GameReviews: NextPage = () => {
    const reviews = trpc.posts.getAllReviews.useQuery();

    return (
        <>
            <Head>
                <title>Game Reviews - Griffin Baxter</title>
                <meta name="description" content="Game Reviews" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.GameReviews}/>

            <main className="container mx-auto flex flex-col items-center justify-center p-4">
                {reviews.data ?
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{reviews.data.map(review => (
                        <div key={review.slug} className="max-w-sm">
                            <ReviewCard reviewObject={review}/>
                        </div>
                    ))}</div> : <Spinner className="min-h-[380px]" size="xl" />}
            </main>
        </>
    );
};

export default GameReviews;
