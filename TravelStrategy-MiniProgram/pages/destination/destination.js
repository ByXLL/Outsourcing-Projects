// pages/destination/destination.js
const amapFile = require('../../utils/amap-wx.js'); //引用amap-wx.js文件
import pinyin from "wl-pinyin"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showTopTip:false,
        oneActive:true,
        time:'',
        month:'',
        day:'',
        weather: [], //天气对象
        markersData: {
            latitude: '',//纬度
            longitude: '',//经度
            key: "09d9c656a90724f7fcbee829a0a83596" //申请的高德地图key
        },
        city:'',
        address:'',
        address2:'', 
        provinceName:'', // 省份名字
        cityName:'', // 城市名字
        weatherType:'', // 天气
        weatherTypePinYin:'', // 天气类型拼音
        temperature:'', // 温度
        humidity:'', // 湿度
        winddirection:'', // 风向
        windpower:'', // 风力
        location:[],
        interestArray:[
            {
                imgUrl:"/static/lyc.jpg",
                title1:"笑颜日记",
                title2:"签约旅行家",
            },
            {
                imgUrl:"/static/lyc.jpg",
                title1:"笑颜日记",
                title2:"签约旅行家",
            },
            {
                imgUrl:"/static/lyc.jpg",
                title1:"笑颜日记",
                title2:"签约旅行家",
            },
            {
                imgUrl:"/static/lyc.jpg",
                title1:"笑颜日记",
                title2:"签约旅行家",
            },
        ],
        tourismArray:[
            {
                imgUrl:"/static/sea.jpg",
                title:"上海迪士尼乐园是中国内地首座迪士尼主题乐园",
                money:"399",
                sf:"99"
            },
            {
                imgUrl:"/static/sea.jpg",
                title:"杭州西湖＋苏州园林＋乌镇＋南浔3日跟团游",
                money:"0",
                sf:"99"
            },
            {
                imgUrl:"/static/sea.jpg",
                title:"明朝时期的私人花园,素有“城市山林”之誉,又有“奇秀甲于东南”...",
                money:"40",
                sf:"99"
            },
        ],
        foodArray:[
            {
                imgUrl:"/static/sea.jpg",
                title:"杭州西湖＋苏州园林＋乌镇＋南浔3日跟团游",
                money:"88",
                sf:"99"
            },
            {
                imgUrl:"/static/sea.jpg",
                title:"杭州西湖＋苏州园林＋乌镇＋南浔3日跟团游",
                money:"66",
                sf:"100"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad: function (options) {
        this.showDay();
        this.loadWeatherInfo();
    },
    //获取当前位置的经纬度
    loadWeatherInfo: function () {
        wx.showLoading({
            title: '正在加载天气',
        })
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude//维度
                var longitude = res.longitude//经度
                that.loadCity(latitude, longitude);
            }
        })
    },
    //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
    loadCity: function (latitude, longitude) {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({ key: that.data.markersData.key });
        myAmapFun.getRegeo({
            location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
            success: function (data) {
                console.log("开始数据");
                console.log(data[0]['regeocodeData']['addressComponent']['city']);
                // 赋值
                that.setData({
                    city: data[0]['regeocodeData']['addressComponent']['city'],
                    address:data[0]['desc'],
                    address2: data[0]['name']
                });
                console.log(data);
            },
            fail: function (info) { }
        });
        myAmapFun.getWeather({
            success: function (data) {
                    wx.hideLoading()
                    that.setData({
                    weather: data,
                    provinceName:data.liveData.province,
                    cityName:data.liveData.city,
                    weatherType:data.weather.data,
                    temperature:data.temperature.data,
                    humidity:data.humidity.data,
                    winddirection:data.winddirection.data,
                    windpower:data.windpower.data,
                })
                that.weatherTypeToPinYin(),
                console.log("开始数据2");
                console.log(data);
                console.log("weather",that.data.weather);
                //成功回调
                console.log("provinceName",that.data.provinceName);
                console.log("cityName",that.data.cityName);
                console.log("天气类型-weatherType",that.data.weatherType);
                console.log("温度-temperature",that.data.temperature);
                console.log("湿度-humidity",that.data.humidity);
                console.log("风向-winddirection",that.data.winddirection);
                console.log("风力-windpower",that.data.windpower);
            },
            fail: function (info) {
                //失败回调
                wx.hideLoading()
                wx.showToast({
                    title:'获取天气失败',
                    icon:'warn'
                })
                console.log("开始数据3");
                console.log(info)
            }
        })
    },
    // 天气转化
    weatherTypeToPinYin(){
        console.log("aaaaaaaaaa--"+this.data.weatherType+"--"+pinyin.getPinyin(this.data.weatherType))
        this.setData({
            weatherTypePinYin:  pinyin.getPinyin(this.data.weatherType) 
        })
    },
    showDay(){
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        this.setData({
            month: M,
            day:D
        })
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
        this.loadWeatherInfo();
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
     * 页面滚动时执行
     */
    onPageScroll: function(e) {
        // 滚动大于300时候 显示回到顶部
        if(e.scrollTop > 300){
            this.setData({
                showTopTip:true
            })
        }else{
            this.setData({
                showTopTip:false
            })
        }
    },
    /**
     * 酒店或者民宿点击
     * @param {*} event 
     */
    oneActiveClick: function(event){
        let type = event.currentTarget.dataset['type'];
        this.setData({
            oneActive:type=='one'?true:false
        })

        if(type == 'two'){
            var date = new Date();
            //年
            var Y = date.getFullYear();
            //月
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            //日
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            //时
            var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            //分
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            //秒
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            this.setData({
                time: Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s,
            })
        }
    },
    /**
     * 地图点击
     */
    mapClick: function(){
        var _this=this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success (res) {
                const latitude = res.latitude
                const longitude = res.longitude
                // 打开位置
                // wx.openLocation({
                //     latitude,
                //     longitude,
                //     scale: 18
                // }),
                // 选择位置
                wx.chooseLocation({
                    success: function (res) {
                        console.log(res)
                        var name = res.name
                        var address = res.address
                        var latitude = res.latitude
                        var longitude = res.longitude
                        _this.setData({
                            location:res,
                        })
                    }
                })
            }
        })
    },
    /**
     * 回到顶部
     */
    goTopClick(){
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    }
})