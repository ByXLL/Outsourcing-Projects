// pages/attractionsDetail/attractionsDetail.js
import {getAttractionById} from "../../network/apis/attractions.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detailInfo: {},
        swiperImgs: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({id:options.id})
        console.log(options)
        this._getAttractionById()
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
    _getAttractionById() {
        getAttractionById(this.data.id).then(({data}) => {
            console.log(data)
            this.setData({
                detailInfo: data,
                swiperImgs: data.pic.split(',')
            })
        }).catch(err => {
            console.log(err)
        })
    }
})