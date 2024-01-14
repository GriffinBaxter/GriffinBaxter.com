import type { NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import ReviewCard from "../components/post/review/review-card";
import reviewsJson from "../data/reviews.json";
import Divider from "../components/divider";
import gamesRankedJson from "../data/games-ranked.json";
import Link from "next/link";
import { months } from "./[postSlug]";

const getDateText = (date: Date): string => {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const getStartedAndCompleted = (game: {
  name: string;
  slug?: string;
  started?: number[] | string;
  completed?: number[] | string;
}): string | undefined => {
  if (game.started && game.completed) {
    return `(Started: ${
      typeof game.started === "string"
        ? game.started
        : getDateText(new Date(...(game.started as [number, number, number])))
    }, Completed: ${
      typeof game.completed === "string"
        ? game.completed
        : getDateText(new Date(...(game.completed as [number, number, number])))
    })`;
  } else if (game.started) {
    return `(Started: ${
      typeof game.started === "string"
        ? game.started
        : getDateText(new Date(...(game.started as [number, number, number])))
    })`;
  }
};

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
              {gamesRankedJson.completed.map((game) =>
                game.slug ? (
                  <li key={game.name}>
                    <Link
                      target="_blank"
                      href={game.slug}
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      <span className="font-bold">{game.name}</span>{" "}
                      <span className="italic">
                        {getStartedAndCompleted(game)}
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li key={game.name}>
                    <span className="font-bold">{game.name}</span>{" "}
                    <span className="italic">
                      {getStartedAndCompleted(game)}
                    </span>
                  </li>
                ),
              )}
            </ol>
            <h3 className="pb-6 pt-8 text-center text-2xl font-bold">
              Games In-Progress
            </h3>
            <ul className="list-disc pl-8">
              {gamesRankedJson.started.map((game) => (
                <li key={game.name}>
                  <span className="font-bold">{game.name}</span>{" "}
                  <span className="italic">{getStartedAndCompleted(game)}</span>
                </li>
              ))}
            </ul>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </main>
    </>
  );
};

export default GameReviews;
