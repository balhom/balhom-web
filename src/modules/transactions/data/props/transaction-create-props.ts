import { TransactionCategoryEnum } from "../enums/transaction-category-enum";
import { TransactionTypeEnum } from "../enums/transaction-type-enum";

export interface TransactionCreateProps {
  type: TransactionTypeEnum;
  title: string;
  description: string;
  amount: number;
  date: Date;
  category: TransactionCategoryEnum;
  documents: Array<File>;
}
