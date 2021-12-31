import {register} from "../../network/apis/user.js"
import Toast from "@vant/weapp/toast/toast"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: 'zhangsan',
        nickName: '张三',
        password: 'Aa123456',
        confirmPassword: 'Aa123456'
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
    // 注册
    toRegister() {
        let userName = this.data.username
        let nickName = this.data.nickName
        let password = this.data.password
        let confirmPassword = this.data.confirmPassword
        if(userName.trim() == '') { return Toast.fail('请输入用户名') }
        if(nickName.trim() == '') { return Toast.fail('请输入昵称') }
        if(password.trim() == '') { return Toast.fail('请输入密码') }
        if(confirmPassword.trim() == '') { return Toast.fail('请再次输入密码') }
        if(password != confirmPassword ) { return Toast.fail('前后密码输入不一致') }
        Toast.loading('正在注册中...')
        let data = { userName,nickName,password}
        register(data).then(({data}) => {
            console.log(data)
            Toast.success('注册成功');
        }).catch(err => {
            Toast.fail(err.msg);
        })
    },
    toLoginPage() {
        wx.navigateTo({
            url: `/pages/login/login`
        })
    }
})