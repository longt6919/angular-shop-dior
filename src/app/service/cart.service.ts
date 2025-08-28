// import { Injectable } from '@angular/core';

import { Injectable } from "@angular/core";
import { CartItemView } from "../models/cart.item.view";
import { StockService } from "./stock.service";

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: Map<string, CartItemView> = new Map();

  constructor(
    private stockService: StockService
  ) {
    this.refreshCart();
  }

  private getCartKey(): string {
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    return `cart:${user?.id ?? ''}`;
  }

  refreshCart() {
    const storedCart = localStorage.getItem(this.getCartKey());
    if (storedCart) {
      const arr = JSON.parse(storedCart) as [string, CartItemView][];
      this.cart = new Map(arr);
    } else {
      this.cart = new Map<string, CartItemView>();
    }
  }

  addToCart(item: CartItemView): void {
    // Key hóa theo product_id-size_id-color_id (nếu dùng product_detail_id, thì key luôn là id)
    const key = `${item.product_id}-${item.size_id}-${item.color_id}`;
    //--
      const detailId = (item as any).product_detail_id;
  if (!detailId) {
    //---
    if (this.cart.has(key)) {
      // Nếu có rồi, tăng số lượng
      const exist = this.cart.get(key)!;
      exist.quantity += item.quantity;
      this.cart.set(key, exist);
    } else {
      this.cart.set(key, { ...item });
    }
    this.saveCartLocalStorage();
    return;
  }
   this.stockService.getAvailable(detailId).subscribe({
    next: (available: number) => {
      const exist = this.cart.get(key);
      const current = exist?.quantity ?? 0;

      // Số có thể thêm = available - current (không âm)
      const addable = Math.max(0, (available ?? 0) - current);
      const toAdd = Math.min(item.quantity, addable);

      if (toAdd <= 0) {
        // (tuỳ bạn) show toast: 'Số lượng vượt quá tồn hiện tại'
        return;
      }

      if (this.cart.has(key)) {
        const ex = this.cart.get(key)!;
        ex.quantity += toAdd;
        (ex as any).maxQty = available;          // lưu max để ràng buộc input ở trang giỏ
        this.cart.set(key, ex);
      } else {
        this.cart.set(key, { ...item, quantity: toAdd, maxQty: available } as any);
      }
      this.saveCartLocalStorage();
    },
    error: _ => {
      // Lỗi mạng/BE: fallback giữ nguyên hành vi cũ để không chặn user
      if (this.cart.has(key)) {
        const exist = this.cart.get(key)!;
        exist.quantity += item.quantity;
        this.cart.set(key, exist);
      } else {
        this.cart.set(key, { ...item });
      }
      this.saveCartLocalStorage();
    }
  });
  }
  getCart(): Map<string, CartItemView> {
    return this.cart;
  }

  private saveCartLocalStorage(): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }

  removeFromCart(item: CartItemView): void {
    const key = `${item.product_id}-${item.size_id}-${item.color_id}`;
    if (this.cart.has(key)) {
      this.cart.delete(key);
      this.saveCartLocalStorage();
    }
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartLocalStorage();
  }

  setCart(cart: Map<string, CartItemView>): void {
    this.cart = cart ?? new Map<string, CartItemView>();
    this.saveCartLocalStorage();
  }
}

