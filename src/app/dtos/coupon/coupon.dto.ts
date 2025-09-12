import { CouponCondition } from "src/app/models/coupon.condition";

export interface CouponDTO {
  code: string;
  couponConditions: CouponCondition[]; 
}