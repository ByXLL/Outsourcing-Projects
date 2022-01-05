import {editUserAttention,getAttentionByUserId,isWatchUser} from "../../network/apis/userAttention.js"
import {getUserInfoByUserId,findUserStar,} from "../../network/apis/user.js"
import {getRaidersByUserId} from "../../network/apis/raiders.js"
import { getStorageByKey } from '../../utils/util.js'
import Toast from "@vant/weapp/toast/toast"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userInfo: {},
        loginUserInfo: {},
        userStarInfo: {},
        raidersList: [],
        isFollowed: false,
        isNotMe: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({userId:options.userId})
        console.log(options.userId)
        let userInfo = getStorageByKey('userInfo')
        this.setData({
            loginUserInfo: userInfo
        })
        this.judgeIsNotMe()
        this.getUserInfo()
        this.getRaiders()
        this.getUserStarInfo()
        this.getIsWatchUser()
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
    // 获取个人点赞/粉丝/收藏信息
    getUserStarInfo() {
        findUserStar(this.data.userId).then(({data}) => {
            console.log(data)
            this.setData({userStarInfo:data})
        }).catch(err => {
            console.log(err)
        })
    },
    // 判断是否关注该用户
    getIsWatchUser() {
        let targetUserId = this.data.userId
        let sourceUserId = this.data.loginUserInfo.id
        if(targetUserId == sourceUserId) { return }
        isWatchUser(targetUserId,sourceUserId).then(({data})=>{
            this.setData({isFollowed:data.isWatching})
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    },
    // 判断是不是本人
    judgeIsNotMe() {
        if(this.data.userId == this.data.loginUserInfo.id) {
            this.setData({ isNotMe: false})            
        }else {
            this.setData({ isNotMe: true  }) 
        }
    },
    // 关注用户
    followUser() {
        console.log('关注')
        let data = {
            targetUserId: this.data.userId,
            userId: this.data.loginUserInfo.id
        }
        console.log(data)
        editUserAttention(data).then((res) => {
            console.log(res)
            Toast.success(res.msg)
            this.getIsWatchUser()
            this.getUserStarInfo()
        }).catch(err => {
            Toast.fail("操作失败")
            console.log(err)
        })
    },
    // 跳转至攻略详情
    toRaidersDetail({currentTarget}) {
        let id = currentTarget.dataset.id
        let authorId = this.data.userInfo.id
        let avatar = this.data.userInfo.avatar
        console.log(id)
        wx.navigateTo({
            url: `/pages/raidersDetail/raidersDetail?id=${id}&authorid=${authorId}&avatar=${avatar}`
        })
    }
})