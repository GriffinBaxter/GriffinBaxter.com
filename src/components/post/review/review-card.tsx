"use client";

import type { PostDetails } from "../../../models";
import { months, reviewMediumBadgeColour } from "../post-header";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface Props {
  postDetails: PostDetails;
}

export default function ReviewCard({ postDetails }: Props) {
  const date = new Date(postDetails.date);
  return (
    <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
      <Link href={postDetails.slug}>
        <div className="card bg-base-100 max-w-96 shadow-xl">
          <figure>
            <Image
              src={`/images/${postDetails.featuredImage.node.sourceUrl}`}
              alt="Review Image"
              width={384}
              height={216}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{postDetails.title}</h2>
            <p className="font-semibold">{postDetails.excerpt}</p>
            <p>
              {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {postDetails.categories.nodes.map((category) => (
                <div
                  key={category.slug}
                  className={`badge ${reviewMediumBadgeColour[category.slug] as string}`}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
