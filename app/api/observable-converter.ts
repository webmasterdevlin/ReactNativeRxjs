import initializeAxios from './interceptors';
import {axiosRequestConfiguration} from './api-config';
import {map} from 'rxjs/operators';
import {defer, Observable} from 'rxjs';

const axiosInstance = initializeAxios(axiosRequestConfiguration);

export const httpGet = <T>(
  url: string,
  queryParams?: object,
): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, {params: queryParams})).pipe(
    map(result => result.data),
  );
};

export const httpPost = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.post<T>(url, body, {params: queryParams}),
  ).pipe(map(result => result.data));
};

export const httpPut = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.put<T>(url, body, {params: queryParams}),
  ).pipe(map(result => result.data));
};

export const httpPatch = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<T | void> => {
  return defer(() =>
    axiosInstance.patch<T>(url, body, {params: queryParams}),
  ).pipe(map(result => result.data));
};

export const httpDelete = <T>(
  url: string,
  id: string,
): Observable<T | void> => {
  return defer(() => axiosInstance.delete(`${url}/${id}`)).pipe(
    map(result => result.data),
  );
};
