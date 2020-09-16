export interface Review {
  authorName: string;

  authorEmail: string;

  rating: number;

  content: string;

  productName?: string;

  productId: string;

  createdAt?: string;
}
