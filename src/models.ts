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

export interface PostBlock {
  innerHtml: string;
  tagName: string;
  attributes?: BlockAttribute[];
}

export interface BlockAttribute {
  name: string;
  value: string;
}

export interface Slug {
  slug: string;
}
