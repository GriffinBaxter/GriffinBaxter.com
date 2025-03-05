"use client";

import { FaSortAmountDown } from "@react-icons/all-files/fa/FaSortAmountDown";
import { useState } from "react";
import type { Category } from "../../models";
import { motion } from "motion/react";
import { reviewMediumBadgeColour } from "../../components/post/post-header";
import Link from "next/link";
import { SiLetterboxd } from "@react-icons/all-files/si/SiLetterboxd";
import { FaGamepad } from "@react-icons/all-files/fa/FaGamepad";
import reviewsJson from "../../data/reviews.json";
import ReviewCard from "../../components/post/review/review-card";

interface Props {
  categories: Category[];
}

export default function ReviewsClient({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-3">
        <Link
          target="_blank"
          href="https://letterboxd.com/GriffinBaxter"
          rel="noreferrer"
          className="mx-auto my-2 sm:mx-0"
        >
          <button className="btn btn-secondary">
            <SiLetterboxd size={24} /> Letterboxd
          </button>
        </Link>
        <Link
          target="_blank"
          href="https://backloggd.com/u/GriffinBaxter"
          rel="noreferrer"
          className="mx-auto my-2 sm:mx-0"
        >
          <button className="btn btn-secondary">
            <FaGamepad size={24} /> Backloggd
          </button>
        </Link>
        <button
          className="btn btn-secondary mx-auto my-2 sm:mx-0"
          onClick={() => {
            (
              document.getElementById("games-ranked-modal") as HTMLDialogElement
            ).showModal();
          }}
        >
          <FaSortAmountDown size={24} /> Games Ranked
        </button>
      </div>
      <div className="py-8">
        {categories.map((category) => (
          <motion.button
            whileHover={{ scale: 1.075 }}
            whileTap={{ scale: 0.925 }}
            key={category.slug}
            className={`badge badge-lg ${
              reviewMediumBadgeColour[category.slug] as string
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
      <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {reviewsJson
          .filter((postDetails) =>
            selectedCategory
              ? postDetails.categories.nodes.find(
                  (category) => category.slug === selectedCategory,
                )
              : true,
          )
          .map((postDetails) => (
            <div key={postDetails.slug} className="max-w-sm">
              <ReviewCard postDetails={postDetails} />
            </div>
          ))}
      </div>
    </>
  );
}
