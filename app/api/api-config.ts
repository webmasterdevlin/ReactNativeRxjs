import {AxiosRequestConfig} from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const EndPoints = {
  albums: 'albums',
  comments: 'comments',
  photos: 'photos',
  posts: 'posts',
  todos: 'todos',
  users: 'users',
};
