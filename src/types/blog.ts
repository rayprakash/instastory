
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  contentImages?: string[]; // Array to store additional content images
  keywords: string[];
  author: string;
  publishDate: string;
  lastModified?: string;
  status: 'draft' | 'published';
  imageAlt?: string; // Alt text for featured image
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

// Image upload specifications
export interface ImageUploadConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

// Default image upload config
export const defaultImageConfig: ImageUploadConfig = {
  maxWidth: 1200,
  maxHeight: 800,
  quality: 85,
  format: 'webp'
};
