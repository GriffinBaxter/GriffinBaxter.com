import { getAllProjects, getProjectSlugs } from "../../../project-content";
import Post from "../../../components/post/post";
import { generatePostMetadata } from "../../../components/metadata";

interface Props {
  params: Promise<{ projectSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const allProjects = getAllProjects();
  return generatePostMetadata(params.projectSlug, allProjects);
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <Post postSlug={params.projectSlug} />;
}

export const generateStaticParams = () => {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ projectSlug: slug }));
};
