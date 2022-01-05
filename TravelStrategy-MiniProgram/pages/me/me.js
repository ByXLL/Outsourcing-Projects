// me/me.js
import {getStorageByKey} from "../../utils/util.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let isLogin = getStorageByKey('isLogin')
        if(isLogin == '' || isLogin == false) {
          console.log('空')
          wx.navigateTo({
            url: `/pages/login/login`
          })
        }
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
    // 个人主页
    homeClick(){
        let userId = getStorageByKey('userInfo').id
        wx.navigateTo({
            url: `/pages/userInfo/userInfo?userId=${userId}`
        })
    },
    
    /**
     * 旅行照片浏览
     */
    cameraClick: function(){
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                const tempFilePaths = res.tempFilePaths  

                wx.previewImage({
                    current: tempFilePaths[0], // 当前显示图片的http链接
                    urls: tempFilePaths // 需要预览的图片http链接列表
                })
            }
        })
    },
    // 跳转我的信息页
    toUserProfile() {
        let userId = getStorageByKey('userInfo').id
        wx.navigateTo({
            url: `/pages/userProfile/userProfile?userId=${userId}`
        })
    }
})