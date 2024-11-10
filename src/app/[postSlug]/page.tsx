import { customMetadata } from "../page";
import Navbar, { NavigationPage } from "../../components/navbar";
import PostContent from "../../components/post/post-content";
import type { SinglePost } from "../../models";
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
    const post = (await import(
      `../../data/posts/${params.postSlug}.json`
    )) as SinglePost;
    return customMetadata(post.title);
  }
}

export default async function Page(props: Props) {
  const params = await props.params;

  if (!slugs.includes(params.postSlug)) {
    notFound();
  }

  const post = (await import(
    `../../data/posts/${params.postSlug}.json`
  )) as SinglePost;

  let isProject = false;
  for (const category of post.categories.nodes) {
    if (category.slug === "projects") {
      isProject = true;
    }
  }

  const galleryBlockIndex = post.blocks.findLastIndex(
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
        <PostHeader post={post} isProject={isProject} />
        <PostContent
          blocks={
            hasGallery ? post.blocks.slice(0, galleryBlockIndex) : post.blocks
          }
        />
        {hasGallery ? (
          <ProjectGallery blocks={post.blocks.slice(galleryBlockIndex + 1)} />
        ) : null}
      </main>
    </>
  );
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
