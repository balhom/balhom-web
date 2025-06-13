import { InternalAxiosRequestConfig } from "axios";
import HttpService from "./http-service";
import { getOidc } from "../config/oidc";

export const balhomApiServiceInstance = new HttpService(
  { "Content-Type": "application/json" },
  import.meta.env.VITE_BALHOM_API_BASE_URL!,
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const tokens = await getOidc();

    if (tokens && tokens.getTokens().accessToken) {
      config.headers.Authorization = `Bearer ${tokens.getTokens().accessToken}`;
    }

    return config;
  },
  undefined,
  undefined,
  undefined
);
