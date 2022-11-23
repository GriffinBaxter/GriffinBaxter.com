import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import {getAllPostSlugs, getSinglePost} from "../server/wpgraphql/api";
import Image from "next/image";
import PostContent from "../components/post/post-content";
import {Badge} from "flowbite-react";
import type {SinglePost} from "../server/wpgraphql/models";

export const languageBadgeColour: Record<string, string> = {
    c: "purple",
    "html-css": "pink",
    java: "failure",
    javascript: "warning",
    python: "info",
    sql: "success",
}

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

interface Props {
    post: SinglePost
    isProject: boolean
}

const Post: NextPage<Props> = ({ post, isProject }) => {
    const pageTitle = `${post?.title} - Griffin Baxter`
    const date = new Date(post?.date)
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Post" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page={isProject ? NavigationPage.SoftwareProjects : NavigationPage.GameReviews}/>

            <main className="container mx-auto flex flex-col justify-center max-w-[1200px]">
                <p className="text-7xl font-bold text-center pt-10">{post?.title}</p>
                <p className="text-4xl text-center py-10">{post?.excerpt}</p>
                {isProject ?
                    <div className="flex flex-wrap gap-2 pb-6 mx-auto">
                        {post?.categories.nodes.map((category) => (
                            (Object.keys(languageBadgeColour).includes(category.slug)) ?
                                <Badge key={category.slug} color={languageBadgeColour[category.slug]} size="sm">
                                    {category.name}
                                </Badge> : null
                        ))}
                    </div> :
                    <div className="flex flex-wrap gap-2 pb-6 mx-auto">
                        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
                    </div>
                }
                <Image className="py-3 mx-auto" src={post?.featuredImage.node.sourceUrl} alt="Main Post Image" width="1200" height="675" priority={true}></Image>
                <PostContent blocks={post?.blocks} />
            </main>
        </>
    );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
    const post = await getSinglePost(context.params?.postSlug as string)

    let isProject = false
    for (const category of post.categories.nodes) {
        if (category.slug == "projects") {
            isProject = true
        }
    }

    return {
        props: { post, isProject },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await getAllPostSlugs()
    return {
        paths: slugs.map(({ slug }) => `/${slug}`) || [],
        fallback: false,
    }
}
