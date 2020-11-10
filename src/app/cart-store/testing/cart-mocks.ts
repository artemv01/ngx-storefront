export const cartInitialForTest = {
  cartContent: {
    '5f6852394251e5e6aa22964f': {
      _id: '5f6852394251e5e6aa22964f',
      image:
        'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/74477fa2-47b0-4715-afb9-36a34d993d62.jpg',
      name: 'Alarm Clock Red Series',
      price: 140,
      quantity: 2,
    },
    '5f6852394251e5e6aa22964d': {
      _id: '5f6852394251e5e6aa22964d',
      image:
        'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/4babdab3-a1a6-4df6-9e7b-55aff5aeba0a.jpg',
      name: 'Bag Street Fashion 2020',
      price: 120,
      quantity: 1,
    },
  },
  totalPrice: 400,
  totalQuantity: 3,
  orderCreated: false,
  createOrderLoading: false,
};
export const testAddItem = {
  item: {
    _id: '5f6852394251e5e6aa22964e',
    image:
      'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/b9c13f30-43e5-4531-8532-1455dd94647e.jpg',
    name: 'Alarm Clock New Series Black',
    price: 143,
    quantity: 1,
  },
  result: {
    cartContent: {
      '5f6852394251e5e6aa22964f': {
        _id: '5f6852394251e5e6aa22964f',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/74477fa2-47b0-4715-afb9-36a34d993d62.jpg',
        name: 'Alarm Clock Red Series',
        price: 140,
        quantity: 2,
      },
      '5f6852394251e5e6aa22964e': {
        _id: '5f6852394251e5e6aa22964e',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/b9c13f30-43e5-4531-8532-1455dd94647e.jpg',
        name: 'Alarm Clock New Series Black',
        price: 143,
        quantity: 1,
      },
      '5f6852394251e5e6aa22964d': {
        _id: '5f6852394251e5e6aa22964d',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/4babdab3-a1a6-4df6-9e7b-55aff5aeba0a.jpg',
        name: 'Bag Street Fashion 2020',
        price: 120,
        quantity: 1,
      },
    },
    totalPrice: 543,
    totalQuantity: 4,
    orderCreated: false,
    createOrderLoading: false,
  },
};
export const testDeleteOne = {
  item: '5f6852394251e5e6aa22964d',
  result: {
    cartContent: {
      '5f6852394251e5e6aa22964f': {
        _id: '5f6852394251e5e6aa22964f',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/74477fa2-47b0-4715-afb9-36a34d993d62.jpg',
        name: 'Alarm Clock Red Series',
        price: 140,
        quantity: 2,
      },
    },
    totalPrice: 280,
    totalQuantity: 2,
    orderCreated: false,
    createOrderLoading: false,
  },
};
export const testUpdateOne = {
  item: { itemId: '5f6852394251e5e6aa22964f', quantity: 1 },
  result: {
    cartContent: {
      '5f6852394251e5e6aa22964f': {
        _id: '5f6852394251e5e6aa22964f',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/74477fa2-47b0-4715-afb9-36a34d993d62.jpg',
        name: 'Alarm Clock Red Series',
        price: 140,
        quantity: 1,
      },
      '5f6852394251e5e6aa22964d': {
        _id: '5f6852394251e5e6aa22964d',
        image:
          'https://ngx-storefront-backend.s3.eu-west-2.amazonaws.com/4babdab3-a1a6-4df6-9e7b-55aff5aeba0a.jpg',
        name: 'Bag Street Fashion 2020',
        price: 120,
        quantity: 1,
      },
    },
    totalPrice: 260,
    totalQuantity: 2,
    orderCreated: false,
    createOrderLoading: false,
  },
};
export const testCleanCart = {
  result: {
    cartContent: {},
    totalPrice: 0,
    totalQuantity: 0,
  },
};

export const testCreateOrder = {
  item: {
    billingAddress: {
      first_name: 'Artem',
      last_name: 'Artemev',
      address_line1: 'Novosibirskaya ulitsa 21',
      address_line2: '',
      zip: '200000',
      country: 'Russia',
      city: 'Moscow',
      state: '',
      email: 'arteitip@gmail.com',
      phone: '800000',
    },
    shippingAddress: {
      first_name: 'Artem',
      last_name: 'Artemev',
      address_line1: 'Novosibirskaya ulitsa 21',
      address_line2: '',
      zip: '200000',
      country: 'Russia',
      city: 'Moscow',
      state: '',
      email: 'arteitip@gmail.com',
      phone: '800000',
    },
    notes: '',
    cart: {
      '5f6852394251e5e6aa22964f': 2,
      '5f6852394251e5e6aa22964e': 2,
      '5f6852394251e5e6aa22964d': 2,
    },
    captcha:
      '03AGdBq26F5DmEbTg_WDDG2AB7T5p31NzPTQvPnbnZeyWHhG-dTPeQ7T49qVNneADT8KK4MCYClaAKxyHnR4ggbche4KqC7QcV3un-IScnfb_B35HFAWzuui2nNLj5D43cusdBHAdn94TF5s5WoSp2ZaYzdAF66bSqCkahUYTNaNL7H_00HrtJIH4WbTiqI-RPdY5PMlGBjz04vb5dABamAFkD7XLo2R9zpfrNRLiLw432NVWK-tLyMzvTPVAzK1uHxMsicMkt8pGbGXMdSwWB4nJdKhw-TNm64SDkIO4bMlSJQOjZhFsfvWlcz1IDSlh5VU6_1b0woebtjyudWchTwUJICbzVxNlhdCpGFAz27bZrVEAg1W4i5RCR1Sz7qgBjEhRUoMEs-xsbv-Gqn2xB9EmCU272fONC10Xs5nG7J0LGXA6xLmL_wL9IRGVByL_ioAW37psiBUKn',
  },
};
