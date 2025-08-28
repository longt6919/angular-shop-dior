import { IsNotEmpty, IsString } from "class-validator";


export class InsertColorlDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(data:any){
        this.name = data.name;
    }
}