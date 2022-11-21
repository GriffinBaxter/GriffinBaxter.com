import { type NextPage } from "next";
import { type Post } from "@prisma/client";
import Image from 'next/image';
import PostContent, { type Content } from "../post-content";
import Divider from "../../divider";

export interface ReviewExtra {
    rating: number,
    info: {
        name: string,
        developer: string,
        publisher: string,
        platform: string,
        start: string,
        completion: string,
    }
}

interface Props {
    postObject: Partial<Post>
}

const ReviewPage: NextPage<Props> = ({postObject: review}) => {
    const content = review.content as unknown as Content
    const extra = review.extra as unknown as ReviewExtra

    return (
        <>
            <p className="text-7xl font-bold text-center pt-10">{review.title}</p>
            <p className="text-4xl text-center py-10">{review.subtitle}</p>
            <Image className="py-3 mx-auto" src={`/images/posts/${review.slug}/main.png`} alt="Main Post Image" width="1200" height="675" priority={true}></Image>
            {review.slug ? <PostContent contentObject={content} postSlug={review.slug} /> : <p></p>}
            <p className="text-3xl text-center font-bold py-10">Rating: {extra.rating}/10</p>
            <Divider/>
            <p className="text-3xl font-bold pt-10">Review Info</p>
            <p className="text-xl font-bold pt-8">Game Info:</p>
            <p className="text-xl pt-8">Name: {extra.info.name}</p>
            <p className="text-xl pt-8">Developer: {extra.info.developer}</p>
            <p className="text-xl pt-8">Publisher: {extra.info.publisher}</p>
            <p className="text-xl pt-8">Platform: {extra.info.platform}</p>
            <p className="text-xl pt-8">Game Start Date: {extra.info.start}</p>
            <p className="text-xl pt-8">Game Completion Date: {extra.info.completion}</p>
        </>
    )
}

export default ReviewPage
