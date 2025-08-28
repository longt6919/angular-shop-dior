import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMaterialDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(data: any){
        this.name = data.name;
    }
}