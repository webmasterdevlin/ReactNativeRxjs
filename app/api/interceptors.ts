import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    response => response,
    error =>
      Promise.reject(
        (error.response && error.response.data) || 'Something went wrong',
      ),
  );

  return axiosInstance;
};

export default initialization;
