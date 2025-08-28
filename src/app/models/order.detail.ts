import { Order } from "./order";
import { ProductDetails } from "./product.detail";
export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  product_detail_id: number;
  product_name: string;
  thumbnail?: string;
  size: string;
  color: string;
  price: number;
  number_of_products: number;
  total_money: number;
}
