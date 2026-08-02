// Redirect for old post links without a /projects prefix

import projectsJson from "../../data/projects.json";
import { notFound, permanentRedirect } from "next/navigation";

const slugs = projectsJson.map(({ slug }) => slug);

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
  );

  const isProject = !!projectPost;

  permanentRedirect(
    `/${isProject ? "projects" : "reviews"}/${params.postSlug}`,
  );
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ postSlug: slug }));
};
