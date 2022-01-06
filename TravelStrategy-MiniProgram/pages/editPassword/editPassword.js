import {editPassword} from "../../network/apis/user.js"
import {getStorageByKey,setStorage,deleteStorageByKey} from "../../utils/util.js"
import Toast from "@vant/weapp/toast/toast"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword: '',
    password: '',
    confirmPassword: ''
  },
  toEditPassword() {
    let id = getStorageByKey('userInfo').id
    let oldPassword = this.data.oldPassword
    let password = this.data.password
    let confirmPassword = this.data.confirmPassword
    if(oldPassword.trim() == '') { return Toast.fail('请输入原密码') }
    if(password.trim() == '') { return Toast.fail('请输入密码') }
    if(confirmPassword.trim() == '') { return Toast.fail('请再次输入密码') }
    if(password != confirmPassword ) { return Toast.fail('前后密码输入不一致') }
    Toast.loading('正在提交中...')
    let data = { id,oldPassword,newPassword:password}
    editPassword(data).then(({data}) => {
        console.log(data)
        Toast.success('修改密码成功');
        this.clearLoginInfo()
    }).catch(err => {
        Toast.fail(err.msg);
    })
  },
  clearLoginInfo() {
    setStorage('isLogin',false)
    deleteStorageByKey('token')
    deleteStorageByKey('userInfo')
    setTimeout(() => {
      wx.navigateTo({
          url: `/pages/login/login`
      })
    },1500)
  }
})