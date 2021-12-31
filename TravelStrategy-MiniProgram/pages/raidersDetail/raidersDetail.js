// pages/attractionsDetail/attractionsDetail.js
import {getRaidersById,getRaidersByIdAndStat} from "../../network/apis/raiders.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        authorId: '',
        avatar: '',
        detailInfo: {},
        swiperImgs: [],
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
    // 获取景点详情信息
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


    // 去评论
    toComment() {
        console.log('评论')
    }
})