import reviewsJson from "../../../data/reviews.json";
import Post from "../../../components/post/post";
import { generatePostMetadata } from "../../../components/metadata";

const slugs = reviewsJson.map(({ slug }) => slug);

interface Props {
  params: Promise<{ reviewSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return generatePostMetadata(params.reviewSlug, slugs, reviewsJson);
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <Post slugs={slugs} postSlug={params.reviewSlug} isProject={false} />;
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ reviewSlug: slug }));
};
