import {Card} from "flowbite-react";
import { type NextPage } from "next";
import { type Review } from "../../../lib/api";
import {months} from "../../../pages/[postSlug]";

interface Props {
    reviewObject: Review
}

const ReviewCard: NextPage<Props> = ({reviewObject: review}) => {
    const date = new Date(review.date)
    return (
        <Card
            imgSrc={review.featuredImage.node.sourceUrl}
            imgAlt="Review Image"
            href={review.slug}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {review.title}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {review.excerpt}
            </h6>
            <p>
                {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
            </p>
        </Card>
    )
}

export default ReviewCard
