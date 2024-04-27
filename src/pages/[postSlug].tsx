import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import CustomHead from "../components/custom-head";
import Navbar, { NavigationPage } from "../components/navbar";
import PostContent from "../components/post/post-content";
import type { SinglePost } from "../models";
import projectsJson from "../data/projects.json";
import reviewsJson from "../data/reviews.json";
import PostHeader from "../components/post/post-header";
import ProjectGallery from "../components/post/project/project-gallery";

interface Props {
  post: SinglePost;
  isProject: boolean;
}

const Post: NextPage<Props> = ({ post, isProject }) => {
  const galleryBlockIndex = post.blocks.findLastIndex(
    (block) => block.tagName === "h4" && block.innerHtml === "Gallery",
  );

  return (
    <>
      <CustomHead title={post.title} />

      <Navbar
        currentPage={
          isProject ? NavigationPage.Projects : NavigationPage.Reviews
        }
      />

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center px-8 pb-8">
        <PostHeader post={post} isProject={isProject} />
        <PostContent
          blocks={
            galleryBlockIndex !== -1
              ? post.blocks.slice(0, galleryBlockIndex)
              : post.blocks
          }
        />
        {isProject && galleryBlockIndex !== -1 ? (
          <ProjectGallery blocks={post.blocks.slice(galleryBlockIndex + 1)} />
        ) : null}
      </main>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const post = (await require(
    `../data/posts/${context.params?.postSlug as string}.json`,
  )) as SinglePost;

  let isProject = false;
  for (const category of post.categories.nodes) {
    if (category.slug === "projects") {
      isProject = true;
    }
  }

  return {
    props: { post, isProject },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [...projectsJson, ...reviewsJson].map(({ slug }) => `/${slug}`),
    fallback: false,
  };
};
