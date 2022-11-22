import {env} from "../env/server.mjs";

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

export async function getAllProjects() {
    const data = await fetchAPI(`
    {
        posts(where: {categoryName: "projects"}) {
            nodes {
                slug
                title
                categories {
                    nodes {
                        name
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

export async function getSinglePost(slug: string) {
    const data = await fetchAPI(`
    {
        post(id: "${slug}", idType: SLUG) {
            blocks {
                type
                innerHtml
            }
        }
    }
    `)
    return data?.post
}
