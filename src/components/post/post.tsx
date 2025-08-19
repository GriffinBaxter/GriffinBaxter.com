import Navbar, { NavigationPage } from "../../components/navbar";
import type { PostDetails, PostBlock } from "../../models";
import projectsJson from "../../data/projects.json";
import reviewsJson from "../../data/reviews.json";
import PostClient from "./post-client";

interface Props {
  postSlug: string;
  isProject: boolean;
}

export default async function Post({ postSlug, isProject }: Props) {
  const postContentJson = (await import(
    `../../data/posts/${postSlug}.json`
  )) as PostBlock[];
  const postContent = [...Array(postContentJson.length).keys()].map(
    (i) => postContentJson[i],
  ) as PostBlock[];

  const post = (
    isProject
      ? projectsJson.find((post) => post.slug === postSlug)
      : reviewsJson.find((post) => post.slug === postSlug)
  ) as PostDetails;

  return (
    <>
      <Navbar
        currentPage={
          isProject ? NavigationPage.Projects : NavigationPage.Reviews
        }
      />

      <PostClient postContent={postContent} isProject={isProject} post={post} />
    </>
  );
}
