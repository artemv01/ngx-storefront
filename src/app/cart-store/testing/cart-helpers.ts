import { CartState } from '../cart.reducer';

import { initialState } from '@app/cart-store/cart.reducer';
const cartContent = {
  '5f68523a4251e5e6aa229653': {
    _id: '5f68523a4251e5e6aa229653',
    image:
      'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/d2caf5a7-47fb-4d49-be99-80982d38c6bb.jpg',
    name: 'Watch 001 Series',
    price: 93,
    quantity: 1,
  },
  '5f68523a4251e5e6aa229651': {
    _id: '5f68523a4251e5e6aa229651',
    image:
      'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/02c1061c-1e8b-4292-b185-ccd46d750346.jpg',
    name: 'Watch 53 Series Unique',
    price: 103,
    quantity: 2,
  },
};
const totalPrice = 299;
const totalQuantity = 12;

export const setTestingCart = () => {
  localStorage.setItem('cartContent', JSON.stringify(cartContent));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

export const getTestingCart = (): CartState => {
  return {
    ...initialState,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
    cartContent: cartContent,
  };
};
