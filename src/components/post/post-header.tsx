import type { NextPage } from "next";
import type { SinglePost } from "../../models";
import Image from "next/image";

export const languageBadgeColour: Record<string, string> = {
  c: "",
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
  post: SinglePost;
  isProject: boolean;
}

const PostHeader: NextPage<Props> = ({ post, isProject }) => {
  const date = new Date(post.date);
  return (
    <>
      <p className="pt-10 text-center text-3xl font-bold sm:text-5xl md:text-7xl">
        {post.title}
      </p>
      <p className="py-10 text-center text-2xl sm:text-3xl md:text-4xl">
        {post.excerpt}
      </p>
      {isProject ? (
        <div className="mx-auto flex flex-wrap gap-2 pb-6">
          {post.categories.nodes.map((category) =>
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
        src={`/images/${post.featuredImage.node.sourceUrl}`}
        alt="Main Post Image"
        width="1200"
        height="675"
        priority={true}
      ></Image>
    </>
  );
};

export default PostHeader;
