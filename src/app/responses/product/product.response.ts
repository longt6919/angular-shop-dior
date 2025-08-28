import { Brand } from "src/app/models/brand";
import { Category } from "src/app/models/category";
import { Material } from "src/app/models/material";
import { Origin } from "src/app/models/origin";
import { ProductDetails } from "src/app/models/product.detail";
import { ProductImage } from "src/app/models/product.image";
import { Style } from "src/app/models/style";

export interface ProductResponse{
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    category : Category;
    origin: Origin;
    style: Style;
    material: Material;
    brand: Brand;
    productImages:ProductImage[];
    productDetails: ProductDetails[]

}