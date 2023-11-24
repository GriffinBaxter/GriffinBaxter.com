import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ReviewCard from "../components/post/review/review-card";
import FooterComponent from "../components/footer";
import reviewsJson from "../data/reviews.json";
import Divider from "../components/divider";

const GameReviews: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game Reviews - Griffin Baxter</title>
        <meta name="description" content="Game Reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.GameReviews} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center pb-8">
        <p className="py-8 text-center text-5xl font-bold">Game Reviews</p>
        <p className="pb-8 text-center text-xl">
          In <span className="font-bold">reverse chronological</span> order
        </p>
        <Divider />
        <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {reviewsJson.map((review) => (
            <div key={review.slug} className="max-w-sm">
              <ReviewCard reviewObject={review} />
            </div>
          ))}
        </div>
      </main>

      <FooterComponent />
    </>
  );
};

export default GameReviews;
