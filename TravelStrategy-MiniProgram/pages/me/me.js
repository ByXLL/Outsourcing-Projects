// me/me.js
import {getStorageByKey} from "../../utils/util.js"
import Dialog from '@vant/weapp/dialog/dialog'
import {setStorage,deleteStorageByKey} from "../../utils/util.js"
import {getUserInfoByUserId,findUserStar} from "../../network/apis/user.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        userStarInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 移除 tabBar 某一项右上角的文本
        wx.removeTabBarBadge({
            index:2
        })
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
        let isLogin = getStorageByKey('isLogin')
        if(isLogin == '' || isLogin == false) {
          wx.navigateTo({
            url: `/pages/login/login`
          })
        }

        this.setData({
            userInfo: getStorageByKey('userInfo')
        })
        this.getUserStarInfo()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    // 获取个人点赞/粉丝/收藏信息
    getUserStarInfo() {
        findUserStar(this.data.userInfo.id).then(({data}) => {
            console.log(data)
            this.setData({userStarInfo:data})
        }).catch(err => {
            console.log(err)
        })
    },
    // 个人主页
    homeClick(){
        let userId = this.data.userInfo.id
        wx.navigateTo({
            url: `/pages/userInfo/userInfo?userId=${userId}`
        })
    },
    
    /**
     * 旅行照片浏览
     */
    cameraClick() {
        wx.navigateTo({
            url: `/pages/release/release`
        })
    },
    // 跳转我的信息页
    toUserProfile() {
        let userId = getStorageByKey('userInfo').id
        wx.navigateTo({
            url: `/pages/userProfile/userProfile?userId=${userId}`
        })
    },
    // 退出登录
    logout() {
        Dialog.alert({
            title: '提示',
            message: '确认退出吗',
            showCancelButton: true,
            closeOnClickOverlay: true,
        }).then(() => {
            console.log('点击确认')
            setStorage('isLogin',false)
            deleteStorageByKey('token')
            deleteStorageByKey('userInfo')
            wx.navigateTo({
                url: `/pages/login/login`
            })
        })
    },
    toRelease() {
        console.log('11111')
    },
    toLove() {

    },
    toStar() {

    },
})