import { IsDate } from "class-validator";

export class UpdateEmployeeDTO{
    fullname: string;
    address: string;
    phone_number: string;
            @IsDate()
    date_of_birth: Date ;
    email:string;
    constructor(data: any){
                this.fullname = data.fullname;
        this.address = data.address;
        this.phone_number = data.phone_number;
                this.date_of_birth = data.date_of_birth;
this.email = data.email;
    }
}