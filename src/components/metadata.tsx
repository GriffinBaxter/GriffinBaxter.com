import type { Metadata } from "next";
import type { PostDetails } from "../models";

export const customMetadata = (
  name: string | undefined,
): Metadata | undefined => {
  if (name) {
    return {
      title: name === "Home" ? "Griffin Baxter" : `${name} - Griffin Baxter`,
      description: name,
      icons: "/favicon.ico",
    };
  }
};

export const generatePostMetadata = (
  slug: string,
  slugs: string[],
  json: PostDetails[],
): Metadata | undefined => {
  if (slugs.includes(slug)) {
    return customMetadata(json.find((post) => post.slug === slug)?.title);
  }
};
