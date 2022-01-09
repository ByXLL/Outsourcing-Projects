import {getRaidersByUserId,delRaiders,getUserStarRaiders} from "../../network/apis/raiders.js"
import { getStorageByKey } from '../../utils/util.js'
import Toast from "@vant/weapp/toast/toast"
import Dialog from '@vant/weapp/dialog/dialog'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        loginUserInfo: {},
        raidersList: [],
        isMyStar:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userId:options.userId,
            isMyStar: options.isMyStar == 'false' ? false : true
        })
        console.log(options)
        let userInfo = getStorageByKey('userInfo')
        this.setData({
            loginUserInfo: userInfo
        })
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
    // 获取用户的攻略
    getRaiders() {
        console.log(this.data.isMyStar == 'true')
        if(this.data.isMyStar == 'true') {
            console.log('获取我收藏的')
            getUserStarRaiders(this.data.userId).then(({data}) => {
                console.log(data)
                this.setData({raidersList:data})
            }).catch(err => {
                console.log(err)
            })            
        }else {
            console.log('获取我的')
            getRaidersByUserId(this.data.userId).then(({data}) => {
                console.log(data)
                this.setData({raidersList:data})
            }).catch(err => {
                console.log(err)
            })
        }

    },
    // 跳转至攻略详情
    toRaidersDetail({currentTarget}) {
        let id = currentTarget.dataset.id
        let authorId = this.data.userId
        let avatar = this.data.loginUserInfo.avatar
        wx.navigateTo({
            url: `/pages/raidersDetail/raidersDetail?id=${id}&authorid=${authorId}&avatar=${avatar}`
        })
    },
    toEdit(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/release/release?id=${id}`
        })
    },
    toDelete(e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        Dialog.alert({
            title: '提示',
            message: '确定删除该攻略吗? 删除后不可恢复',
            showCancelButton: true,
            closeOnClickOverlay: true,
        }).then(() => {
            delRaiders(id).then(({data}) => {
                this.getRaiders()
            }).catch(err => {
                console.log(err)
                Toast.fail("删除失败")
            })
        })
    }
})