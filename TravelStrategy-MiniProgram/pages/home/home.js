// pages/home/home.js
import {getRaidersByParamPager} from "../../network/apis/raiders.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navClickIndex:'',
    navArray:[
      {
        index:0,
        title:'攻略'
      },
      {
        index:1,
        title:'门票'
      },
      {
        index:2,
        title:'美食'
      },
      {
        index:3,
        title:'周边游'
      },
      {
        index:4,
        title:'游记'
      },
    ],
    swiperImgs: [
      '/static/swiper/banner1.jpg',
      '/static/swiper/banner2.jpg',
      '/static/swiper/banner3.jpg'
    ],
    raidersList: [],
    raidersTotal: 0,
    pageIndex: 1,
    isNoMore: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRaidersList(true)
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
    if(!this.data.isNoMore) {
      
    }
  },
  /**
   * 点击导航
   */
  navClick(event){
    console.log(JSON.stringify(event))
    let index = event.currentTarget.dataset['index'];
    let title = event.currentTarget.dataset['title'];
    console.log("index",index)
    console.log("title",title)
  },
  // 获取攻略列表
  getRaidersList(isRefresh) {
    if(isRefresh) { this.setData({pageIndex:1}) }
    let data = {}
    getRaidersByParamPager(this.data.pageIndex,10,data).then(({data}) => {
      console.log(data)
      if(isRefresh) {
        this.setData({
          raidersList: data.records,
          raidersTotal: data.total
        })
      }else {
        let tempDataList = [...this.data.raidersList,...data.records]
        let isSameLength = data.total == tempDataList.length ? true : false
        this.setData({
          raidersList: tempDataList,
          isNoMore: isSameLength
        })
    }
    }).catch(err => {
      console.log(err)
    })
  },
  // 跳转至详情页
  toRaidersDetail(e) {
    let id =e.currentTarget.dataset.authorId 
    wx.navigateTo({
      url: `/pages/raidersDetail/raidersDetail?id=${id}`
    })
  },
  // 跳转用户页
  toUserInfo(e) {
    let id =e.currentTarget.dataset.authorid 
    wx.navigateTo({
      url: `/pages/userInfo/userInfo?userId=${id}`
    })
  },
  // 跳转攻略列表页
  toRaidersPage() {
    wx.navigateTo({
      url: `/pages/raiders/raiders`
    })
  },
  // 跳转景点列表页
  toAttractionsPage() {
    wx.switchTab({
      url: `/pages/attractions/attractions`
    })
  }
})