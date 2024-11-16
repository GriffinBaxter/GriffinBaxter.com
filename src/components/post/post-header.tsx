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
        <div className="mx-auto flex flex-wrap gap-2 pb-6">
          {postDetails.categories?.nodes.map((category) =>
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
        <div className="mx-auto flex flex-wrap gap-2 pb-6">
          {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
        </div>
      )}
      <Image
        className="mx-auto py-3"
        src={`/images/${postDetails.featuredImage.node.sourceUrl}`}
        alt="Main Post Image"
        width="1200"
        height="675"
        priority={true}
      ></Image>
    </>
  );
}
