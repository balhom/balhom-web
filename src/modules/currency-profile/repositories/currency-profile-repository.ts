import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import SseService from "../../../common/services/sse-service";
import {
  CURRENCY_PROFILE_API_PATH,
  CURRENCY_PROFILE_IMAGE_API_SUBPATH,
  CURRENCY_PROFILE_SSE_EVENT_NAME,
  CURRENCY_PROFILE_SUBSCRIBE_API_SUBPATH,
} from "../data/constants/currency-profile-api-constants";
import {
  currencyProfileCreatePropsToPostRequestRestDto,
  CurrencyProfilePostRequestRestDto,
} from "../data/dtos/currency-profile-post-request-rest.dto";
import {
  CurrencyProfilePutRequestRestDto,
  currencyProfileUpdatePropsToPutRequestRestDto,
} from "../data/dtos/currency-profile-put-request-rest.dto";
import {
  CurrencyProfileResponseRestDto,
  currencyProfileResponseRestDtoToEntity,
} from "../data/dtos/currency-profile-response-rest.dto";
import { CurrencyProfileChangeEventEntity } from "../data/entities/currency-profile-change-event-entity";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";
import { CreateCurrencyProfileProps } from "../data/props/create-currency-profile-props";
import { UpdateCurrencyProfileProps } from "../data/props/update-currency-profile-props";

export interface CurrencyProfileRepository {
  get: (id: string) => Promise<CurrencyProfileEntity>;

  list: () => Promise<CurrencyProfileEntity[]>;

  create: (props: CreateCurrencyProfileProps) => Promise<CurrencyProfileEntity>;

  update: (props: UpdateCurrencyProfileProps) => Promise<void>;

  listen: (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ) => Promise<void>;

  delete: (id: string) => Promise<void>;

  deleteAll: () => Promise<void>;
}

async function uploadCurrencyProfileImage(
  id: string,
  image: File,
  httpService: HttpService
): Promise<void> {
  try {
    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append("mimetype", image.type);

    await httpService.postRequest<FormData, void>(
      `${CURRENCY_PROFILE_API_PATH}/${id}` +
        `${CURRENCY_PROFILE_IMAGE_API_SUBPATH}`,
      imageFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log("Error uploading currency profile image: ", error);
    throw new AppError("");
  }
}

export const currencyProfileRepository = (
  httpService: HttpService,
  sseService: SseService
): CurrencyProfileRepository => ({
  get: async (id: string): Promise<CurrencyProfileEntity> => {
    try {
      const response =
        await httpService.getRequest<CurrencyProfileResponseRestDto>(
          `${CURRENCY_PROFILE_API_PATH}/${id}`
        );

      return currencyProfileResponseRestDtoToEntity(response);
    } catch (error) {
      console.log("Error fetching currency profile: ", error);
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
  ): Promise<CurrencyProfileEntity> => {
    try {
      const request = currencyProfileCreatePropsToPostRequestRestDto(props);

      const response = await httpService.postRequest<
        CurrencyProfilePostRequestRestDto,
        CurrencyProfileResponseRestDto
      >(CURRENCY_PROFILE_API_PATH, request);

      const currencyProfileResponse =
        currencyProfileResponseRestDtoToEntity(response);

      if (props.image) {
        // If image is provided, upload it in a separate non blocking request
        uploadCurrencyProfileImage(
          currencyProfileResponse.id,
          props.image,
          httpService
        );
      }

      return currencyProfileResponse;
    } catch (error) {
      console.log("Error creating currency profile: ", error);
      throw new AppError("");
    }
  },

  update: async (props: UpdateCurrencyProfileProps): Promise<void> => {
    try {
      const request = currencyProfileUpdatePropsToPutRequestRestDto(props);

      await httpService.putRequest<
        CurrencyProfilePutRequestRestDto,
        CurrencyProfileResponseRestDto
      >(`${CURRENCY_PROFILE_API_PATH}/${props.id}`, request);

      if (props.image) {
        // If image is provided, upload it in a separate non blocking request
        uploadCurrencyProfileImage(props.id, props.image, httpService);
      }
    } catch (error) {
      console.log("Error updating currency profile: ", error);
      throw new AppError("");
    }
  },

  listen: async (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ): Promise<void> => {
    await sseService.listen(
      `${CURRENCY_PROFILE_API_PATH}/${CURRENCY_PROFILE_SUBSCRIBE_API_SUBPATH}`,
      CURRENCY_PROFILE_SSE_EVENT_NAME,
      onChange
    );
  },

  delete: async (id: string): Promise<void> => {
    try {
      await httpService.deleteRequest<void>(
        `${CURRENCY_PROFILE_API_PATH}/${id}`
      );
    } catch (error) {
      console.log("Error deleting currency profile: ", error);
      throw new AppError("");
    }
  },

  deleteAll: async (): Promise<void> => {
    try {
      await httpService.deleteRequest<void>(CURRENCY_PROFILE_API_PATH);

      sseService.disconnect();
    } catch (error) {
      console.log("Error deleting currency profiles: ", error);
      throw new AppError("");
    }
  },
});
