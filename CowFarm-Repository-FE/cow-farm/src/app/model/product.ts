import {ProductType} from './product-type';
import {ProductUnit} from './product-unit';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  inventoryLevel: number;
  imageList: string[];
  flagDelete: boolean;
  productType: ProductType;
  productUnit: ProductUnit;
}
