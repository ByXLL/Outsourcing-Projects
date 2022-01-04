// pages/raiders/raiders.js
import {getRaidersByParamPager} from "../../network/apis/raiders.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    raidersList: [],
    raidersTotal: 0,
    pageIndex: 1,
    isNoMore: false,
    option: [{
        text: '综合',
        value: 1
      },
      {
        text: '最热',
        value: 2
      },
      {
        text: '最新',
        value: 3
      }
    ],
    title: '',
    optionValue: 1,
    tempAuthor: '',
    author: '',
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({pageIndex:this.data.pageIndex+1})
    if(!this.data.isNoMore) {
      this.getRaidersList(false)
    }
  },
  // 获取攻略列表
  getRaidersList(isRefresh) {
    if(isRefresh) { this.setData({pageIndex:1}) }
    let data = {
      title: this.data.title,
      author: this.data.author,
      selectType: this.data.optionValue
    }
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
    let id = e.currentTarget.dataset.id
    let authorid = e.currentTarget.dataset.authorid
    let avatar = e.currentTarget.dataset.avatar
    wx.navigateTo({
      url: `/pages/raidersDetail/raidersDetail?id=${id}&authorid=${authorid}&avatar=${avatar}`
    })
  },
  // 跳转用户页
  toUserInfo(e) {
    let id =e.currentTarget.dataset.authorid
    wx.navigateTo({
      url: `/pages/userInfo/userInfo?userId=${id}`
    })
  },
  // 当搜索框内容发生改变
  onSearchChange({ detail }) {
    this.setData({
      title: detail
    })
  },
  // 点击搜索
  onSearchClick() {
    this.getRaidersList(true)
  },
  // 当下拉选择器发生改变
  changeSelect({ detail }) {
    this.setData({optionValue:detail})
    this.getRaidersList(true)
  },
  // 输入框失去焦点
  onAuthorInputBlur({detail}) {
    this.setData({ tempAuthor: detail.value })
  },
  // 确定输入
  submitAuthor() {
    this.setData({ author: this.data.tempAuthor })
    this.selectComponent('#item').toggle();
    this.onSearchClick()
  },
})