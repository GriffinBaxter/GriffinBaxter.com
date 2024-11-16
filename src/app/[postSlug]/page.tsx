import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import PostContent from "../../components/post/post-content";
import type { PostDetails, Post } from "../../models";
import projectsJson from "../../data/projects.json";
import reviewsJson from "../../data/reviews.json";
import PostHeader from "../../components/post/post-header";
import ProjectGallery from "../../components/post/project/project-gallery";
import { notFound } from "next/navigation";

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

  const postContent = (await import(
    `../../data/posts/${params.postSlug}.json`
  )) as Post;
  const projectPost = projectsJson.find(
    (post) => post.slug === params.postSlug,
  ) as PostDetails | undefined;
  const reviewPost = reviewsJson.find(
    (post) => post.slug === params.postSlug,
  ) as PostDetails | undefined;

  const isProject = !!projectPost;
  const post = (isProject ? projectPost : reviewPost) as PostDetails;

  const galleryBlockIndex = postContent.blocks.findLastIndex(
    (block) => block.tagName === "h4" && block.innerHtml === "Gallery",
  );
  const hasGallery = isProject && galleryBlockIndex !== -1;

  return (
    <>
      <Navbar
        currentPage={
          isProject ? NavigationPage.Projects : NavigationPage.Reviews
        }
      />

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center px-8 pb-8">
        <PostHeader postDetails={post} isProject={isProject} />
        <PostContent
          blocks={
            hasGallery
              ? postContent.blocks.slice(0, galleryBlockIndex)
              : postContent.blocks
          }
        />
        {hasGallery ? (
          <ProjectGallery
            blocks={postContent.blocks.slice(galleryBlockIndex + 1)}
          />
        ) : null}
      </main>
    </>
  );
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
