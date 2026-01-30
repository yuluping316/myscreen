import request from '../utils/request'
import request2 from '../utils/request2'
const baseURL = 'https://api.imooc-web.lgdsunday.club/api'
export const getVisualization = () => {
  return request({
    baseURL,
    url: '/visualization',
    method: 'get',
  })
}

export const getWeather = () => {
  return request2({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    params: {
      key: 'a5613e113fa97e8f6b9903990b124f71',
      city: '500000',
    },
  })
}