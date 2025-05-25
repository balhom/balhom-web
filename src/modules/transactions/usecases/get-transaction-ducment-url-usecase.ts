import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { transactionDocumentUrlRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionDocumentUrl = async (
  transactionId: string,
  docId: string
): Promise<Either<AppError, string>> => {
  return await transactionDocumentUrlRepositoryInstance.get(
    transactionId,
    docId
  );
};
