import { Role } from "src/app/models/role";
export interface UserResponse{
    id: number;
    fullname: string;
    email:string;
    address: string;
    phone_number: string;
    is_active: boolean;
    date_of_birth: Date ;
    create_at: Date;
    update_at: Date;
    facebook_account_id: string;
    google_account_id: string;
    role: Role;
}