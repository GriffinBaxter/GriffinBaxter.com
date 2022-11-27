import {env} from "../../env/server.mjs";
import type {Project, Review, SinglePost, Slug} from "./models";

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

export async function getProjects(first = 100): Promise<Project[]> {
    const data = await fetchAPI(`
    {
        posts(where: {categoryName: "projects"}, first: ${first}) {
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

export async function getReviews(first = 100): Promise<Review[]> {
    const data = await fetchAPI(`
    {
        posts(where: {categoryName: "game-reviews"}, first: ${first}) {
            nodes {
                slug
                title
                excerpt(format: RAW)
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                date
            }
        }
    }
    `)
    return data?.posts.nodes
}

export async function getSinglePost(slug: string): Promise<SinglePost> {
    const data = await fetchAPI(`
    {
        post(id: "${slug}", idType: SLUG) {
            blocks {
                innerHtml
                tagName
                attributes {
                    name
                    value
                }
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
            date
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
