import {Cart} from './cart';
import {Product} from './product';

export interface CartDetail {
  cartDetailId: number;
  quantity: number;
  cart: Cart;
  product: Product;
}
