import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import reviewsJson from "../../data/reviews.json";
import Divider from "../../components/divider";
import gamesRankedJson from "../../data/games-ranked.json";
import Link from "next/link";
import { months } from "../../components/post/post-header";
import ReviewsClient from "./reviews-client";

const getDateText = (date: Date): string => {
  return `${date.getDate().toString()} ${months[date.getMonth()] as string} ${date.getFullYear().toString()}`;
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

export const metadata = customMetadata("Reviews");

export default function Page() {
  const categories = [
    ...new Map(
      reviewsJson
        .flatMap((review) => review.categories.nodes)
        .map((item) => [item.slug, item]),
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  return (
    <>
      <Navbar currentPage={NavigationPage.Reviews} />

      <main className="container mx-auto flex max-w-[1200px] flex-col items-center justify-center px-8 pb-8">
        <p className="py-8 text-center text-3xl font-bold sm:text-5xl">
          Reviews
        </p>
        <Divider />

        <ReviewsClient categories={categories} />

        <dialog id="games-ranked-modal" className="modal">
          <div className="modal-box">
            <h3 className="pt-2 pb-6 text-center text-2xl font-bold">
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
            <h3 className="pt-8 pb-6 text-center text-2xl font-bold">
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
}
