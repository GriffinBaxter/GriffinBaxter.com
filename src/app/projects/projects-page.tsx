"use client";

import { useState } from "react";
import { languageBadgeColour } from "../../components/post/post-header";
import projectsJson from "../../data/projects.json";
import ProjectCard from "../../components/post/project/project-card";
import type { Category } from "../../models";

interface Props {
  categories: Category[];
}

export default function ProjectsPage({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      <div className="py-8">
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`badge badge-lg ${
              languageBadgeColour[category.slug] as string
            } m-1 drop-shadow ${
              selectedCategory && selectedCategory !== category.slug
                ? "opacity-25"
                : ""
            }`}
            onClick={() => {
              selectedCategory === category.slug
                ? setSelectedCategory(undefined)
                : setSelectedCategory(category.slug);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {projectsJson
          .filter((project) =>
            selectedCategory
              ? project.categories.nodes.find(
                  (category) => category.slug === selectedCategory,
                )
              : true,
          )
          .map((project) => (
            <div key={project.slug} className="max-w-sm">
              <ProjectCard project={project} />
            </div>
          ))}
      </div>
    </>
  );
}
