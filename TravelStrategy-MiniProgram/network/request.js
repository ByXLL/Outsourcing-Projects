import {
  baseURL,
  header,
  timeout
} from './config.js'
import {login} from "./apis/user.js"
import { setStorage, Toast, debounce} from '../utils/util.js'
const app = getApp()

function whiteList(url) {
  if(
    url != '/applet/goods/goodsShop/1' && 
    url != '/applet/appletUser/login' && 
    url != '/applet/goods/banner'
  ){ return true }
  return false
}

// 401 token过期 重新登录
let getUserInfo =  debounce(function() {
    console.error('---------------重新触发登录------------')
    wx.login({
      success: res => {
        console.log('登录微信成功',res)
        if (res.code) {
          wx.setStorageSync('code', res.code)
          let userDetailInfo = wx.getStorageSync('userDetailInfo')
          let data = {
            appid:app.globalData.appId,
            code: res.code, 
            encryptedData: userDetailInfo.encryptedData,
            iv: userDetailInfo.iv,
            signAture: userDetailInfo.signature,
            userInfo: userDetailInfo.userInfo
          }
          wx.showToast({
            title: '正在登录中...',
            icon: 'loading'
          })
          login(data).then( res=> {
            setStorage('token', res.data.token.authorization)
            setStorage('appletUser', res.data.appletUser)              
            setStorage('isHasUserDetailInfo',true)
            setStorage('isLogin', true)
            console.log(res)
            wx.hideToast()
          }).catch(err => {
            setStorage('isLogin', false)
            console.error(err)
            Toast('登录失败，请重试!')
          })
          // .finally(() => {
          //   wx.hideToast()
          // })
  
        } else { console.error('登录失败！' + res.errMsg)}
      },
      fail: err => { console.error('登录失败---',err) }
    })
},1000)

export default function(options) {
  let header = {}
  if(whiteList(options.url)) {
    header = {'authorization': wx.getStorageSync('token') || '' }
  }
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
            getUserInfo()
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