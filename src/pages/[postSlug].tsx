import {type NextPage} from "next";
import Head from "next/head";
import NavBar, {NavigationPage} from "../components/navbar";
import {useRouter} from 'next/router'
import {trpc} from "../utils/trpc";
import {useEffect} from "react";
import ProjectPage from "../components/post/project/project-page";
import ReviewPage from "../components/post/review/review-page";

const Post: NextPage = () => {
    const router = useRouter()
    const postSlug = router.query.postSlug as string
    const post = trpc.posts.getSinglePost.useQuery(postSlug);
    const pageTitle = `${post.data?.title} - Griffin Baxter`

    useEffect(() => {
        if (post.data === null) {
            router?.push('/404/notfound')
        }
    });

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Post" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {post.data ? <NavBar
                    page={post.data.type == "PROJECT" ? NavigationPage.SoftwareProjects : NavigationPage.GameReviews}/> :
                <NavBar page={null}/>}

            <main className="container mx-auto flex flex-col justify-center p-4">
                {post.data ? (post.data.type == "PROJECT" ? <ProjectPage postObject={post.data}/> :
                    <ReviewPage postObject={post.data}/>) : <p></p>}
            </main>
        </>
    );
};

export default Post;
