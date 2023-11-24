import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ReviewCard from "../components/post/review/review-card";
import FooterComponent from "../components/footer";
import reviewsJson from "../data/reviews.json";

const GameReviews: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game Reviews - Griffin Baxter</title>
        <meta name="description" content="Game Reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page={NavigationPage.GameReviews} />

      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
