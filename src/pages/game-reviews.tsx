import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ReviewCard from "../components/post/review/review-card";
import FooterComponent from "../components/footer";
import reviewsJson from "../data/reviews.json";
import Divider from "../components/divider";
import gamesRankedJson from "../data/games-ranked.json";
import Link from "next/link";

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
        <button
          className="btn btn-secondary my-4"
          onClick={() =>
            (
              document.getElementById("games-ranked-modal") as HTMLDialogElement
            ).showModal()
          }
        >
          Games Ranked
        </button>
        <dialog id="games-ranked-modal" className="modal">
          <div className="modal-box">
            <h3 className="pb-6 pt-2 text-center text-2xl font-bold">
              All Games I’ve Completed (Ranked)
            </h3>
            <ol className="list-decimal pl-8">
              {gamesRankedJson.map((game) =>
                game.slug ? (
                  <li key={game.name}>
                    <Link
                      target="_blank"
                      href={game.slug}
                      rel="noreferrer"
                      className="font-bold text-blue-600 underline hover:text-blue-800"
                    >
                      {game.name}
                    </Link>
                  </li>
                ) : (
                  <li key={game.name}>{game.name}</li>
                ),
              )}
            </ol>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </main>

      <FooterComponent />
    </>
  );
};

export default GameReviews;
