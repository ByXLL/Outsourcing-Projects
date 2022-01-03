import {
  baseURL,
  header,
  timeout
} from './config.js'
import { setStorage, Toast, debounce} from '../utils/util.js'
const app = getApp()

export default function(options) {
  let header = {}
  header.token = wx.getStorageSync('token') || '' 
  console.log('请求携带的参数----',options.data)
  return new Promise(function(resole, reject) {
    wx.request({
      url: options.baseURL?options.baseURL:baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      timeout,
      header,
      success(res){
        if(res.statusCode != 200 || res.data.code != 200) {
          if(res.data.code == 401) { 
            console.error('登录过期')
            setStorage("isLogin",false)
            setStorage("token", '')
            setStorage("userInfo", '')
            wx.navigateTo({url: `/pages/login/login`})
          }
          return reject(res.data)
        }
        resole(res.data)
      },
      fail(err){
        console.error('网络请求出错')
        Toast('网络或者服务器错误，请联系管理员')
        reject(err)
      }
    })
  })
}