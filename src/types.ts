export interface AppItem {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  downloads: number;
  icon: string;
  images: string[];
  playStoreUrl: string;
  category: string;
  developer: string;
  updatedAt: string;
  rating: number;
  size: string;
  timer?: number;
}

export type Category = 'All' | 'Finance' | 'Transport' | 'Delivery' | 'Education' | 'Communication' | 'Utilities';
