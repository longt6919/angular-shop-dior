import { ProductImage } from "././product.image";
export interface Product {
is_active: boolean;
  origin_id: number;
  origin_name: string;
  style_id: number;
  style_name: string;
  material_id: number;
  material_name: string;
  brand_id: number;
  brand_name: string;
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  category_id: number;
  category_name: string;
  url: string;
  product_images: ProductImage[];
}

  
  