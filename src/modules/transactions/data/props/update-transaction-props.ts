import { DocumentEntity } from "../../../../common/data/entities/document-entity";
import { TransactionCategoryEnum } from "../enums/transaction-category-enum";
import { TransactionTypeEnum } from "../enums/transaction-type-enum";

export interface UpdateTransactionProps {
  id: string;
  type: TransactionTypeEnum;
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: TransactionCategoryEnum;
  documentsToUpload: File[];
  documentsToRemove: DocumentEntity[];
}
