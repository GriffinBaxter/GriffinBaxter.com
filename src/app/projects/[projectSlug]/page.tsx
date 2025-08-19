import projectsJson from "../../../data/projects.json";
import { customMetadata } from "../../page";
import Post from "../../../components/post/post";
import { notFound } from "next/navigation";

const slugs = projectsJson.map(({ slug }) => slug);

interface Props {
  params: Promise<{ projectSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  if (slugs.includes(params.projectSlug)) {
    return customMetadata(
      projectsJson.find((post) => post.slug === params.projectSlug)?.title,
    );
  }
}

export default async function Page(props: Props) {
  const params = await props.params;

  if (!slugs.includes(params.projectSlug)) {
    notFound();
  }

  return <Post postSlug={params.projectSlug} isProject={true} />;
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ projectSlug: slug }));
};
