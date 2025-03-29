"use client";

import { useState } from "react";
import { languageBadgeColour } from "../../components/post/post-header";
import projectsJson from "../../data/projects.json";
import ProjectCard from "../../components/post/project/project-card";
import type { Category } from "../../models";
import { motion } from "motion/react";

interface Props {
  categories: Category[];
}

export default function ProjectsClient({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      <div className="py-8">
        {categories.map((category) => (
          <motion.button
            whileHover={{ scale: 1.075 }}
            whileTap={{ scale: 0.925 }}
            key={category.slug}
            className={`badge badge-lg ${
              languageBadgeColour[category.slug] as string
            } m-1 drop-shadow ${
              selectedCategory && selectedCategory !== category.slug
                ? "opacity-25"
                : ""
            }`}
            onClick={() => {
              if (selectedCategory === category.slug) {
                setSelectedCategory(undefined);
              } else {
                setSelectedCategory(category.slug);
              }
            }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3"
      >
        {projectsJson
          .filter((postDetails) =>
            selectedCategory
              ? postDetails.categories.find(
                  (category) => category.slug === selectedCategory,
                )
              : true,
          )
          .map((project) => (
            <div key={project.slug} className="max-w-sm">
              <ProjectCard postDetails={project} />
            </div>
          ))}
      </motion.div>
    </>
  );
}
