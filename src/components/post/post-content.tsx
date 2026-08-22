import type { PostBlock } from "../../models";
import { rawHtmlDivider } from "../divider";

const styleLinks = (html: string) => {
  return html.replaceAll(
    "<a ",
    `<a class="wrap-break-word underline text-blue-600 hover:text-blue-800" target="_blank" `,
  );
};

const styleH4 = (html: string, attributes: string[] | undefined) => {
  const isCentre = attributes
    ? attributes.filter((attribute) => attribute === "textCenter").length
    : false;
  if (isCentre) {
    return `<p class="text-xl sm:text-2xl md:text-3xl font-bold text-center py-6">${styleLinks(
      html,
    )}</p>`;
  } else {
    return `<p class="text-xl sm:text-2xl md:text-3xl font-bold">${styleLinks(html)}</p>`;
  }
};

const styleList = (html: string) => {
  return `<ul class="list-disc list-inside">
    ${html.replaceAll(
      "<li>",
      `<li class="text-md sm:text-lg md:text-xl pb-2">`,
    )}
  </ul>`;
};

const styleQuote = (html: string) => {
  return `
    <div class="p-8 border-l-2 border-blue-500">
      ${styleLinks(html.replaceAll("<p>", `<p class="text-md sm:text-lg md:text-xl pb-8">`))}
    </div>
  `;
};

const styleImage = (fileName: string) => {
  return `
    <div class="flex flex-col items-center py-6">
      <img src="${
        process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID
          ? `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${fileName}`
          : ""
      }" alt="Post Image" class="max-h-168.75"/>
    </div>
  `;
};

const styleIframe = (html: string) => {
  return html.replaceAll(
    "<iframe ",
    `<iframe class="w-full max-h-168.75 aspect-video" `,
  );
};

interface Props {
  blocks: PostBlock[];
}

export default function PostContent({ blocks }: Props) {
  let contentHTML = "";
  for (const block of blocks) {
    contentHTML += `<p class="text-md sm:text-lg md:text-xl pt-8">`;
    switch (block.tagName) {
      case "p":
        contentHTML += styleLinks(block.innerHtml);
        break;
      case "h4":
        contentHTML += styleH4(block.innerHtml, block.attributes);
        break;
      case "ul":
        contentHTML += styleList(block.innerHtml);
        break;
      case "blockquote":
        contentHTML += styleQuote(block.innerHtml);
        break;
      case "figure":
        contentHTML += styleImage(block.innerHtml);
        break;
      case "iframe":
        contentHTML += styleIframe(block.innerHtml);
        break;
      case "hr":
        contentHTML += rawHtmlDivider;
        break;
      default:
        throw new Error(`Unhandled tagName`);
    }
    contentHTML += "</p>";
  }
  return (
    <div className="pt-2" dangerouslySetInnerHTML={{ __html: contentHTML }} />
  );
}
