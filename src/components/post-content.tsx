import { type NextPage } from "next";

interface ContentText {
    text: string
}

interface ContentLink {
    link: string[2]
}

interface ContentGallery {
    gallery: string[]
}

interface ContentImage {
    image: string
}

export type Content = (ContentText | ContentLink | ContentGallery | ContentImage)[][]

interface Props {
    contentObject: Content
    postSlug: string
}

const PostContent: NextPage<Props> = ({contentObject: content, postSlug: slug}) => {
    let contentHTML = ""
    for (const paragraph of content) {
        contentHTML += `<p class="text-xl pt-8">`
        for (const section of paragraph) {
            if ("text" in section) {
                contentHTML += section.text
            } else if ("link" in section) {
                contentHTML += `<a class="underline text-blue-600 hover:text-blue-800" href="${section.link[1]}" target="_blank">${section.link[0]}</a>`
            } else if ("gallery" in section) {
                contentHTML += `<div class="flex flex-col items-center pt-10"><p class="text-3xl font-bold">Gallery</p>`
                for (const image of section.gallery) {
                    contentHTML += `<img class="pt-8" src=/images/posts/${slug}/${image} alt="Post Gallery Image"</img>`
                }
                contentHTML += `</div>`
            } else if ("image" in section) {
                contentHTML += `<div class="flex flex-col items-center"><img class="py-6" src=/images/posts/${slug}/${section.image} alt="Post Image"</img></div>`
            }
        }
        contentHTML += "</p>"
    }
    return <div className="pt-2" dangerouslySetInnerHTML={{ __html: contentHTML }} />
}

export default PostContent
