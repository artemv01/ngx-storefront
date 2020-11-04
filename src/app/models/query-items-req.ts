export interface QueryItemsReq {
  sortType?: string;
  sortOrder?: string;
  search?: string;
  categoryId?: string;
  page: number;
  limit?: number;
}
