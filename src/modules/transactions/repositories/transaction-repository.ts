import {
  PageResponseRestDto,
  pageResponseRestDtoToEntity,
} from "../../../common/data/dtos/page-response-rest-dto";
import { PageEntity } from "../../../common/data/entities/page-entity";
import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  TRANSACTION_API_PATH,
  TRANSACTION_DOC_API_SUBPATH,
} from "../data/constants/transaction-api-constants";
import {
  TransactionPatchRequestRestDto,
  transactionUpdatePropsToPatchRequestRestDto,
} from "../data/dtos/transaction-patch-request-rest.dto";
import {
  transactionCreatePropsToPostRequestRestDto,
  TransactionPostRequestRestDto,
} from "../data/dtos/transaction-post-request-rest.dto";
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

  create: (props: CreateTransactionProps) => Promise<TransactionEntity>;

  update: (props: UpdateTransactionProps) => Promise<void>;

  delete: (id: string) => Promise<void>;
}

async function uploadTransactionFile(
  transactionId: string,
  file: File,
  httpService: HttpService
): Promise<void> {
  try {
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("name", file.name);
    imageFormData.append("mimetype", file.type);

    await httpService.postRequest<FormData, void>(
      `${TRANSACTION_API_PATH}/${transactionId}` +
        `${TRANSACTION_DOC_API_SUBPATH}`,
      imageFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log("Error uploading transaction file: ", error);
    throw new AppError("");
  }
}

async function deleteTransactionFile(
  transactionId: string,
  docId: string,
  httpService: HttpService
): Promise<void> {
  try {
    await httpService.deleteRequest<void>(
      `${TRANSACTION_API_PATH}/${transactionId}` +
        `${TRANSACTION_DOC_API_SUBPATH}/${docId}`
    );
  } catch (error) {
    console.log("Error deleting transaction file: ", error);
    throw new AppError("");
  }
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

  create: async (props: CreateTransactionProps): Promise<TransactionEntity> => {
    try {
      const request = transactionCreatePropsToPostRequestRestDto(props);

      const response = await httpService.postRequest<
        TransactionPostRequestRestDto,
        TransactionResponseRestDto
      >(TRANSACTION_API_PATH, request);

      const transactionResponse = transactionResponseRestDtoToEntity(response);

      props.documents.forEach((file) => {
        uploadTransactionFile(transactionResponse.id, file, httpService);
      });

      return transactionResponse;
    } catch (error) {
      console.log("Error creating transaction: ", error);
      throw new AppError("");
    }
  },

  update: async (props: UpdateTransactionProps): Promise<void> => {
    try {
      const request = transactionUpdatePropsToPatchRequestRestDto(props);

      await httpService.patchRequest<TransactionPatchRequestRestDto, void>(
        `${TRANSACTION_API_PATH}/${props.id}`,
        request
      );

      props.documentsToUpload.forEach((file) => {
        uploadTransactionFile(props.id, file, httpService);
      });

      props.documentsToRemove.forEach((doc) => {
        deleteTransactionFile(props.id, doc.id, httpService);
      });
    } catch (error) {
      console.log("Error updating transaction: ", error);
      throw new AppError("");
    }
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
