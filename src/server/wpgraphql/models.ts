interface Category {
    name: string,
    slug: string,
}

interface Post {
    slug: string,
    title: string,
    excerpt: string,
    featuredImage: { node: { sourceUrl: string } },
}

export interface Project extends Post {
    categories: { nodes: Category[] },
}

export interface Review extends Post {
    date: string,
}

export interface Block {
    innerHtml: string,
    tagName: string,
}

export interface SinglePost extends Project, Review {
    blocks: Block[]
}

export interface Slug {
    slug: string
}
