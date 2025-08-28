"use client";

import { getPagination } from "@kaliber/pagination";
import { useEffect, useState } from "react";
import type { PostBlock } from "../../../models";
import Image from "next/image";

interface Props {
  blocks: PostBlock[];
}

export default function ProjectGallery({ blocks }: Props) {
  const numberOfSlides = blocks.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pagination, setPagination] = useState<(number | null)[]>([]);

  useEffect(() => {
    setPagination(
      getPagination({
        padding: 1,
        current: currentSlide + 1,
        max: numberOfSlides,
      }).map((slide) => (slide ? slide - 1 : null)),
    );
  }, [currentSlide, numberOfSlides]);

  return (
    <>
      <div className="carousel w-full overflow-x-hidden pt-6">
        {blocks.map((block, slideNumber) => {
          return (
            <div
              id={`slide${slideNumber.toString()}`}
              key={block.innerHtml}
              className="carousel-item relative aspect-16/9 w-full"
            >
              <Image
                className="mx-auto max-h-[675px]"
                src={
                  process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID
                    ? `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${block.innerHtml}`
                    : ""
                }
                alt={`Gallery Image (Slide ${(slideNumber + 1).toString()})`}
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
      <div className="join flex w-full flex-wrap justify-center pt-4">
        <button
          className="btn btn-sm sm:btn-md join-item w-8 sm:w-12"
          onClick={() => {
            const newSlide =
              currentSlide > 0 ? currentSlide - 1 : numberOfSlides - 1;
            document
              .getElementById(`slide${newSlide.toString()}`)
              ?.scrollIntoView({ behavior: "instant" });
            setCurrentSlide(newSlide);
          }}
        >
          ❮
        </button>
        {pagination.map((slideNumber, index) => {
          if (slideNumber === null) {
            return (
              <button
                key={index}
                className="join-item btn btn-disabled btn-sm sm:btn-md w-8 sm:w-12"
              >
                ...
              </button>
            );
          } else {
            return (
              <button
                key={index}
                className={`btn btn-sm sm:btn-md join-item w-8 sm:w-12 ${slideNumber === currentSlide ? "btn-active" : ""}`}
                onClick={() => {
                  document
                    .getElementById(`slide${slideNumber.toString()}`)
                    ?.scrollIntoView({ behavior: "instant" });
                  setCurrentSlide(slideNumber);
                }}
              >
                {(slideNumber + 1).toString()}
              </button>
            );
          }
        })}
        <button
          className="btn btn-sm sm:btn-md join-item w-8 sm:w-12"
          onClick={() => {
            const newSlide =
              currentSlide < numberOfSlides - 1 ? currentSlide + 1 : 0;
            document
              .getElementById(`slide${newSlide.toString()}`)
              ?.scrollIntoView({ behavior: "instant" });
            setCurrentSlide(newSlide);
          }}
        >
          ❯
        </button>
      </div>
    </>
  );
}
