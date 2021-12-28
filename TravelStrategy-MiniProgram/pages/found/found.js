// pages/found/found.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clickOTA:0,
        titleOneTitleArray:[
            {
                index:0,
                title:"今日最佳"
            },
            {
                index:1,
                title:"价格最优"
            },
            {
                index:2,
                title:"距离最近"
            }
        ],
        titleOneImageArray:[
            {
                imageUrl:'/static/sea.jpg',
                title:'去白川乡看雪',
                collectNumber:1686
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'魔都爬楼拍照',
                collectNumber:286
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'初春赏花时节',
                collectNumber:386
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'昆仑雪山洱海',
                collectNumber:686
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'西华风花雪月',
                collectNumber:986
            }
        ],
        clickTTA:0,
        clickTTAT:0,
        titleTwoTitleArray:[
            {
                index:0,
                title:"怎么玩"
            },
            {
                index:1,
                title:"住哪里"
            },
            {
                index:2,
                title:"吃什么"
            },
            {
                index:3,
                title:"买什么"
            }
        ],
        titleTwoTitleTwoArray:[
            {
                index:0,
                title:'热门'
            },
            {
                index:1,
                title:'温泉度假带'
            },
            {
                index:2,
                title:'新地标建筑'
            },
            {
                index:3,
                title:'特色温泉'
            },
            {
                index:4,
                title:'长城'
            },
            {
                index:5,
                title:'故宫'
            },
            {
                index:6,
                title:'颐和园'
            }
        ],
        titleTwoImageArray:[
            {
                imageUrl:'/static/sea.jpg',
                title:'三亚'
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'上海'
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'丽江'
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'西藏'
            },
            {
                imageUrl:'/static/sea.jpg',
                title:'新疆'
            }
            ,
            {
                imageUrl:'/static/sea.jpg',
                title:'桂林'
            }
        ],
        personalityArray:[
            {
                title:'游走中国',
                title1:'9个地点可体验',
                title2:'8888人觉得感兴趣',
                imageUrlBig:'/static/sea.jpg',
                imageUrlT1:'/static/sea.jpg',
                imageUrlT2:'/static/sea.jpg',
            },
            {
                title:'一个人的旅游',
                title1:'6个地点可体验',
                title2:'6895人觉得感兴趣',
                imageUrlBig:'/static/sea.jpg',
                imageUrlT1:'/static/sea.jpg',
                imageUrlT2:'/static/sea.jpg',
            }
        ],
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
     * 点击第一个标题
     */
    titleOneClick: function (event) {
        console.log(JSON.stringify(event))
        let index = event.currentTarget.dataset['index'];
        this.setData({
            clickOTA:index
        })
    },
    titleTwoClick: function (event) {
        console.log(JSON.stringify(event))
        let index = event.currentTarget.dataset['index'];
        this.setData({
            clickTTA:index
        })
    },
    titleTwoTwoClick: function(event){
        let index = event.currentTarget.dataset['index'];
        this.setData({
            clickTTAT:index
        })
    }
})