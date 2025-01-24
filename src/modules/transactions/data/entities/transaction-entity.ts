import { CurrencyEnum } from "../../../currency-profile/data/enums/currency-enum";
import { TransactionTypeEnum } from "../enums/transaction-type-enum";
import { TransactionCategoryEntity } from "./transaction-category-entity";

export interface TransactionEntity {
  id: string;
  title: string;
  description: string;
  type: TransactionTypeEnum;
  amount: number;
  currency: CurrencyEnum;
  date: Date;
  category: TransactionCategoryEntity;
}
