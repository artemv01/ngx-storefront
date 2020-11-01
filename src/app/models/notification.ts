export interface Notification {
  type?: 'success' | 'info' | 'danger';
  message?: string;
  show?: boolean;
  showMessage?: 'addToCartSuccess';
  key?: number;
}
