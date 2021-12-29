import {getAttractionsList,getAttractionById} from "../../network/apis/attractions.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isRefresh: false,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        attractionsList: [],
        attractionsName: "",
        tempCityName: '',
        cityName: '',
        option1: [
            { text: '免费', value: 0 },
            { text: '收费', value: 1 },
        ],
        option2: [
            { text: '默认', value: -1 },
            { text: '无', value: 0 },
            { text: '一星', value: 1 },
            { text: '二星', value: 2 },
            { text: '三星', value: 3 },
            { text: '四星', value: 4 },
            { text: '五星', value: 5 }
        ],
        optionValue1: null,
        optionValue2: -1,
        minFare: '',
        maxFare: '',
        starRating: null,
        isNoMore: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getAttractionsList(true)
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // 当搜索框内容发生改变
    onSearchChange({detail}) {
        this.setData({attractionsName:detail})
    },
    // 点击搜索
    onSearchClick(){
        this._getAttractionsList(true)
    },
    // 当下拉选择器发生改变
    changeSelect({detail,target}) {
        let index = target.dataset.index
        if(index == '1') {
            switch(detail) {
                case 1:
                    this.setData({
                        minFare: '1',
                        maxFare: '99999'
                    })
                    break;
                default:
                    this.setData({
                        minFare: '-1',
                        maxFare: '0'
                    })
            }
        }else {
            this.setData({ starRating: detail })
        }
        console.log(detail,index)
        this._getAttractionsList(true)
    },
    buildSearchParam() {
        let param = {
            name: this.data.attractionsName,
            city: this.data.cityName,
            minFare: this.data.minFare,
            maxFare: this.data.maxFare,
            starRating: this.data.starRating == -1 ? '' : this.data.starRating
        }
        return param
    },
    // 获取景点列表
    _getAttractionsList(isRefresh){
        if(isRefresh) { this.setData({pageIndex:1}) }
        getAttractionsList(this.data.pageIndex,this.data.pageSize,this.buildSearchParam()).then(({data}) =>{
            console.log(data)
            if(isRefresh) {
                this.setData({ 
                    'total' : data.total,
                    'attractionsList': data.records
                })
            }else {
                let tempDataList = [...this.data.attractionsList,...data.records]
                let isSameLength = data.total == tempDataList.length ? true : false
                console.log(isSameLength)
                this.setData({
                    attractionsList: tempDataList,
                    isNoMore: isSameLength
                })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setData({"isRefresh": false})
        })
    },
    // 下拉刷新
    refresh() {
        console.log("下拉刷新")
        this.setData({ 
            "isRefresh": true,
            "pageIndex": 0,
            "total": 0
        })
        this._getAttractionsList(true)
    },
    // 上拉加载更多
    loadMore() {
        console.log("上拉加载更多")
        if(this.data.isNoMore){ return }
        this.setData({pageIndex:this.data.pageIndex+1})
        this._getAttractionsList(false)
    },
    // 城市输入框失去焦点
    onCityInputBlur({detail}) {
        this.setData({ tempCityName: detail.value})
    },
    // 确定输入城市
    submitCity() {
        this.setData({ cityName: this.data.tempCityName})
    },
    // 跳转至详情页
    navToDatailPage({currentTarget}) {
        let id = currentTarget.dataset.id
        console.log(id)
        // wx.navigateTo({
        //     url: `/pages/goodsDetails/goodsDetails?id=${detail.id}`
        //   })
    }

})