import { Either } from "../../../common/data/either";
import { PageEntity } from "../../../common/data/entities/page-entity";
import { AppError } from "../../../common/data/errors/app-error";
import { mockExpenses, mockIncomes } from "../../../mocks/mock-transactions";
import { CurrencyProfileEntity } from "../../currency-profile/data/entities/currency-profile-entity";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionFiltersEntity } from "../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../data/enums/transaction-sort-enum";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { CreateTransactionProps } from "../data/props/create-transaction-props";
import { UpdateTransactionProps } from "../data/props/update-transaction-props";
import { categoryToImage } from "../utils";

export interface TransactionRepository {
  list: (
    currencyProfile: CurrencyProfileEntity,
    type: TransactionTypeEnum,
    month: number,
    year: number,
    search: string,
    filters: TransactionFiltersEntity,
    sort: TransactionSortEnum,
    pageNum: number
  ) => Promise<Either<AppError, PageEntity<TransactionEntity>>>;

  get: (
    id: string,
    type: TransactionTypeEnum,
    currencyProfile: CurrencyProfileEntity
  ) => Promise<Either<AppError, TransactionEntity>>;

  create: (props: CreateTransactionProps) => Promise<Either<AppError, void>>;

  update: (props: UpdateTransactionProps) => Promise<Either<AppError, void>>;

  delete: (
    id: string,
    type: TransactionTypeEnum,
    currencyProfile: CurrencyProfileEntity
  ) => Promise<Either<AppError, void>>;
}

export const transactionRepository = (): TransactionRepository => ({
  list: async (
    currencyProfile,
    type,
    month,
    year,
    search: string,
    filters,
    sort,
    pageNum
  ): Promise<Either<AppError, PageEntity<TransactionEntity>>> => {
    let results: TransactionEntity[] = [];

    // TODO remove and do api call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(month, year, search, filters, sort);
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

  get: async (
    id,
    type,
    currencyProfile
  ): Promise<Either<AppError, TransactionEntity>> => {
    // TODO Implement
    console.log(id);

    if (type === TransactionTypeEnum.Income) {
      const transaction = mockIncomes.find((t) => t.id === id);
      if (transaction) {
        return Either.right({
          ...transaction,
          currency: currencyProfile.currency,
          category: {
            code: transaction.category.code,
            image: categoryToImage(transaction.category.code),
          },
        });
      }
    } else {
      const transaction = mockExpenses.find((t) => t.id === id);
      if (transaction) {
        return Either.right({
          ...transaction,
          currency: currencyProfile.currency,
          category: {
            code: transaction.category.code,
            image: categoryToImage(transaction.category.code),
          },
        });
      }
    }

    return Either.left(new AppError(""));
  },

  create: async (props): Promise<Either<AppError, void>> => {
    // TODO Implement
    console.log(props);

    // TODO take in mind to upload documents

    return Either.right(undefined);
  },

  update: async (props): Promise<Either<AppError, void>> => {
    // TODO Implement
    console.log(props);

    // TODO take in mind to upload documents

    return Either.right(undefined);
  },

  delete: async (
    id,
    type,
    currencyProfile
  ): Promise<Either<AppError, void>> => {
    // TODO Implement
    console.log(id, type, currencyProfile);

    return Either.right(undefined);
  },
});
