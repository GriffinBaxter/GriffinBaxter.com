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
