// pages/attractionsDetail/attractionsDetail.js
import {getRaidersById} from "../../network/apis/raiders.js"
import {addAttractions,getRaidersCommentById} from "../../network/apis/raidersComment.js"
import {getStatList,editRaidersStat} from "../../network/apis/raidersStat.js"
import {isWatchUser,editUserAttention} from "../../network/apis/userAttention.js"
import {getStorageByKey} from "../../utils/util.js"
import Toast from "@vant/weapp/toast/toast"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        authorId: '',
        avatar: '',
        commentValue: '',
        pageIndex: 1,
        total: 0,
        isNoMore: false,
        detailInfo: {},
        swiperImgs: [],
        commentList: [],
        userInfo: {},
        isWatching: false,
        isNotMe: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,
            authorId: options.authorid,
            avatar: options.avatar
        })
        this._getRaidersById()
        this._getRaidersCommentById()
        this._getStatList()
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
        let userInfo = getStorageByKey("userInfo")
        this.setData({
            userInfo: userInfo
        })
        this.getIsWatchUser()
        this.judgeIsNotMe()
    },
      /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let pageIndex = this.data.pageIndex
        this.setData({pageIndex:pageIndex+1})
        if(this.data.isNoMore) { return }
        console.log("上拉加载更多")
        this._getRaidersCommentById(false)
    },
    // 判断是不是本人
    judgeIsNotMe() {
        if(this.data.authorId == this.data.userInfo.id) {
            this.setData({ isNotMe: false})            
        }else {
            this.setData({ isNotMe: true  }) 
        }
    },
    // 获取详攻略情信息
    _getRaidersById() {
        getRaidersById(this.data.id).then(({data}) => {
            console.log(data)
            this.setData({
                detailInfo: data,
                swiperImgs: data.pic.split(',')
            })
        }).catch(err => {
            console.log(err)
        })
    },
    // 获取攻略评论信息
    _getRaidersCommentById(isRefresh) {
        if(isRefresh) { this.setData({pageIndex:1}) }
        let pageIndex = this.data.pageIndex
        let raidersId = this.data.id
        getRaidersCommentById(raidersId,pageIndex,5).then(({data}) => {
          console.log(data)
          if(isRefresh) {
            this.setData({
              commentList: data.records,
              total: data.total
            })
          }else {
            let tempDataList = [...this.data.commentList,...data.records]
            let isSameLength = data.total == tempDataList.length ? true : false
            this.setData({
              commentList: tempDataList,
              isNoMore: isSameLength
            })
        }
        }).catch(err => {
          console.log(err)
        })
    },
    // 获取攻略点赞列表
    _getStatList() {
        getStatList(this.data.id).then(({data}) => {
            this.setData({
                starList: data
            })
            this.isStared(data)
        }).catch(err => {
            console.log(err)
        })
    },
    // 输入
    onInputBlur({detail}) {
        this.setData({
            commentValue: detail.value
        })
    },

    // 去评论
    toComment() {
        let commentValue = this.data.commentValue
        if(commentValue.trim() == "") {
            return Toast.fail('请输入评论内容')
        }
        let data = {
            raidersId: this.data.id,
            userId: this.data.userInfo.id,
            content: this.data.commentValue
        }
        addAttractions(data).then(res => {
            console.log(res)
            Toast.success('评论成功');
            this.setData({ commentValue: ''})
            this._getRaidersCommentById(true)
        }).catch(err => {
            Toast.fail("添加评论失败")
        })
    },
    // 跳转至用户主页
    toUserHomePage() {
        let userId = this.data.authorId
        wx.navigateTo({
            url: `/pages/userInfo/userInfo?userId=${userId}`
        })
    },
    // 判断是否已经点赞了
    isStared(data) {
        console.log('点赞的数据',data)
        let isStared = data.length < 1 ? false : data.some(item => item.userId == this.data.userInfo.id)
        console.log(isStared)
        this.setData({isStared})
    },
    // 点击点赞
    clickStar() {
        let isStared = this.data.isStared
        let raidersId = this.data.detailInfo.id
        let userId = this.data.userInfo.id
        editRaidersStat(raidersId,userId).then((res) => {
            console.log(res)
            Toast.success(res.msg)
            this._getStatList()
        }).catch(err => {
            Toast.fail("操作失败")
            console.log(err)
        })
    },
    // 获取用户关注信息
    getIsWatchUser() {
        isWatchUser(this.data.authorId, this.data.userInfo.id).then(({data}) => {
            console.log(data)
            this.setData({isWatching:data.isWatching})
        }).catch(err => {
            console.log(err)
        })
    },
    // 添加关注/取消关注
    followUser() {
        let data = {
            targetUserId: this.data.authorId,
            userId: this.data.userInfo.id
        }
        console.log(data)
        editUserAttention(data).then((res) => {
            console.log(res)
            Toast.success(res.msg)
            this.getIsWatchUser()
        }).catch(err => {
            Toast.fail("操作失败")
            console.log(err)
        })
    }
})