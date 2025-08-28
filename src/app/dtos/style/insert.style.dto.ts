import { IsNotEmpty, IsString } from "class-validator";


export class InsertStyleDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(data:any){
        this.name = data.name;
    }
}