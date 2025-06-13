import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { HttpError, HttpErrorEnum } from "../data/errors/http-error";
import { NetworkError } from "../data/errors/network-error";
import { ApiCodeError } from "../data/errors/api-code-error";

const axiosResponseToData = <T>(httpResponse: AxiosResponse): T => {
  if (~~(httpResponse.status / 10) === 20) {
    return httpResponse.data;
  }
  throw axiosResponseToError(httpResponse);
};

const axiosResponseToError = (httpResponse: AxiosResponse): HttpError => {
  if (httpResponse.status === 400) {
    if (httpResponse.data.errorCode) {
      return new ApiCodeError(httpResponse.data.errorCode);
    }
    return new HttpError(HttpErrorEnum.BAD_ERROR_REQUEST);
  }
  if (httpResponse.status === 401) {
    return new HttpError(HttpErrorEnum.UNAUTHORIZED_ERROR_REQUEST);
  }
  if (httpResponse.status === 403) {
    return new HttpError(HttpErrorEnum.FORBIDDEN_ERROR_REQUEST);
  }
  return new HttpError(HttpErrorEnum.SERVICE_ERROR_REQUEST);
};

class HttpService {
  private _axiosInstance: AxiosInstance;

  public constructor(
    headers: Record<string, AxiosHeaderValue>,
    baseUrl: string,
    requestInterceptorOnSuccess?: (
      config: InternalAxiosRequestConfig
    ) => Promise<InternalAxiosRequestConfig>,
    requestInterceptorOnError?: (error: AxiosError) => Promise<AxiosError>,
    responseInterceptorOnSuccess?: (response: AxiosResponse) => AxiosResponse,
    responseInterceptorOnError?: (error: AxiosError) => Promise<AxiosError>
  ) {
    this._axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: headers,
      withCredentials: true,
    });

    this._axiosInstance.interceptors.request.use(
      requestInterceptorOnSuccess,
      requestInterceptorOnError
    );

    this._axiosInstance.interceptors.response.use(
      responseInterceptorOnSuccess,
      responseInterceptorOnError
    );
  }

  public get axiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  public async getRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this._axiosInstance.get<T>(endpoint, config);
      return axiosResponseToData<T>(response);
    } catch (error) {
      console.log("Error: ", error);
      throw NetworkError.connectionError();
    }
  }

  public async postRequest<V, T>(
    endpoint: string,
    data: V,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this._axiosInstance.post<T>(
        endpoint,
        data,
        config
      );
      return axiosResponseToData<T>(response);
    } catch (error) {
      console.log("Error: ", error);
      throw NetworkError.connectionError();
    }
  }

  public async putRequest<V, T>(
    endpoint: string,
    data: V,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this._axiosInstance.put<T>(endpoint, data, config);
      return axiosResponseToData<T>(response);
    } catch (error) {
      console.log("Error: ", error);
      throw NetworkError.connectionError();
    }
  }

  public async patchRequest<V, T>(
    endpoint: string,
    data: V,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this._axiosInstance.patch<T>(
        endpoint,
        data,
        config
      );
      return axiosResponseToData<T>(response);
    } catch (error) {
      console.log("Error: ", error);
      throw NetworkError.connectionError();
    }
  }

  public async deleteRequest<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this._axiosInstance.delete<T>(endpoint, config);
      return axiosResponseToData<T>(response);
    } catch (error) {
      console.log("Error: ", error);
      throw NetworkError.connectionError();
    }
  }
}

export default HttpService;
