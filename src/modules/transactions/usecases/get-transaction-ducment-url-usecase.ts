import { transactionDocumentUrlRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionDocumentUrl = async (
  transactionId: string,
  docId: string
): Promise<string> => {
  return await transactionDocumentUrlRepositoryInstance.get(
    transactionId,
    docId
  );
};
