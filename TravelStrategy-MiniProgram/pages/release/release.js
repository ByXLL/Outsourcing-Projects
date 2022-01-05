import {
  baseURL
} from '../../network/config.js'
import {getStorageByKey} from "../../utils/util.js"
import {addRaiders,getRaidersById} from "../../network/apis/raiders.js"
import Toast from "@vant/weapp/toast/toast"
Page({
  data: {
    id: '',
    title: '',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    coverPicList: [],
    bigPicList: [],
    raidersInfo: {},
    isEdit: false,
  },
  onLoad(option) {
    let id = option.id
    if(id != undefined) {
      this.setData({id,isEdit:true})
      this._getRaidersById()
    }
  },
  // 获取攻略详情
  _getRaidersById() {
    getRaidersById(this.data.id).then(({data}) => {
      this.setData({raidersInfo:data})
    }).catch(err => {
      console.log(err)
    })
  },
  async formSubmit(e) {
    let data = await this.buildFormData()
    if(data.title == '') { return Toast.fail('请填写简介') }
    console.log(data)
    addRaiders(data).then(res => {
      console.log(res)
      Toast.success('发布攻略成功')
    }).catch(err => {
      Toast.fail('发布攻略失败')
    })
  },
  // 预览/编辑
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  // 改变状态
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  // 插入分割线
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  // 清空
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat(e) {
    console.log(e)
    this.editorCtx.removeFormat()
  },
  // 添加图片
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.uploadImg({url: res.tempFiles[0].path},'content')
      }
    })
    //选择图片结束
  },
  // 上传头像
  afterRead(event) {
    console.log(event)
    let field = event.currentTarget.dataset.field
    const { file } = event.detail;
    this.uploadImg(file,field)
  },
  // 删除上传的图片
  deletePic(e) {
    let field = e.currentTarget.dataset.field
    let index = e.detail.index
    if(field == 'corverPic') {
      this.setData({coverPicList:[]})
    }
    if(field == 'bigPic') {
      let tempData = [...this.data.bigPicList]
      tempData.splice(index,1)
      this.setData({bigPicList:tempData})
    }
  },
  // 上传文件
  uploadImg(file,field) {
    wx.uploadFile({
      url: baseURL+`/upload`,
      filePath: file.url,
      name: 'file',
      success: ({data}) => {
        let res = JSON.parse(data)
        let filePath = res.data.filePath
        console.log(res)
        if(field == 'corverPic') {
          const fileList = [] 
          fileList.push({url: filePath})
          this.setData({ coverPicList:fileList })
        }
        if(field == 'bigPic') {
          const fileList = [...this.data.bigPicList];
          fileList.push({ url: filePath });
          this.setData({ bigPicList:fileList });
        }
        if(field == 'content') {
          this.editorCtx.insertImage({ src: filePath})
        }
      },
    });
  },
  // 简介输入中
  onInput({detail}) {
    this.setData({title:detail.value})
  },
  // 构建上传的数据
  async buildFormData() {
    let userInfo = getStorageByKey('userInfo')
    let data = {}
    data.title = this.data.title
    data.authorId = userInfo.id
    data.author = userInfo.nickName
    data.coverPic = this.data.coverPicList.length > 0 ? this.data.coverPicList[0].url : ''
    data.pic = this.data.bigPicList.map(item => item.url).toString()
    let content = await this.editorCtx.getContents()
    data.content = content.html
    return data
  }
})