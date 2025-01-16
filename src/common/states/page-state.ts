import { PageEntity } from "../data/entities/page-entity";
import { AppError } from "../data/errors/app-error";

export interface PageState<T> {
  pageEntity?: PageEntity<T>;
  isLoading: boolean;
  error?: AppError;
}
