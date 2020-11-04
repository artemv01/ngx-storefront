export interface QueryItemsResp<T> {
  items: T[];
  pages: number;
  page: number;
  total: number;
  categoryName?: string;
}
