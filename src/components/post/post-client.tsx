"use client";

import { motion, useSpring, useScroll } from "motion/react";
import PostHeader from "../post/post-header";
import ProjectGallery from "../post/project/project-gallery";
import type { PostDetails } from "../../models";

interface Props {
  html: string;
  gallery: string[];
  post: PostDetails;
}

export default function PostClient({ html, gallery, post }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const hasGallery = gallery.length > 0;

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
        className="container mx-auto flex max-w-300 flex-col justify-center px-8 pb-16"
      >
        <PostHeader postDetails={post} />
        <div
          className="markdown-content prose max-w-none pt-2 sm:prose-lg md:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {hasGallery ? <ProjectGallery images={gallery} /> : null}
      </motion.main>
    </>
  );
}
