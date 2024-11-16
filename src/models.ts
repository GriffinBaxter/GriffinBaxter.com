export interface Category {
  name: string;
  slug: string;
}

export interface PostDetails {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: { node: { sourceUrl: string } };
  date: string;
  categories?: { nodes: Category[] };
}

export interface Post {
  blocks: Block[];
}

export interface BlockAttribute {
  name: string;
  value: string;
}

export interface Block {
  innerHtml: string;
  tagName: string;
  attributes?: BlockAttribute[];
}

export interface Slug {
  slug: string;
}
