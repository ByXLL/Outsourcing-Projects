import {login} from "../../network/apis/user.js"
import {setStorage} from "../../utils/util.js"
import Toast from "@vant/weapp/toast/toast"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: 'zhangsan',
        password: 'Aa123456'
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
    // 登录
    toLogin() {
        let userName = this.data.username
        let password =this.data.password
        if(userName.trim() == '') { return Toast.fail('请输入用户名') }
        if(password.trim() == '') { return Toast.fail('请输入密码') }
        Toast.loading('正在登录中...')
        let data = { userName,password}
        login(data).then(({data}) => {
            console.log(data)
            Toast.success('登录成功');
            setStorage('token',data.token)
            setStorage('isLogin', true)
            setStorage('userInfo', data.userInfo)
        }).catch(err => {
            Toast.fail(err.msg);
        }).finally(() => {
            
        })
    },
    toRegister() {
        wx.navigateTo({
            url: `/pages/register/register`
        })
    }
})