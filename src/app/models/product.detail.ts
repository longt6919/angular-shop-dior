import { Color } from "./color";
import { Order } from "./order";
import { Product } from "./product";
import { Size } from "./size";
export interface ProductDetails{
updateQuantity: number;
  product_detail_id: number;
  size_id: number;
  size_name: string;
  color_id: number;
  color_name: string;
  quantity: number;
}