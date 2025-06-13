import { FileReferenceDataResponseRestDto } from "../../../../common/data/dtos/file-reference-data-response-rest-dto";
import { CurrencyProfileEntity } from "../entities/currency-profile-entity";
import { CurrencyEnum } from "../enums/currency-enum";

export interface CurrencyProfileResponseRestDto {
  id: string;
  name: string;
  currencyCode: CurrencyEnum;
  balance: number;
  initDate: string;
  goalMonthlySaving: number;
  goalYearlySaving: number;
  imageData?: FileReferenceDataResponseRestDto;
  ownerId: string;
}

export function currencyProfileResponseRestDtoToEntity(
  currencyProfileResponse: CurrencyProfileResponseRestDto
): CurrencyProfileEntity {
  return {
    id: currencyProfileResponse.id,
    name: currencyProfileResponse.name,
    imageUrl: currencyProfileResponse.imageData?.url,
    currency: currencyProfileResponse.currencyCode,
    balance: currencyProfileResponse.balance,
    initialDate: new Date(currencyProfileResponse.initDate),
    monthlySavingsGoal: currencyProfileResponse.goalMonthlySaving,
    yearlySavingsGoal: currencyProfileResponse.goalYearlySaving,
    ownerId: currencyProfileResponse.ownerId,
  };
}
