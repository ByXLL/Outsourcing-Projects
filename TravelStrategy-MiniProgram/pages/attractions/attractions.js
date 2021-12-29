import {getAttractionsList,getAttractionById} from "../../network/apis/attractions.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: "",
        discussArray:[
            {
                title:'广州周末好去处',
                details:'盘点广州周边不容错过的美食、美景',
                imgUrl:'/static/shoucang.png'
            },
            {
                title:'故宫游攻略',
                details:'观宫看殿百千间，如何游故宫呢？',
                imgUrl:'/static/shoucang.png'
            },
            {
                title:'避暑胜地',
                details:'天蓝水绿，鸟语山峦',
                imgUrl:'/static/shoucang.png'
            }
        ],
        option1: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 },
          ],
          option2: [
            { text: '默认排序', value: 'a' },
            { text: '好评排序', value: 'b' },
            { text: '销量排序', value: 'c' },
          ],
          optionValue1: 0,
          optionValue2: 'a',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 隐藏 tabBar 某一项的右上角的红点
        wx.hideTabBarRedDot({
            index:2
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    onSearchChange: ({detail}) => {
        console.log(detail)
    },
    onSearch: ({detail}) => {
        console.log(detail)
    },
    onSearchClick: ({detail}) => {
        console.log(detail)
    },
    changeSelect: ({detail,target}) => {
        let index = target.dataset.index
        console.log(detail,index)
    }
})