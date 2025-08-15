"use client";

import type { PostDetails } from "../../../models";
import { languageBadgeColour } from "../post-header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface Props {
  postDetails: PostDetails;
}

export default function ProjectCard({ postDetails }: Props) {
  return (
    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
      <Link href={postDetails.slug}>
        <div className="card bg-base-100 max-w-96 shadow-xl">
          <figure>
            <Image
              src={
                process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID
                  ? `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${postDetails.featuredImage}`
                  : ""
              }
              alt="Project Image"
              width={384}
              height={216}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{postDetails.title}</h2>
            <p className="font-semibold">{postDetails.excerpt}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {postDetails.categories.map((category) =>
                Object.keys(languageBadgeColour).includes(category.slug) ? (
                  <div
                    key={category.slug}
                    className={`badge ${languageBadgeColour[category.slug] as string}`}
                  >
                    {category.name}
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
