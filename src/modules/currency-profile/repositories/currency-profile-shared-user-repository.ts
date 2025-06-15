import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  CURRENCY_PROFILE_API_PATH,
  CURRENCY_PROFILE_SHARED_USERS_API_SUBPATH,
} from "../data/constants/currency-profile-api-constants";
import { CurrencyProfileSharedUserPutRequestRestDto } from "../data/dtos/currency-profile-shared-user-put-request-rest.dto";
import {
  CurrencyProfileSharedUserResponseRestDto,
  currencyProfileSharedUserResponseRestDtoToEntity,
} from "../data/dtos/currency-profile-shared-user-response-rest.dto";
import { CurrencyProfileSharedUserEntity } from "../data/entities/currency-profile-shared-user-entity";
import { CreateCurrencyProfileSharedUserProps } from "../data/props/create-currency-profile-shared-user-props";

export interface CurrencyProfileSharedUserRepository {
  list: (
    currencyProfileId: string
  ) => Promise<CurrencyProfileSharedUserEntity[]>;

  create: (props: CreateCurrencyProfileSharedUserProps) => Promise<void>;

  delete: (currencyProfileId: string, id: string) => Promise<void>;
}

export const currencyProfileSharedUserRepository = (
  httpService: HttpService
): CurrencyProfileSharedUserRepository => ({
  list: async (
    currencyProfileId: string
  ): Promise<CurrencyProfileSharedUserEntity[]> => {
    try {
      const response = await httpService.getRequest<
        CurrencyProfileSharedUserResponseRestDto[]
      >(
        `${CURRENCY_PROFILE_API_PATH}/${currencyProfileId}` +
          `${CURRENCY_PROFILE_SHARED_USERS_API_SUBPATH}`
      );

      return response.map(currencyProfileSharedUserResponseRestDtoToEntity);
    } catch (error) {
      console.log("Error fetching currency profile shared users: ", error);
      throw new AppError("");
    }
  },

  create: async (
    props: CreateCurrencyProfileSharedUserProps
  ): Promise<void> => {
    try {
      await httpService.putRequest<
        CurrencyProfileSharedUserPutRequestRestDto,
        void
      >(
        `${CURRENCY_PROFILE_API_PATH}/${props.currencyProfileId}` +
          `${CURRENCY_PROFILE_SHARED_USERS_API_SUBPATH}`,
        {
          userEmailToAdd: props.email,
        }
      );
    } catch (error) {
      console.log("Error creating currency profile shared user: ", error);
      throw new AppError("");
    }
  },

  delete: async (currencyProfileId: string, id: string): Promise<void> => {
    try {
      await httpService.putRequest<
        CurrencyProfileSharedUserPutRequestRestDto,
        void
      >(
        `${CURRENCY_PROFILE_API_PATH}/${currencyProfileId}` +
          `${CURRENCY_PROFILE_SHARED_USERS_API_SUBPATH}`,
        {
          userIdToRemove: id,
        }
      );
    } catch (error) {
      console.log("Error deleting currency profile shared user: ", error);
      throw new AppError("");
    }
  },
});
