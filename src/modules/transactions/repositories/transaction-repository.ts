import {
  PageResponseRestDto,
  pageResponseRestDtoToEntity,
} from "../../../common/data/dtos/page-response-rest-dto";
import { Either } from "../../../common/data/either";
import { PageEntity } from "../../../common/data/entities/page-entity";
import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import { TRANSACTION_API_PATH } from "../data/constants/transaction-api-constants";
import {
  TransactionResponseRestDto,
  transactionResponseRestDtoToEntity,
} from "../data/dtos/transaction-response-rest.dto";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionFiltersEntity } from "../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../data/enums/transaction-sort-enum";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { CreateTransactionProps } from "../data/props/create-transaction-props";
import { UpdateTransactionProps } from "../data/props/update-transaction-props";

export interface TransactionRepository {
  list: (
    currencyProfileId: string,
    type: TransactionTypeEnum,
    month: number,
    year: number,
    search: string,
    filters: TransactionFiltersEntity,
    sort: TransactionSortEnum,
    pageNum: number
  ) => Promise<PageEntity<TransactionEntity>>;

  get: (id: string) => Promise<TransactionEntity>;

  create: (props: CreateTransactionProps) => Promise<Either<AppError, void>>;

  update: (props: UpdateTransactionProps) => Promise<Either<AppError, void>>;

  delete: (id: string) => Promise<void>;
}

export const transactionRepository = (
  httpService: HttpService
): TransactionRepository => ({
  list: async (
    currencyProfileId,
    type,
    month,
    year,
    search,
    filters,
    sort,
    pageNum
  ): Promise<PageEntity<TransactionEntity>> => {
    try {
      const response = await httpService.getRequest<
        PageResponseRestDto<TransactionResponseRestDto>
      >(TRANSACTION_API_PATH, {
        params: {
          currencyProfileId: currencyProfileId,
          type: type,
          month: month,
          year: year,
          minAmount: filters.minAmount,
          maxAmount: filters.maxAmount,
          textSearch: search.length === 0 ? undefined : search,
          pageNum: pageNum,
          sortBy: sort,
        },
      });

      const page = pageResponseRestDtoToEntity(
        response,
        response.results.map(transactionResponseRestDtoToEntity)
      );

      return page;
    } catch (error) {
      console.log("Error fetching transactions: ", error);
      throw new AppError("");
    }
  },

  get: async (id): Promise<TransactionEntity> => {
    try {
      const response = await httpService.getRequest<TransactionResponseRestDto>(
        `${TRANSACTION_API_PATH}/${id}`
      );

      return transactionResponseRestDtoToEntity(response);
    } catch (error) {
      console.log("Error fetching transaction: ", error);
      throw new AppError("");
    }
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

  delete: async (id): Promise<void> => {
    try {
      await httpService.deleteRequest<void>(`${TRANSACTION_API_PATH}/${id}`);
    } catch (error) {
      console.log("Error deleting transaction: ", error);
      throw new AppError("");
    }
  },
});
