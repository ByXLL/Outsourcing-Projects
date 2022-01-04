//app.js
/**
 * 重写promise原型链
 */
function rewritePromise() {
  if(!Promise.prototype.finally){
    Promise.prototype.finally = function(callback){
      let P = this.constructor;
      return this.then(value => { P.resolve(callback()).then(() => value) }, reason => { P.resolve(callback()).then(() => { throw reason }) })
    }
  }
}
rewritePromise()
App({
  onLaunch: function () {

  },
  onShow (options) {
    // 显示 tabBar 某一项的右上角的红点
    wx.showTabBarRedDot({ index:2 })
  },
  globalData: {
    isLogin: false,
    token: '',
    userInfo: null,
    tempCityName: '',
  }
})