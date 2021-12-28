// pages/home/home.js
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
    ]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  }
})