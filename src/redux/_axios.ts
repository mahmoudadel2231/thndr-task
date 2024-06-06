import axios from 'axios';

const initAxios = () => {
  axios.defaults.baseURL = 'https://api.polygon.io';

  axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json';
      config.params = {apiKey: '2zxx0GM3tl_mRMrpzcmwol6IiqCWiq3K', limit: 10};
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  axios.interceptors.response.use(undefined, error => {
    return Promise.reject(error?.response);
  });
};

export default initAxios;
