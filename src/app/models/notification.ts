export interface Notification {
  type?: 'success' | 'info' | 'error';
  message?: string;
  show?: boolean;
  showMessage?: 'addToCartSuccess';
  key?: number;
}
