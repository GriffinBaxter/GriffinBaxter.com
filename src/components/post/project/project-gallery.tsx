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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
              className="relative carousel-item aspect-video w-full"
            >
              <Image
                className="mx-auto max-h-168.75"
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
      {numberOfSlides > 1 && (
        <div className="join flex w-full flex-wrap justify-center pt-4">
          <button
            className="btn join-item w-8 btn-sm sm:w-12 sm:btn-md"
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
                  className="btn btn-disabled join-item w-8 btn-sm sm:w-12 sm:btn-md"
                >
                  ...
                </button>
              );
            } else {
              return (
                <button
                  key={index}
                  className={`btn join-item w-8 btn-sm sm:w-12 sm:btn-md ${slideNumber === currentSlide ? "btn-active" : ""}`}
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
            className="btn join-item w-8 btn-sm sm:w-12 sm:btn-md"
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
      )}
    </>
  );
}
