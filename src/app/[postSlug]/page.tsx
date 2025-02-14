import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import PostContent from "../../components/post/post-content";
import type { PostDetails, PostBlock } from "../../models";
import projectsJson from "../../data/projects.json";
import reviewsJson from "../../data/reviews.json";
import PostHeader from "../../components/post/post-header";
import ProjectGallery from "../../components/post/project/project-gallery";
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

  const galleryBlockIndex = postContent.findLastIndex(
    (block) => block.tagName === "h4" && block.innerHtml === "Gallery",
  );
  const hasGallery = isProject && galleryBlockIndex !== -1;

  return (
    <>
      <PostClient />

      <Navbar
        currentPage={
          isProject ? NavigationPage.Projects : NavigationPage.Reviews
        }
      />

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center px-8 pb-16">
        <PostHeader postDetails={post} isProject={isProject} />
        <PostContent
          blocks={
            hasGallery ? postContent.slice(0, galleryBlockIndex) : postContent
          }
        />
        {hasGallery ? (
          <ProjectGallery blocks={postContent.slice(galleryBlockIndex + 1)} />
        ) : null}
      </main>
    </>
  );
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
