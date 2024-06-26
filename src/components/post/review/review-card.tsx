import { type Review } from "../../../models";
import { months } from "../post-header";
import Link from "next/link";
import Image from "next/image";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const date = new Date(review.date);
  return (
    <Link href={review.slug}>
      <div className="card max-w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={`/images/${review.featuredImage.node.sourceUrl}`}
            alt="Review Image"
            width={384}
            height={216}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{review.title}</h2>
          <p className="font-semibold">{review.excerpt}</p>
          <p>
            {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
}
