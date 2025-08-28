import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

 export class InsertProductDTO{
    id: number
    @IsPhoneNumber()
    name:string;
    price:number;
    @IsString()
    @IsNotEmpty()
    description: string;
    category_id: number;
    brand_id: number;
    material_id: number;
    style_id: number;
    origin_id: number;
    image: File[]=[];
    constructor(data: any){
        this.id =data.id;
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