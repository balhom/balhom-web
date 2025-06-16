import { TransactionCategoryEnum } from "../enums/transaction-category-enum";
import { UpdateTransactionProps } from "../props/update-transaction-props";

export interface TransactionPatchRequestRestDto {
  title?: string;
  description?: string;
  amount?: number;
  date?: string;
  category?: TransactionCategoryEnum;
}

export function transactionUpdatePropsToPatchRequestRestDto(
  props: UpdateTransactionProps
): TransactionPatchRequestRestDto {
  return {
    title: props.title,
    description: props.description,
    amount: props.amount,
    date: props.date.toISOString(),
    category: props.category,
  };
}
