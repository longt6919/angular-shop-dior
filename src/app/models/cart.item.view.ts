export interface CartItemView {
  product_detail_id: number;
  product_id: number;
  product_name: string;
  image_url: string;
  size_id: number;
  size_name: string;
  color_id: number;
  color_name: string;
  price: number;
  quantity: number;
  maxQty?: number
}
