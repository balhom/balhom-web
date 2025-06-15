import { CurrencyProfileSharedUserEntity } from "../entities/currency-profile-shared-user-entity";

export interface CurrencyProfileSharedUserResponseRestDto {
  id: string;
  email: string;
}

export function currencyProfileSharedUserResponseRestDtoToEntity(
  response: CurrencyProfileSharedUserResponseRestDto
): CurrencyProfileSharedUserEntity {
  return {
    id: response.id,
    email: response.email,
  };
}
