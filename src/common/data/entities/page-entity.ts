export interface PageEntity<T> {
  totalElements: number;
  pageSize?: number;
  pageNum: number;
  firstPage: number;
  lastPage: number;
  results: T[];
}
