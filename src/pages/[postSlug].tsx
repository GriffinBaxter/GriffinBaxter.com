import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import Image from "next/image";
import PostContent from "../components/post/post-content";
import type {SinglePost} from "../models";
import FooterComponent from "../components/footer";
import postSlugsJson from "../server/data/post-slugs.json";

export const languageBadgeColour: Record<string, string> = {
    c: "",
    "html-css": "badge-error",
    java: "badge-accent",
    javascript: "badge-warning",
    kotlin: "badge-secondary",
    python: "badge-info",
    sql: "badge-success",
    typescript: "badge-primary",
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
                                <div key={category.slug} className={`badge ${languageBadgeColour[category.slug]}`}>
                                    {category.name}
                                </div> : null
                        ))}
                    </div> :
                    <div className="flex flex-wrap gap-2 pb-6 mx-auto">
                        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
                    </div>
                }
                <Image className="py-3 mx-auto" src={post?.featuredImage.node.sourceUrl} alt="Main Post Image" width="1200" height="675" priority={true}></Image>
                <PostContent blocks={post?.blocks} />
            </main>

            <FooterComponent/>
        </>
    );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
    const { default: post } = await import(`../server/data/posts/${context.params?.postSlug}.json`);

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

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: postSlugsJson.map(({ slug }) => `/${slug}`),
        fallback: false,
    }
}
