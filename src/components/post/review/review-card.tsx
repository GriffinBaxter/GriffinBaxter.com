import { type Post } from "@prisma/client";
import {Card} from "flowbite-react";
import { type NextPage } from "next";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Props {
    reviewObject: Partial<Post>
}

const ReviewCard: NextPage<Props> = ({reviewObject: review}) => {
    return (
        <Card
            imgSrc={`/images/posts/${review.slug}/main.png`}
            imgAlt="Project Image"
            href={review.slug}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {review.title}
            </h5>
            <h6 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {review.subtitle}
            </h6>
            <p>
                {review.published?.getUTCDate()} {months[review.published ? review.published?.getUTCMonth() : 0]} {review.published?.getUTCFullYear()}
            </p>
        </Card>
    )
}

export default ReviewCard
