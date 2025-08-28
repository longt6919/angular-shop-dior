import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss']
})
export class PaymentCallbackComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private orderService: OrderService,
    private toastService: ToastService,
    private cartService: CartService,
    private router: Router
  ) { }
loading: boolean = true;
  paymentSuccess: boolean = false;

  ngOnInit(): void {
    // Sử dụng this.activatedRoute từ BaseComponent
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      const vnp_ResponseCode = params['vnp_ResponseCode']; // Mã phản hồi từ VNPay
      const orderId:number = Number(params['vnp_TxnRef']); // Mã đơn hàng (nếu bạn truyền vào khi tạo URL thanh toán)
      debugger
      if (vnp_ResponseCode === '00') {
        // Thanh toán thành công
           this.toastService.showToast({
      error: null,
      defaultMsg: 'Thanh toán thành công',
      title: 'Thành công'
    }); 
          setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/']);
      }, 3000);
  
      } else {
        // Thanh toán thất bại
        this.handlePaymentFailure();
      }
    });
  }

  


  handlePaymentFailure(): void {
    this.loading = false;
    this.paymentSuccess = false;
    this.toastService.showToast({
      error: null,
      defaultMsg: 'Thanh toán thất bại. Vui lòng thử lại.',
      title: 'Lỗi'
    });
    // Chuyển hướng về trang thanh toán hoặc trang chủ
    setTimeout(() => {
      this.router.navigate(['/checkout']);
    }, 3000);
  }

}
