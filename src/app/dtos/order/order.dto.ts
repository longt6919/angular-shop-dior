
export class OrderDTO{
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note:string;
    status?: string;         // <-- thêm trường này
    total_money?:number;
    shipping_address: string
    shipping_method: string;
    shipping_date?: Date;
        delivery_date?: Date;
    order_date?:Date;
    payment_method: string;
    coupon_code:string;
      vnp_txn_ref?: string; // Thêm trường này để lưu mã tham chiếu VNPay
    cart_items:{product_id: number, quantity: number}[];// them cart item de luu tt gio hang
 constructor(data: any){
    this.user_id = data.user_id;
    this.fullname = data.fullname;
    this.email = data.email;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.note = data.note;
    this.status = data.status;
    this.order_date = data.order_date;
        this.delivery_date = data.delivery_date;
    this.total_money = data.total_money;
    this.shipping_address = data.shipping_address;
    this.shipping_method = data.shipping_method;
    this.payment_method = data.payment_method;
    this.coupon_code = data.coupon_code;
    this.cart_items = data.cart_items;
 }
}