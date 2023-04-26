import {ProductType} from './product-type';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  imageList: string[];
  flagDelete: boolean;
  productType: ProductType;
}
