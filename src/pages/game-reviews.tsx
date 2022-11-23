import type {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import ReviewCard from "../components/post/review/review-card";
import {getAllReviews} from "../server/wpgraphql/api";
import type {Review} from "../server/wpgraphql/models";

interface Props {
    reviews: Review[]
}

const GameReviews: NextPage<Props> = ({ reviews }) => {
    return (
        <>
            <Head>
                <title>Game Reviews - Griffin Baxter</title>
                <meta name="description" content="Game Reviews" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={NavigationPage.GameReviews}/>

            <main className="container mx-auto flex flex-col items-center justify-center p-4">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{reviews?.map(review => (
                    <div key={review.slug} className="max-w-sm">
                        <ReviewCard reviewObject={review}/>
                    </div>
                ))}</div>
            </main>
        </>
    );
};

export default GameReviews;

export const getStaticProps: GetStaticProps = async () => {
    const reviews = await getAllReviews()
    return {
        props: {
            reviews,
        },
    }
}
