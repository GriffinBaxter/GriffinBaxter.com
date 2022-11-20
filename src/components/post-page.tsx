import { type NextPage } from "next";
import { type Post } from "@prisma/client";
import Image from 'next/image';
import PostContent, { type Content } from "./post-content";

interface Props {
    postObject: Partial<Post>
}

const PostPage: NextPage<Props> = ({postObject: post}) => {
    const content = post.content as unknown as Content

    return (
        <>
            <p className="text-7xl text-center pt-10">{post.title}</p>
            <p className="text-4xl text-center py-10">{post.subtitle}</p>
            <Image className="py-3" src={`/images/posts/${post.slug}/main.png`} alt="Main Post Image" width="1200" height="675"></Image>
            {post.slug ? <PostContent contentObject={content} postSlug={post.slug} /> : <p></p>}
        </>
    )
}

export default PostPage
