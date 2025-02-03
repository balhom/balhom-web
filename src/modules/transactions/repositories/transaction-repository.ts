import { Either } from "../../../common/data/either";
import { PageEntity } from "../../../common/data/entities/page-entity";
import { AppError } from "../../../common/data/errors/app-error";
import { mockExpenses, mockIncomes } from "../../../mocks/mock-transactions";
import { CurrencyProfileEntity } from "../../currency-profile/data/entities/currency-profile-entity";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionFiltersEntity } from "../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../data/enums/transaction-sort-enum";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { categoryToImage } from "../utils";

export interface TransactionRepository {
  get: (
    currencyProfile: CurrencyProfileEntity,
    type: TransactionTypeEnum,
    month: number,
    year: number,
    filters: TransactionFiltersEntity,
    sort: TransactionSortEnum,
    pageNum: number
  ) => Promise<Either<AppError, PageEntity<TransactionEntity>>>;
}

export const transactionRepository = (): TransactionRepository => ({
  get: async (
    currencyProfile,
    type,
    month,
    year,
    filters,
    sort,
    pageNum
  ): Promise<Either<AppError, PageEntity<TransactionEntity>>> => {
    let results: TransactionEntity[] = [];

    // TODO remove and do api call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(month, year, filters, sort);
    if (type === TransactionTypeEnum.Income) {
      results = mockIncomes;
    } else {
      results = mockExpenses;
    }

    results = results.map((transaction) => {
      return {
        ...transaction,
        currency: currencyProfile.currency,
        category: {
          code: transaction.category.code,
          image: categoryToImage(transaction.category.code),
        },
      };
    });

    return Either.right({
      firstPage: 0,
      lastPage: 4,
      pageNum: pageNum,
      results: results,
      totalElements: 50,
      pageSize: 10,
    });
  },
});
