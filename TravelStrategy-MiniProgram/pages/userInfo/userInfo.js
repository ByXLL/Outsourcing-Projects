import {addUserAttention,delAttention,getAttentionByUserId,isWatchUser} from "../../network/apis/userAttention.js"
import {getUserInfoByUserId} from "../../network/apis/user.js"
import {getRaidersByUserId} from "../../network/apis/raiders.js"
var util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userInfo: {},
        raidersList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({userId:options.userId})
        console.log(options.userId)
        this.getUserInfo()
        this.getRaiders()
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // 获取用户信息
    getUserInfo() {
        getUserInfoByUserId(this.data.userId).then(({data}) => {
            console.log(data)
            this.setData({userInfo:data})
        }).catch(err => {
            console.log(err)
        })
    },
    // 获取用户的攻略
    getRaiders() {
        getRaidersByUserId(this.data.userId).then(({data}) => {
            console.log(data)
            this.setData({raidersList:data})
        }).catch(err => {
            console.log(err)
        })
    },
    // 关注用户
    followUser() {
        console.log('关注')
    },
    // 跳转至攻略详情
    toRaidersDetail({currentTarget}) {
        let id = currentTarget.dataset.id
        // wx.navigateTo({
        //     url: `/pages/userInfo/userInfo?id=${id}`
        // })
    }
})