export class UpdateProductDetailDTO{
    quantity:number;
    constructor(data:any){
        this.quantity = data.quantity;
    }
}
