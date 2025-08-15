import type { PostDetails } from "../../models";
import Image from "next/image";

export const languageBadgeColour: Record<string, string> = {
  c: "",
  gdscript: "badge-neutral",
  "html-css": "badge-error",
  java: "badge-accent",
  javascript: "badge-warning",
  kotlin: "badge-secondary",
  python: "badge-info",
  sql: "badge-success",
  typescript: "badge-primary",
};

export const reviewMediumBadgeColour: Record<string, string> = {
  games: "badge-info",
  movies: "badge-accent",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  postDetails: PostDetails;
  isProject: boolean;
}

export default function PostHeader({ postDetails, isProject }: Props) {
  const date = new Date(postDetails.date);
  return (
    <>
      <p className="pt-10 text-center text-3xl font-bold sm:text-5xl md:text-7xl">
        {postDetails.title}
      </p>
      <p className="py-10 text-center text-2xl sm:text-3xl md:text-4xl">
        {postDetails.excerpt}
      </p>
      {isProject ? (
        <div className="mx-auto flex flex-wrap gap-6 pb-6">
          {postDetails.categories.map((category) =>
            Object.keys(languageBadgeColour).includes(category.slug) ? (
              <div
                key={category.slug}
                className={`badge badge-lg ${
                  languageBadgeColour[category.slug] as string
                }`}
              >
                {category.name}
              </div>
            ) : null,
          )}
        </div>
      ) : (
        <div className="mx-auto flex flex-wrap gap-6 pb-6">
          {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          {postDetails.categories.map((category) => (
            <div
              key={category.slug}
              className={`badge badge-lg ${
                reviewMediumBadgeColour[category.slug] as string
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
      <Image
        className="mx-auto py-3"
        src={
          process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID
            ? `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${postDetails.featuredImage}`
            : ""
        }
        alt="Main Post Image"
        width="1200"
        height="675"
        priority={true}
      ></Image>
    </>
  );
}
