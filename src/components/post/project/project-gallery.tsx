import type { NextPage } from "next";
import type { Block } from "../../../models";
import Image from "next/image";

interface Props {
  blocks: Block[];
}

const ProjectGallery: NextPage<Props> = ({ blocks }) => {
  return (
    <div className="carousel w-full py-6">
      {blocks.map((block, index) => {
        const slideNumber = index + 1;
        return (
          <div
            id={`slide${slideNumber.toString()}`}
            key={block.innerHtml}
            className="carousel-item relative aspect-[16/9] w-full"
          >
            <Image
              className="mx-auto max-h-[675px]"
              src={`/images/${block.innerHtml}`}
              alt={`Gallery Image (Slide ${slideNumber.toString()})`}
              fill={true}
              style={{ objectFit: "contain" }}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slide${slideNumber > 1 ? (slideNumber - 1).toString() : blocks.length.toString()}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${slideNumber < blocks.length ? (slideNumber + 1).toString() : "1"}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectGallery;
