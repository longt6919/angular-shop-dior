import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDTO{
     @IsString()
     @IsNotEmpty()
    name: string;
    @IsNumber()
    @IsPositive()
    price: number;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsNumber()
  @IsPositive()
    category_id: number;
      @IsPositive()
       brand_id: number;
         @IsPositive()
    material_id: number;
      @IsPositive()
    style_id: number;
      @IsPositive()
    origin_id: number;
      @IsOptional()
    images?: File[] =[];
  @IsOptional()
  thumbnail?: string;
    constructor(data: any){
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.category_id = data.category_id;
        this.brand_id = data.brand_id;
        this.material_id = data.material_id;
        this.style_id = data.style_id;
        this.origin_id = data.origin_id;
    }
}