import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";

export interface TransactionDocumentUrlRepository {
  get: (
    transactionId: string,
    docId: string
  ) => Promise<Either<AppError, string>>;
}

export const transactionDocumentUrlRepository =
  (): TransactionDocumentUrlRepository => ({
    get: async (transactionId, docId): Promise<Either<AppError, string>> => {
      // TODO Implement
      console.log(transactionId, docId);

      return Either.right("http://localhost:9080/Invoice_March_2024.pdf");
    },
  });
