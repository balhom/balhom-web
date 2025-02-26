import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";

export interface TransactionDocumentUrlRepository {
  get: (id: string) => Promise<Either<AppError, string>>;
}

export const transactionDocumentUrlRepository =
  (): TransactionDocumentUrlRepository => ({
    get: async (id): Promise<Either<AppError, string>> => {
      // TODO Implement
      console.log(id);

      return Either.right("http://localhost:9080/Invoice_March_2024.pdf");
    },
  });
