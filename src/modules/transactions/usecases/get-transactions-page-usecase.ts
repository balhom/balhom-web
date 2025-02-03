import { Either } from "../../../common/data/either";
import { PageEntity } from "../../../common/data/entities/page-entity";
import { AppError } from "../../../common/data/errors/app-error";
import { CurrencyProfileEntity } from "../../currency-profile/data/entities/currency-profile-entity";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionFiltersEntity } from "../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../data/enums/transaction-sort-enum";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionsPage = async (
  currencyProfile: CurrencyProfileEntity,
  type: TransactionTypeEnum,
  month: number,
  year: number,
  filters: TransactionFiltersEntity,
  sort: TransactionSortEnum,
  pageNum: number
): Promise<Either<AppError, PageEntity<TransactionEntity>>> => {
  return await transactionRepositoryInstance.get(
    currencyProfile,
    type,
    month,
    year,
    filters,
    sort,
    pageNum
  );
};
