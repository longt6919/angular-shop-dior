// import { IsNumber, IsString } from "class-validator";
//  export class CartItemDTO{
//     @IsNumber()
//     product_id: number;
//     @IsNumber()
//     quantity: number;

//     constructor(data: any){
//         this.product_id = data.product_id;
//         this.quantity = data.quantity;
//     }
//  }
import { IsNumber } from "class-validator";

export class CartItemDTO {
  @IsNumber()
  product_id: number;

  @IsNumber()
  size_id: number;

  @IsNumber()
  color_id: number;

  @IsNumber()
  quantity: number;

  constructor(data: any) {
    this.product_id = data.product_id;
    this.size_id = data.size_id;
    this.color_id = data.color_id;
    this.quantity = data.quantity;
  }
}
