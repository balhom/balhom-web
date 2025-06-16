import { PageEntity } from "../../../common/data/entities/page-entity";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionFiltersEntity } from "../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../data/enums/transaction-sort-enum";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionsPage = async (
  currencyProfileId: string,
  type: TransactionTypeEnum,
  month: number,
  year: number,
  search: string,
  filters: TransactionFiltersEntity,
  sort: TransactionSortEnum,
  pageNum: number
): Promise<PageEntity<TransactionEntity>> => {
  return await transactionRepositoryInstance.list(
    currencyProfileId,
    type,
    month,
    year,
    search,
    filters,
    sort,
    pageNum
  );
};
