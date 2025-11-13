export interface RecommendProductApiResponse {
  content: ProductContentItem[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
}


export interface ProductContentItem {
  id: string;
  userId: string;
  product: ProductData;
}

export interface ProductData {
  id: string;
  category: string;
  overallRank: number;
  pageNumber: number;
  pageRank: number;
  brand: string;
  productName: string;
  listPrice: number;
  salePrice: number;
  reviewScore: number;
  reviewCount: number;
  ingredients: string;
  description: string;
  tags: string;
  bestOrNew: string;
  imageUrl: string;
  productUrl: string;
}
