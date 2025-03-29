"use client";

import ProjectCard from "../components/post/project/project-card";
import projectsJson from "../data/projects.json";
import { motion } from "motion/react";

const featuredProjectSlugs = [
  "codewof",
  "the-assembly-line",
  "griffinbaxter-com",
  "scaled-to-nothing",
  "video-speed-keys",
  "guess-it",
];

export default function HomeClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3"
    >
      {featuredProjectSlugs
        .map((slug) => projectsJson.find((project) => project.slug === slug))
        .map((project) =>
          project ? (
            <div key={project.slug} className="max-w-sm">
              <ProjectCard postDetails={project} />
            </div>
          ) : null,
        )}
    </motion.div>
  );
}
