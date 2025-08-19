"use client";

import { motion, useSpring, useScroll } from "motion/react";
import PostContent from "../post/post-content";
import PostHeader from "../post/post-header";
import ProjectGallery from "../post/project/project-gallery";
import type { PostDetails, PostBlock } from "../../models";

interface Props {
  postContent: PostBlock[];
  isProject: boolean;
  post: PostDetails;
}

export default function PostClient({ postContent, isProject, post }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const galleryBlockIndex = postContent.findLastIndex(
    (block) => block.tagName === "h4" && block.innerHtml === "Gallery",
  );
  const hasGallery = isProject && galleryBlockIndex !== -1;

  return (
    <>
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 7.5,
          originX: 0,
          backgroundColor: "#3182ce",
          opacity: 0.75,
        }}
      />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto flex max-w-[1200px] flex-col justify-center px-8 pb-16"
      >
        <PostHeader postDetails={post} isProject={isProject} />
        <PostContent
          blocks={
            hasGallery ? postContent.slice(0, galleryBlockIndex) : postContent
          }
        />
        {hasGallery ? (
          <ProjectGallery blocks={postContent.slice(galleryBlockIndex + 1)} />
        ) : null}
      </motion.main>
    </>
  );
}
