import axios from 'axios';
let axiosInstance = axios.create({
    baseURL: 'https://enrouteservice.com/api/',
    timeout: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  const sendReq = async (data, token) => {
    try {
         
        data.headers['Authorization'] = `Bearer ${token}`;
         
        const response = await axiosInstance.request(data);
        return response;
    } catch (error) {
       
    }
  }
  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    if (error.response.status===500) {
        //do something
    }
    if (error.response.status === 400) {
        //do something
    }
    if (error.config && error.response && error.response.status === 401){
       
      axiosInstance.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
      const data = {
        refreshToken: localStorage.getItem('refresh-token')
      }
      const response = await axiosInstance.post(`/auth/refresh-tokens`, data);
       
      localStorage.setItem('refresh-token', response.data.message.refresh.token);

      localStorage.setItem('token', `Bearer ${response.data.message.access.token}`);
      return sendReq(error.config, response.data.message.access.token).then((response) => {
         
      });

    }
    if (error.response.status === 404) {
        //do something
    }
    
    return Promise.reject(error);
  });
  axiosInstance.interceptors.request.use(
    reqConfig => {
      if (!reqConfig.url.includes('/token-auth'))
      {
        reqConfig.headers['Authorization'] = `${localStorage.getItem('token')}`
        reqConfig.headers['Organization'] = localStorage.getItem('organizationId');
        return reqConfig;
      }
    },
    err => Promise.reject(err),
  );
export default axiosInstance;
