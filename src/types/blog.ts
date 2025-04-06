
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  keywords: string[];
  author: string;
  publishDate: string;
  lastModified?: string;
  status: 'draft' | 'published';
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  authorEmail: string;
  content: string;
  date: string;
  approved: boolean;
}
