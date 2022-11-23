import { type NextPage } from "next";
import type { Block } from "../../server/wpgraphql/models";

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

function styleH4(html: string) {
    const isRating = html.endsWith("/10")
    if (isRating) {
        return `<p class="text-3xl font-bold text-center py-6">${styleLinks(html)}</p>`
    } else {
        return `<p class="text-3xl font-bold">${styleLinks(html)}</p>`
    }
}

function styleList(html: string) {
    return html.replaceAll("<li>", `<li class="text-xl pb-2">`)
}

function styleQuote(html: string) {
    return `
        <div class="p-8 border-l-2 border-blue-500">
            ${styleLinks(html.replaceAll("<p>", `<p class="text-xl pb-8">`))}
        </div>
    `
}

const PostContent: NextPage<Props> = ({ blocks }) => {
    let contentHTML = ""
    if (blocks) {
        for (const block of blocks) {
            contentHTML += `<p class="text-xl pt-8">`
            if (block.tagName == "p") {
                contentHTML += styleLinks(block.innerHtml)
            } else if (block.tagName == "h4") {
                contentHTML += styleH4(block.innerHtml)
            } else if (block.tagName == "ul") {
                contentHTML += styleList(block.innerHtml)
            } else if (block.tagName == "blockquote") {
                contentHTML += styleQuote(block.innerHtml)
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
