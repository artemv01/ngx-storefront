import { Injectable, OnInit } from '@angular/core';
import { Product } from '@app/models/product';
import { Subject, BehaviorSubject } from 'rxjs';

type Price = number;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartContent: Record<string, Product> = {};
  totalPrice = 0;
  totalQuantity = 0;

  constructor() {
    let cartContent = localStorage.getItem('cartContent');
    let totalPrice = localStorage.getItem('totalPrice');
    let totalQuantity = localStorage.getItem('totalQuantity');
    this.cartContent = cartContent ? JSON.parse(cartContent) : {};
    this.totalPrice = totalPrice ? JSON.parse(totalPrice) : 0;
    this.totalQuantity = totalQuantity ? JSON.parse(totalQuantity) : 0;
  }

  add(product: Product) {
    if (this.cartContent[product._id]) {
      const currentQuantity = this.cartContent[product._id].quantity;

      this.totalPrice -= this.cartContent[product._id].price * currentQuantity;

      this.cartContent[product._id].quantity += product.quantity;
      this.totalPrice +=
        this.cartContent[product._id].quantity *
        this.cartContent[product._id].price;
      this.totalQuantity += product.quantity;

      this.writeCart();
      return;
    }
    this.cartContent[product._id] = product;
    this.totalPrice += product.quantity * product.price;
    this.totalQuantity += product.quantity;
    this.writeCart();
  }

  updateTotals() {
    let newTotal = 0;
    let newQuantity = 0;
    for (const [productId, product] of Object.entries(this.cartContent)) {
      newTotal += product.price * product.quantity;
      newQuantity += product.quantity;
    }
    this.totalPrice = newTotal;
    this.totalQuantity = newQuantity;
    this.writeCart();
  }

  delete(productId: string) {
    const quantity = this.cartContent[productId].quantity;
    const total =
      this.cartContent[productId].price * this.cartContent[productId].quantity;
    this.totalPrice -= total;
    this.totalQuantity -= quantity;

    delete this.cartContent[productId];
    this.writeCart();
  }

  getContentForRequest() {
    const cart = {};
    for (const [productId, product] of Object.entries(this.cartContent)) {
      cart[productId] = product.quantity;
    }
    return cart;
  }

  clean() {
    this.cartContent = {};
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.writeCart();
  }

  private writeCart() {
    localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    localStorage.setItem('totalQuantity', JSON.stringify(this.totalQuantity));
  }
}
