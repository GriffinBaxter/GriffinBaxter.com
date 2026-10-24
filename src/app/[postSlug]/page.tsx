// Redirect for old post links without a /projects prefix

import { getProjectSlugs } from "../../project-content";
import { notFound, permanentRedirect } from "next/navigation";

interface Props {
  params: Promise<{ postSlug: string }>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const slugs = getProjectSlugs();

  if (!slugs.includes(params.postSlug)) {
    notFound();
  }

  permanentRedirect(`/projects/${params.postSlug}`);
}

export const generateStaticParams = () => {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ postSlug: slug }));
};
