import { TransactionCategoryPointEntity } from "../../../transactions/data/entities/transaction-category-statistics-entity";
import { TransactionCategoryEnum } from "../../../transactions/data/enums/transaction-category-enum";
import { TransactionTypeEnum } from "../../../transactions/data/enums/transaction-type-enum";
import { categoryToImage } from "../../../transactions/utils";

export interface CategoryTransactionStatisticResponseRestDto {
  currencyProfileId: string;
  month: number;
  year: number;
  type: TransactionTypeEnum;
  category: TransactionCategoryEnum;
  value: number;
}

export function categoryTransactionStatisticResponseRestDtoToEntity(
  response: CategoryTransactionStatisticResponseRestDto
): TransactionCategoryPointEntity {
  return {
    category: {
      code: response.category,
      image: categoryToImage(response.category),
    },
    value: response.value,
  };
}
