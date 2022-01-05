// pages/userProfile/userProfile.js
import {
  baseURL
} from '../../network/config.js'
import {updateUser,getUserInfoByUserId} from "../../network/apis/user.js"
import {deleteStorageByKey,setStorage} from "../../utils/util.js"
import Toast from "@vant/weapp/toast/toast"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    introduction: '',
    userInfo: {
      id: '',
      age: '',
      avatar: '',
      city: '',
      introduction: '',
      nickName: '',
      userName: ''
    },
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = options.userId
    this.setData({
      userId: userId
    })
    this._getUserInfoByUserId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // 当输入框输入
  onInput(e) {
    let value = e.detail
    let field = e.currentTarget.dataset.field
    this.setData({
      [`userInfo.${field}`]:value
    })
  },
  // 上传头像
  afterRead(event) {
    const { file } = event.detail;
    wx.uploadFile({
      url: baseURL+`/upload`,
      filePath: file.url,
      name: 'file',
      success: ({data}) => {
        let res = JSON.parse(data)
        console.log(res)
        const fileList = [] 
        fileList.push({name:'头像', url: res.data.filePath})
        this.setData({ fileList })
      },
    });
  },
  // 删除头像
  deleteAvatar() {
    this.setData({fileList:[]})
  },
  // 获取用户信息
  _getUserInfoByUserId() {
    getUserInfoByUserId(this.data.userId).then(res => {
      console.log(res)
      this.setData({
        userInfo: res.data,
        fileList: [{url:res.data.avatar}]
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 编辑用户信息
  editUserInfo() {
    if(this.data.fileList.length < 1) { return Toast.fail('请选择用户头像') }
    this.setData({
      ['userInfo.avatar']:this.data.fileList[0].url
    })
    if(this.data.userInfo.nickName == '') { return Toast.fail('昵称不能为空') }
    updateUser(this.data.userInfo).then(res => {
      console.log(res)
      Toast.success('修改成功')
    }).catch(err => {
      Toast.fail('修改失败') 
    })
  },
  // 退出登录
  logout() {
    setStorage('isLogin',false)
    deleteStorageByKey('token')
    deleteStorageByKey('userInfo')
    wx.navigateTo({
      url: `/pages/login/login`
    })
  }
})