import { InternalAxiosRequestConfig } from "axios";
import HttpService from "./http-service";
import { getOidc } from "../config/oidc";
import SseService from "./sse-service";

export const balhomApiHttpServiceInstance = new HttpService(
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

export const balhomApiSseServiceInstance = new SseService(
  import.meta.env.VITE_BALHOM_API_BASE_URL!,
  async (): Promise<Record<string, string>> => {
    const tokens = await getOidc();

    if (tokens && tokens.getTokens().accessToken) {
      return {
        Authorization: `Bearer ${tokens.getTokens().accessToken}`,
      };
    }

    return {};
  }
);
