import { FileReferenceDataResponseRestDto } from "../../../../common/data/dtos/file-reference-data-response-rest-dto";
import { categoryToImage } from "../../utils";
import { TransactionEntity } from "../entities/transaction-entity";
import { TransactionCategoryEnum } from "../enums/transaction-category-enum";
import { TransactionTypeEnum } from "../enums/transaction-type-enum";

export interface TransactionResponseRestDto {
  id: string;
  currencyProfileId: string;
  title: string;
  description?: string;
  type: TransactionTypeEnum;
  amount: number;
  date: string;
  category: TransactionCategoryEnum;
  documents: FileReferenceDataResponseRestDto[];
}

export function transactionResponseRestDtoToEntity(
  response: TransactionResponseRestDto
): TransactionEntity {
  return {
    id: response.id,
    title: response.title,
    description: response.description ?? "",
    type: response.type,
    amount: response.amount,
    date: new Date(response.date),
    category: {
      code: response.category,
      image: categoryToImage(response.category),
    },
    documents: response.documents.flatMap((doc) => {
      return {
        id: doc.id,
        name: doc.name,
        createdAt: doc.createdAt ? new Date(doc.createdAt) : undefined,
      };
    }),
  };
}
