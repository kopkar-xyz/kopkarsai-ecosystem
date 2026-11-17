export type MainCategoryId = 'jajanan' | 'roti' | 'camilan' | 'siap-santap' | 'minuman';
export type SubCategoryId = 'all' | 'manis' | 'gurih' | 'pedas' | 'dingin';

export interface FoodProduct {
  id: string;
  name: string;
  kanjiName?: string;
  category: MainCategoryId;
  subCategory: Exclude<SubCategoryId, 'all'>;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: string;
  soldCount: string;
  image: string;
  description: string;
  fullDescription?: string;
  ingredients?: string;
  volume?: string;
  calories?: string;
  likes?: number;
  badge?: string;
  discountBadge?: string;
}
