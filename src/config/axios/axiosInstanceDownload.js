import axios from 'axios';
let axiosInstanceDownload = axios.create({
  baseURL: 'https://enrouteservice.com/api/',
  responseType: 'blob',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});
axiosInstanceDownload.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 500) {
    //do something
  }
  if (error.response.status === 400) {
    //do something
  }
  if (error.response.status === 401) {
    //do something
  }
  if (error.response.status === 404) {
    //do something
  }

  return Promise.reject(error);
});
axiosInstanceDownload.interceptors.request.use(
  reqConfig => {
    if (!reqConfig.url.includes('/token-auth')) {
      reqConfig.headers['Authorization'] = `${localStorage.getItem('token')}`
      reqConfig.headers['Organization'] = localStorage.getItem('organizationId');
      return reqConfig;
    }
  },
  err => Promise.reject(err),
);
export default axiosInstanceDownload;
