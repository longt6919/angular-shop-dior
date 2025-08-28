import { IsNotEmpty, IsString } from "class-validator";


export class InsertMaterialDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(data:any){
        this.name = data.name;
    }
}