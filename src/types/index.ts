
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'butter' | 'oil' | 'soap' | 'cream' | 'other';
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  weight?: string;
  dimensions?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export type ProductCategory = 'all' | 'butter' | 'oil' | 'soap' | 'cream' | 'other';
