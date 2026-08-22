export interface Category {
  name: string;
  slug: string;
}

export interface PostDetails {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  categories: Category[];
}

export type PostBlockTag =
  "p" | "h4" | "ul" | "blockquote" | "figure" | "iframe" | "hr";

export interface PostBlock {
  innerHtml: string;
  tagName: PostBlockTag;
  attributes?: string[];
}
