import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NavBar, { NavigationPage } from "../components/navbar";
import Image from "next/image";
import PostContent from "../components/post/post-content";
import type { SinglePost } from "../models";
import FooterComponent from "../components/footer";
import projectsJson from "../data/projects.json";
import reviewsJson from "../data/reviews.json";

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

const Post: NextPage<Props> = ({ post, isProject }) => {
  const pageTitle = `${post?.title} - Griffin Baxter`;
  const date = new Date(post?.date);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        page={
          isProject
            ? NavigationPage.SoftwareProjects
            : NavigationPage.GameReviews
        }
      />

      <main className="container mx-auto flex max-w-[1200px] flex-col justify-center pb-8">
        <p className="pt-10 text-center text-7xl font-bold">{post?.title}</p>
        <p className="py-10 text-center text-4xl">{post?.excerpt}</p>
        {isProject ? (
          <div className="mx-auto flex flex-wrap gap-2 pb-6">
            {post?.categories.nodes.map((category) =>
              Object.keys(languageBadgeColour).includes(category.slug) ? (
                <div
                  key={category.slug}
                  className={`badge ${languageBadgeColour[category.slug]}`}
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
          src={`/images/${post?.featuredImage.node.sourceUrl}`}
          alt="Main Post Image"
          width="1200"
          height="675"
          priority={true}
        ></Image>
        <PostContent blocks={post?.blocks} />
      </main>

      <FooterComponent />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await require(`../data/posts/${context.params?.postSlug}.json`);

  let isProject = false;
  for (const category of post.categories.nodes) {
    if (category.slug == "projects") {
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
