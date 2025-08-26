// Redirect for old post links without a /projects or /reviews prefix

import type { PostDetails } from "../../models";
import projectsJson from "../../data/projects.json";
import reviewsJson from "../../data/reviews.json";
import { notFound, permanentRedirect } from "next/navigation";

const slugs = [...projectsJson, ...reviewsJson].map(({ slug }) => slug);

interface Props {
  params: Promise<{ postSlug: string }>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  if (!slugs.includes(params.postSlug)) {
    notFound();
  }

  const projectPost = projectsJson.find(
    (post) => post.slug === params.postSlug,
  ) as PostDetails | undefined;

  const isProject = !!projectPost;

  permanentRedirect(
    `/${isProject ? "projects" : "reviews"}/${params.postSlug}`,
  );
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
