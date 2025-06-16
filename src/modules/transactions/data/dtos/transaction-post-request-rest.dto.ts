import { TransactionCategoryEnum } from "../enums/transaction-category-enum";
import { TransactionTypeEnum } from "../enums/transaction-type-enum";
import { CreateTransactionProps } from "../props/create-transaction-props";

export interface TransactionPostRequestRestDto {
  currencyProfileId: string;
  title: string;
  description: string;
  type: TransactionTypeEnum;
  amount: number;
  date: string;
  category: TransactionCategoryEnum;
}

export function transactionCreatePropsToPostRequestRestDto(
  props: CreateTransactionProps
): TransactionPostRequestRestDto {
  return {
    currencyProfileId: props.currencyProfileId,
    title: props.title,
    description: props.description,
    type: props.type,
    amount: props.amount,
    date: props.date.toISOString(),
    category: props.category,
  };
}
