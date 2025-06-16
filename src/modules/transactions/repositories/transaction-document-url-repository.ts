import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  TRANSACTION_API_PATH,
  TRANSACTION_DOC_API_SUBPATH,
} from "../data/constants/transaction-api-constants";

export interface TransactionDocumentUrlRepository {
  get: (transactionId: string, docId: string) => Promise<string>;
}

export const transactionDocumentUrlRepository = (
  httpService: HttpService
): TransactionDocumentUrlRepository => ({
  get: async (transactionId, docId): Promise<string> => {
    try {
      const response = await httpService.getRequest<{ url: string }>(
        `${TRANSACTION_API_PATH}/${transactionId}` +
          `${TRANSACTION_DOC_API_SUBPATH}/${docId}`
      );

      return response.url;
    } catch (error) {
      console.log("Error fetching transaction document url: ", error);
      throw new AppError("");
    }
  },
});
