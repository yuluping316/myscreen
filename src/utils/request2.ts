import axios from 'axios'
const instance = axios.create({
  // baseURL: 'https://api.imooc-web.lgdsunday.club/api',
  timeout: 5000,
  // headers: { 'X-Custom-Header': 'foobar' } 
});
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // config.headers.icode = 'hellosunday'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  const { info, message } = response.data
  // 对响应数据做点什么
  if (info == 'OK') {
    return response
  } else {
    return Promise.reject(new Error(message || '请求失败'))
  }
}
);
export default instance