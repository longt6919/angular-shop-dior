import { Role } from "./role";

export interface User{
    id: number;
    fullname: string;
    address: string;
    phone_number: string;
    email:string
    is_active: boolean;
    date_of_birth: Date ;
    create_at:Date;
    update_at:Date;
    active: boolean;
    facebook_account_id: string;
    google_account_id: string;
    role: Role;
}