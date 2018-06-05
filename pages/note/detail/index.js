// pages/note/detail/index.js
var Bmob = require('../../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MainSrc: "https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu",
    nickname: "",
    location: "",
    time: "12:01",
    region: ["浙江省", "杭州市", "西湖区"],
    array: ["爸爸", "妈妈", "儿子", "女儿"],
    index: 0,
    rows: {},//从note界面跳转过来时，从数据库拉取的当前人物数据
    nowId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.objectId);
    this.data.nowId = e.objectId;
    var objectId = e.objectId;
    var that = this;
    var Note = Bmob.Object.extend("note");
    var query = new Bmob.Query(Note);

    query.get(objectId, {
      success: function (result) {
        console.log(result, result.id);
        that.setData({
          rows: result,
        })
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });
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
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindNameChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submit: function () {
    var that = this;
    console.log("this.data.nowId", this.data.nowId);
    var Note = Bmob.Object.extend("note");
    var query = new Bmob.Query(Note);
    query.get(this.data.nowId, {
      success: function (result) {
        result.set("name", that.data.array[that.data.index]);
        result.set("province", that.data.region[0]);
        result.set("city", that.data.region[1]);
        result.set("district", that.data.region[2]);
        result.save();
      },
      error: function (object, error) {

      }
    });
    wx.navigateBack({
      delta: 1
    });
    wx.navigateTo({
      url: '../collect/collect',
      success: (result) => {
        console.log("111");
      },
      fail: (result) => {
        console.log(result);
      },
    })
  }
})