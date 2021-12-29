const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime2 = info => {
  let date = new Date(parseInt(info))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year+ '-' + month + '-' + day
}
const getNowTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const subStrTime = date => {
  return date.substring(0,10)
}
// 判断是否在30分钟内
const isIn30minutes = (date) =>{
  let nowDate = new Date()
  let closeDate = new Date(date.replace(/-/g,'/'))
  let nTime = closeDate - nowDate
  // console.log(nTime)
  return nTime>0  ? true : false
}
// 获取N天前的 年月日
const getDateBeforeStr = (count) => {
  var dd = new Date();
  dd.setDate(dd.getDate() - count);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  if( m <10){
      m = '0'+m;
  }
  var d = dd.getDate();
  if( d <10){
      d = '0'+d;
  }
  return y + "-" + m + "-" + d;
}

// 封装的吐司
const Toast = (title,icon,duration) => {
  return wx.showToast({
    icon: icon || 'none',
    title: title,
    duration: duration || 3000,
    mask: true
  })
}
// 显示加载动画
const showLoading = (title) => {
  return wx.showLoading({
    title: title || '',
  })
}
/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 200;//间隔时间，如果interval不传，则默认200ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context,args);
    }, gapTime);
  };
}
/**
 * 校验手机号码
 */
function checkPhoneNumber(phoneNo) {
  if (!phoneNo || phoneNo.length == 0) { return false;}
  var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!telReg.test(phoneNo)) { return false}
  return true
}
/**
 * 检验是否全部为中文
 */
function checkIsAllChinese(str) {
  if (!str || str.length == 0) { return false;}
  let chineseReg = /^[\u4e00-\u9fa5]+$/
  if (!chineseReg.test(str)) { return false}
  return true
}
/**
 * 对象转query
 */
function objectToQueryString(obj) {
  const objectLength = Object.keys(obj).length;
  let queryString = "";
  let counter = 0;
  for (let key in obj) {
		queryString += (key + "=" + obj[key]);
		counter++;
		if (counter < objectLength) {
			queryString += "&";
		};
	};
	return queryString;
}

/**
 * 本地缓存
 */
function setStorage(key,data) {
  wx.setStorage({
    key: key,
    data: data
  })
  app.globalData[key] = data
}
/**
 * 获取本地缓存
 */
function getStorageByKey(key) {
  wx.getStorage({
    key: key,
    success (res) {
      return res.data
    }
  })
}
/**
 * 删除本地缓存
 */
function deleteStorageByKey(key) {
  wx.removeStorage({key: key})
  app.globalData[key] = null
}
/**
 * 清空本地缓存
 */
function clearStorage() {
  wx.clearStorage()
}


module.exports = {
  formatTime,
  formatTime2,
  subStrTime,
  getNowTime,
  getDateBeforeStr,
  Toast,
  showLoading,
  throttle,
  debounce,
  checkPhoneNumber,
  checkIsAllChinese,
  objectToQueryString,
  setStorage,
  getStorageByKey,
  deleteStorageByKey,
  clearStorage,
  isIn30minutes
}
