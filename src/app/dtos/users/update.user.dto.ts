export class UpdateUserDTO{
    fullname: string;
    address: string;
    current_password: string;
    password: string;
    retype_password: string;
    date_of_birth: Date;
    constructor(data: any){
        this.fullname = data.fullname;
        this.address = data.address;
        this.current_password = data.current_password;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;
    }
}