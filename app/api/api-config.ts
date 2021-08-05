import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const EndPoints = {
  heroes: "heroes",
  antiHeroes: "anti-heroes",
  villains: "villains",
};
