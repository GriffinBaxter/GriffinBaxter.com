import { type NextPage } from "next";
import { type Block } from "../../lib/api";

interface Props {
    blocks: Block[]
}

function divider() {
    return `
        <div class="relative flex py-2 items-center w-full">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">//</span>
            <div class="flex-grow border-t border-gray-400"></div>
        </div>
    `
}

function styleLinks(html: string) {
    return html.replaceAll(
        "<a ",
        `<a class="underline text-blue-600 hover:text-blue-800" target="_blank" `,
    )
}

const PostContent: NextPage<Props> = ({ blocks }) => {
    let contentHTML = ""
    if (blocks) {
        for (const block of blocks) { // TODO: cover all tag scenarios
            contentHTML += `<p class="text-xl pt-8">`
            if (block.tagName == "p") {
                contentHTML += styleLinks(block.innerHtml)
            } else if (block.tagName == "h4") {
                contentHTML += styleLinks(block.innerHtml)  // TODO: update h4 styling
            } else if (block.tagName == "hr") {
                contentHTML += divider()
            } else if (block.tagName == "figure") {
                contentHTML += `<div class="flex flex-col items-center py-6">${block.innerHtml}</div>`
            }
            contentHTML += "</p>"
        }
    }
    return <div className="pt-2" dangerouslySetInnerHTML={{ __html: contentHTML }} />
}

export default PostContent
