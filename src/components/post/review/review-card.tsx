import type { PostDetails } from "../../../models";
import { months } from "../post-header";
import Link from "next/link";
import Image from "next/image";

interface Props {
  postDetails: PostDetails;
}

export default function ReviewCard({ postDetails }: Props) {
  const date = new Date(postDetails.date);
  return (
    <Link href={postDetails.slug}>
      <div className="card max-w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={`/images/${postDetails.featuredImage.node.sourceUrl}`}
            alt="Review Image"
            width={384}
            height={216}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{postDetails.title}</h2>
          <p className="font-semibold">{postDetails.excerpt}</p>
          <p>
            {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
}
