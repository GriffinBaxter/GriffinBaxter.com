"use client";

import type { PostBlock } from "../../../models";
import Image from "next/image";

interface Props {
  blocks: PostBlock[];
}

export default function ProjectGallery({ blocks }: Props) {
  return (
    <div className="carousel w-full pt-6">
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
            <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
              <a
                className="btn btn-circle"
                onClick={() => {
                  document
                    .getElementById(
                      `slide${slideNumber > 0 ? (slideNumber - 1).toString() : (blocks.length - 1).toString()}`,
                    )
                    ?.scrollIntoView({ behavior: "instant" });
                }}
              >
                ❮
              </a>
              <a
                className="btn btn-circle"
                onClick={() => {
                  document
                    .getElementById(
                      `slide${slideNumber < blocks.length - 1 ? (slideNumber + 1).toString() : "0"}`,
                    )
                    ?.scrollIntoView({ behavior: "instant" });
                }}
              >
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
