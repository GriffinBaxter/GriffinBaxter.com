import { customMetadata } from "../../components/metadata";
import Navbar, { NavigationPage } from "../../components/navbar";
import reviewsJson from "../../data/reviews.json";
import Divider from "../../components/divider";
import Link from "next/link";
import { months } from "../../components/post/post-header";
import ReviewsClient from "./reviews-client";
import { getRecord } from "../../data/records";

interface Game {
  name: string;
  reviewSlug?: string;
  started?: string;
  startedApproximate?: boolean;
  completed?: string;
  completedApproximate?: boolean;
  inProgress?: boolean;
}

const formatDateValue = (value: string, approximate?: boolean): string => {
  const prefix = approximate ? "~" : "";

  if (value.includes("/")) {
    const [start, end] = value.split("/");
    return `${prefix as string}${start as string}/${end as string}`;
  }

  const parts = value.split("-").map(Number);

  if (parts.length === 3) {
    const [year, month, day] = parts;
    const date = new Date(year as number, (month as number) - 1, day);
    return `${prefix}${date.getDate().toString()} ${months[date.getMonth()] as string} ${date.getFullYear().toString()}`;
  }

  if (parts.length === 2) {
    const [year, month] = parts;
    return `${prefix}${months[(month as number) - 1] as string} ${(year as number).toString()}`;
  }

  return `${prefix}${value}`;
};

const getStartedAndCompleted = (game: Game): string | undefined => {
  const startedText = game.started
    ? formatDateValue(game.started, game.startedApproximate)
    : undefined;
  const completedText = game.completed
    ? formatDateValue(game.completed, game.completedApproximate)
    : undefined;

  if (startedText && completedText) {
    return `(Started: ${startedText}, Completed: ${completedText})`;
  } else if (startedText) {
    return `(Started: ${startedText})`;
  }
};

export const metadata = customMetadata("Reviews");

export default async function Page() {
  const categories = [
    ...new Map(
      reviewsJson
        .flatMap((review) => review.categories)
        .map((item) => [item.slug, item]),
    ).values(),
  ].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  const gamesRanked = await getRecord<Game[]>("Games/games-ranked.json");

  const completedGames = gamesRanked.filter((game) => !game.inProgress);
  const inProgressGames = gamesRanked.filter((game) => game.inProgress);

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
              {completedGames.map((game) =>
                game.reviewSlug ? (
                  <li key={game.name}>
                    <Link
                      target="_blank"
                      href={game.reviewSlug}
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
              {inProgressGames.map((game) => (
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
