import projectsJson from "../../../data/projects.json";
import Post from "../../../components/post/post";
import { generatePostMetadata } from "../../../components/metadata";

const slugs = projectsJson.map(({ slug }) => slug);

interface Props {
  params: Promise<{ projectSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return generatePostMetadata(params.projectSlug, slugs, projectsJson);
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <Post slugs={slugs} postSlug={params.projectSlug} isProject={true} />;
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ projectSlug: slug }));
};
