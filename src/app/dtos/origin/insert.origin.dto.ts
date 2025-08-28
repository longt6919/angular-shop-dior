import { IsNotEmpty, IsString } from "class-validator";


export class InsertOriginlDTO{
    @IsString()
    @IsNotEmpty()
    name: string;
    constructor(data:any){
        this.name = data.name;
    }
}