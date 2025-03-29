import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import type { PostDetails, PostBlock } from "../../models";
import projectsJson from "../../data/projects.json";
import reviewsJson from "../../data/reviews.json";
import { notFound } from "next/navigation";
import PostClient from "./post-client";

const slugs = [...projectsJson, ...reviewsJson].map(({ slug }) => slug);

interface Props {
  params: Promise<{ postSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  if (slugs.includes(params.postSlug)) {
    return customMetadata(
      [...projectsJson, ...reviewsJson].find(
        (post) => post.slug === params.postSlug,
      )?.title,
    );
  }
}

export default async function Page(props: Props) {
  const params = await props.params;

  if (!slugs.includes(params.postSlug)) {
    notFound();
  }

  const postContentJson = (await import(
    `../../data/posts/${params.postSlug}.json`
  )) as PostBlock[];
  const postContent = [...Array(postContentJson.length).keys()].map(
    (i) => postContentJson[i],
  ) as PostBlock[];
  const projectPost = projectsJson.find(
    (post) => post.slug === params.postSlug,
  ) as PostDetails | undefined;
  const reviewPost = reviewsJson.find(
    (post) => post.slug === params.postSlug,
  ) as PostDetails | undefined;

  const isProject = !!projectPost;
  const post = (isProject ? projectPost : reviewPost) as PostDetails;

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

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
