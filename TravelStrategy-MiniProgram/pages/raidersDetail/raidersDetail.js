// pages/attractionsDetail/attractionsDetail.js
import {getRaidersById,getRaidersByIdAndStat} from "../../network/apis/raiders.js"
import {addAttractions,getRaidersCommentById} from "../../network/apis/raidersComment.js"
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
        let pageIndex = this.data.pageIndex
        this.setData({pageIndex:pageIndex+1})
        if(this.data.isNoMore) { return }
        console.log("上拉加载更多")
        this._getRaidersCommentById(false)
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
    // 输入
    onInputBlur({detail}) {
        this.setData({
            commentValue: detail.value
        })
    },

    // 去评论
    toComment() {
        let userInfo = getStorageByKey("userInfo")
        console.log(userInfo)
        let commentValue = this.data.commentValue
        if(commentValue.trim() == "") {
            return Toast.fail('请输入评论内容')
        }
        let data = {
            raidersId: this.data.id,
            userId: userInfo.id,
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
    }
})