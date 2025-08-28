import { ProductDetails } from "../../models/product.detail";

export interface ProductDetailListResponse {
  productDetails: ProductDetails[];
  totalPages: number;
  totalElements: number;
}