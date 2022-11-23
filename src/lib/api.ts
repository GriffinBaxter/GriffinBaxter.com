import {env} from "../env/server.mjs";

interface Category {
    name: string,
    slug: string,
}

export interface Project {
    slug: string,
    title: string,
    categories: { nodes: Category[] }
    excerpt: string,
    featuredImage: { node: { sourceUrl: string } },
}

export interface Block {
    innerHtml: string,
    tagName: string,
}

export interface Post extends Project {
    blocks: Block[]
}

interface Slug {
    slug: string
}

async function fetchAPI(query: string) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
    }

    const res = await fetch(env.WORDPRESS_API_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            query,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getAllProjects(): Promise<Project[]> {
    const data = await fetchAPI(`
    {
        posts(where: {categoryName: "projects"}) {
            nodes {
                slug
                title
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                excerpt(format: RAW)
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
            }
        }
    }
    `)
    return data?.posts.nodes
}

export async function getSinglePost(slug: string): Promise<Post> {
    const data = await fetchAPI(`
    {
        post(id: "${slug}", idType: SLUG) {
            blocks {
                innerHtml
                tagName
            }
            title
            categories {
                nodes {
                    name
                    slug
                }
            }
            excerpt(format: RAW)
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }
    `)
    return data?.post
}

export async function getAllPostSlugs(): Promise<Slug[]> {
    const data = await fetchAPI(`
    {
        posts(first: 100) {
            nodes {
                slug
            }
        }
    }
    `)
    return data?.posts.nodes
}
