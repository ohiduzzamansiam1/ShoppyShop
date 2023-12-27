export interface SimplifiedProducts {
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  image: string;
  discountPercentage: number;
}
export interface FullProduct {
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  description: string;
  images: any;
  rating: number;
  totalRatings: number;
  discountPercentage: number;
}

export interface ProductCart {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  currency: string;
}
