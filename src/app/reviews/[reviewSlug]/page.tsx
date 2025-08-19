import reviewsJson from "../../../data/reviews.json";
import { customMetadata } from "../../page";
import Post from "../../../components/post/post";
import { notFound } from "next/navigation";

const slugs = reviewsJson.map(({ slug }) => slug);

interface Props {
  params: Promise<{ reviewSlug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  if (slugs.includes(params.reviewSlug)) {
    return customMetadata(
      reviewsJson.find((post) => post.slug === params.reviewSlug)?.title,
    );
  }
}

export default async function Page(props: Props) {
  const params = await props.params;

  if (!slugs.includes(params.reviewSlug)) {
    notFound();
  }

  return <Post postSlug={params.reviewSlug} isProject={false} />;
}

export const generateStaticParams = () => {
  return slugs.map((slug) => ({ reviewSlug: slug }));
};
