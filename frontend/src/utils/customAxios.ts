import axios, { AxiosRequestConfig } from 'axios';

const customAxios = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000/',
  };
  return axios.create(axiosConfig);
};

export default customAxios;
