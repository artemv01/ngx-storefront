import { CartState } from './cart.reducer';

export function saveCartState(cart: Partial<CartState>): void {
  localStorage.setItem('cartContent', JSON.stringify(cart.cartContent));
  localStorage.setItem('totalPrice', JSON.stringify(cart.totalPrice));
  localStorage.setItem('totalQuantity', JSON.stringify(cart.totalQuantity));
}
