"use client";

import ProjectCard from "../components/post/project/project-card";
import type { PostDetails } from "../models";
import { motion } from "motion/react";

interface Props {
  featuredProjects: PostDetails[];
}

export default function HomeClient({ featuredProjects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3"
    >
      {featuredProjects.map((project) => (
        <div key={project.slug} className="max-w-sm">
          <ProjectCard postDetails={project} imageLoading="eager" />
        </div>
      ))}
    </motion.div>
  );
}
