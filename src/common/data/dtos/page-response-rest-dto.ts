import { PageEntity } from "../entities/page-entity";

export interface PageResponseRestDto<T> {
  totalElements: number;
  pageSize: number;
  pageIndex: number;
  firstPage: number;
  lastPage: number;
  results: T[];
}

export function pageResponseRestDtoToEntity<T, V>(
  response: PageResponseRestDto<T>,
  results: V[]
): PageEntity<V> {
  return {
    totalElements: response.totalElements,
    pageSize: response.pageSize,
    pageNum: response.pageIndex,
    firstPage: response.firstPage,
    lastPage: response.lastPage,
    results: results,
  };
}
