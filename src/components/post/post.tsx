import Navbar, { NavigationPage } from "../../components/navbar";
import type { PostDetails, PostBlock } from "../../models";
import projectsJson from "../../data/projects.json";
import PostClient from "./post-client";
import { notFound } from "next/navigation";

interface Props {
  slugs: string[];
  postSlug: string;
}

export default async function Post({ slugs, postSlug }: Props) {
  if (!slugs.includes(postSlug)) {
    notFound();
  }

  const postContentJson = (await import(
    `../../data/posts/${postSlug}.json`
  )) as PostBlock[];
  const postContent = [...Array(postContentJson.length).keys()].map(
    (i) => postContentJson[i],
  ) as PostBlock[];

  const post = projectsJson.find(
    (project) => project.slug === postSlug,
  ) as PostDetails;

  return (
    <>
      <Navbar currentPage={NavigationPage.Projects} />

      <PostClient postContent={postContent} post={post} />
    </>
  );
}
