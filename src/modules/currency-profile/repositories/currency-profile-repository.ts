import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import { CURRENCY_PROFILE_API_PATH } from "../data/constants/currency-profile-api-constants";
import {
  CurrencyProfileResponseRestDto,
  currencyProfileResponseRestDtoToEntity,
} from "../data/dtos/currency-profile-response-rest-dto";
import { CurrencyProfileChangeEventEntity } from "../data/entities/currency-profile-change-event-entity";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { CreateCurrencyProfileProps } from "../data/props/create-currency-profile-props";
import { UpdateCurrencyProfileProps } from "../data/props/update-currency-profile-props";

export interface CurrencyProfileRepository {
  get: (id: string) => Promise<CurrencyProfileEntity>;

  list: () => Promise<CurrencyProfileEntity[]>;

  create: (
    props: CreateCurrencyProfileProps
  ) => Promise<Either<AppError, CurrencyProfileEntity>>;

  update: (
    props: UpdateCurrencyProfileProps
  ) => Promise<Either<AppError, void>>;

  listen: (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ) => Promise<Either<AppError, void>>;

  delete: (id: string) => Promise<Either<AppError, void>>;

  deleteAll: () => Promise<Either<AppError, void>>;
}

export const currencyProfileRepository = (
  httpService: HttpService
): CurrencyProfileRepository => ({
  get: async (id: string): Promise<CurrencyProfileEntity> => {
    try {
      const response =
        await httpService.getRequest<CurrencyProfileResponseRestDto>(
          `${CURRENCY_PROFILE_API_PATH}/${id}`
        );

      return currencyProfileResponseRestDtoToEntity(response);
    } catch (error) {
      console.log("Error fetching currency profiles: ", error);
      throw new AppError("");
    }
  },

  list: async (): Promise<CurrencyProfileEntity[]> => {
    try {
      const response = await httpService.getRequest<
        CurrencyProfileResponseRestDto[]
      >(CURRENCY_PROFILE_API_PATH);

      return response.map(currencyProfileResponseRestDtoToEntity);
    } catch (error) {
      console.log("Error fetching currency profiles: ", error);
      throw new AppError("");
    }
  },

  create: async (
    props: CreateCurrencyProfileProps
  ): Promise<Either<AppError, CurrencyProfileEntity>> => {
    // TODO remove and do api call
    const createdCurrencyProfile: CurrencyProfileEntity = {
      id: "12345678",
      name: props.name,
      currency: props.currency,
      balance: props.balance,
      initialDate: props.initialDate,
      monthlySavingsGoal: props.monthlySavingsGoal,
      yearlySavingsGoal: props.yearlySavingsGoal,
      ownerId: "",
    };

    return Either.right(createdCurrencyProfile);
  },

  update: async (
    props: UpdateCurrencyProfileProps
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(props);

    return Either.right(undefined);
  },

  listen: async (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(onChange);

    // TODO Only one stream available, close old one if new is created

    // TODO if stream is closed from sever then retry connection

    return Either.right(undefined);
  },

  delete: async (id: string): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(id);

    return Either.right(undefined);
  },

  deleteAll: async (): Promise<Either<AppError, void>> => {
    // TODO remove and do api call

    // TODO if call went well then close listen stream

    return Either.right(undefined);
  },
});
