export type ProductCategory = 
  | 'ALL'
  | 'SAME_DAY'
  | 'CATERING_H1'
  | 'BEVERAGE'
  | 'SNACK';

export type DeliveryType = 'SAME_DAY' | 'PO_H1';

export interface ProductItem {
  id: string;
  name: string;
  kanjiName?: string;
  category: ProductCategory;
  deliveryType: DeliveryType;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  soldCount: number;
  image: string;
  description: string;
  ingredients?: string[];
  calories?: string;
  stock: number;
  badge?: string;
  supplierName: string;
  isGaPriorityEligible?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

