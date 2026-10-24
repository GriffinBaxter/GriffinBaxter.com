import Navbar, { NavigationPage } from "../../components/navbar";
import { getProject } from "../../project-content";
import PostClient from "./post-client";
import { notFound } from "next/navigation";

interface Props {
  slugs?: string[];
  postSlug: string;
}

export default function Post({ postSlug }: Props) {
  const projectPost = getProject(postSlug);
  if (!projectPost) {
    notFound();
  }

  return (
    <>
      <Navbar currentPage={NavigationPage.Projects} />

      <PostClient
        html={projectPost.html}
        gallery={projectPost.gallery}
        post={projectPost.project}
      />
    </>
  );
}
