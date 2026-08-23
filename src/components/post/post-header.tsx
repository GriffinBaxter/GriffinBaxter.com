import type { PostDetails } from "../../models";
import { uploadThingUrl } from "../../images";
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

interface Props {
  postDetails: PostDetails;
}

export default function PostHeader({ postDetails }: Props) {
  return (
    <>
      <p className="pt-10 text-center text-3xl font-bold sm:text-5xl md:text-7xl">
        {postDetails.title}
      </p>
      <p className="py-10 text-center text-2xl sm:text-3xl md:text-4xl">
        {postDetails.excerpt}
      </p>
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
      <Image
        className="mx-auto py-3"
        src={uploadThingUrl(postDetails.featuredImage)}
        alt="Main Post Image"
        width="1200"
        height="675"
        priority={true}
      ></Image>
    </>
  );
}
