import { Product } from './product';

export interface Order {
  shippingAddress: Address;
  billingAddress: Address;
  cart: Record<Product['_id'], number>;
  notes: string;
  captcha: string;
}
export interface Address {
  address_line1: string;
  address_line2: string;
  zip: string;
  country: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}
