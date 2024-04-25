import { type NextPage } from "next";
import type { Block, BlockAttribute } from "../../models";

const styleLinks = (html: string) => {
  return html.replaceAll(
    "<a ",
    `<a class="break-words underline text-blue-600 hover:text-blue-800" target="_blank" `,
  );
};

const styleH4 = (html: string, attributes: BlockAttribute[]) => {
  const isCentre =
    attributes.filter(
      (attribute) =>
        attribute.name == "textAlign" && attribute.value == "center",
    ).length > 0;
  if (isCentre) {
    return `<p class="text-xl sm:text-2xl md:text-3xl font-bold text-center py-6">${styleLinks(
      html,
    )}</p>`;
  } else {
    return `<p class="text-xl sm:text-2xl md:text-3xl font-bold">${styleLinks(html)}</p>`;
  }
};

const styleList = (html: string) => {
  return html.replaceAll(
    "<li>",
    `<li class="text-md sm:text-lg md:text-xl pb-2">`,
  );
};

const styleQuote = (html: string) => {
  return `
    <div class="p-8 border-l-2 border-blue-500">
      ${styleLinks(html.replaceAll("<p>", `<p class="text-md sm:text-lg md:text-xl pb-8">`))}
    </div>
  `;
};

const styleImage = (fileName: string) => {
  return `<img src="/images/${fileName}" alt="Post Image" class="max-h-[675px]"/>`;
};

const contentDivider = `
  <div class="relative flex w-full items-center py-5 py-8">
    <div class="flex-grow border-t border-gray-400"></div>
    <span class="mx-4 flex-shrink select-none text-gray-400">//</span>
    <div class="flex-grow border-t border-gray-400"></div>
  </div>
`;

interface Props {
  blocks: Block[];
}

const PostContent: NextPage<Props> = ({ blocks }) => {
  let contentHTML = "";
  if (blocks) {
    for (const block of blocks) {
      contentHTML += `<p class="text-md sm:text-lg md:text-xl pt-8">`;
      if (block.tagName == "p") {
        contentHTML += styleLinks(block.innerHtml);
      } else if (block.tagName == "h4") {
        contentHTML += styleH4(block.innerHtml, block.attributes);
      } else if (block.tagName == "ul") {
        contentHTML += styleList(block.innerHtml);
      } else if (block.tagName == "blockquote") {
        contentHTML += styleQuote(block.innerHtml);
      } else if (block.tagName == "figure") {
        contentHTML += `<div class="flex flex-col items-center py-6">${styleImage(
          block.innerHtml,
        )}</div>`;
      } else if (block.tagName == "hr") {
        contentHTML += contentDivider;
      }
      contentHTML += "</p>";
    }
  }
  return (
    <div className="pt-2" dangerouslySetInnerHTML={{ __html: contentHTML }} />
  );
};

export default PostContent;
