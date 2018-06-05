// pages/addMember/addMember.js
var Bmob = require('../../utils/bmob.js');
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
    isModify: false,
    nowId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var app = getApp();
    var getAppInfo = app.globalData.openid;  
    console.log(getAppInfo)  
    // console.log(e.objectId);
    
    // if (typeof (e) != undefined) {
    //   console.log("编辑 onload");
    //   this.data.nowId = e.objectId;
    //   this.data.isModify = true;
    //   var objectId = e.objectId;
    //   var that = this;
    //   var Note = Bmob.Object.extend("note");
    //   var query = new Bmob.Query(Note);

    //   query.get(objectId, {
    //     success: function (result) {
    //       console.log(result, result.id);
    //       that.setData({
    //         rows: result,
    //       })
    //     },
    //     error: function (result, error) {
    //       console.log("查询失败");
    //     }
    //   });
    // }
    // else {
    //   this.data.isModify = false;
    //   console.log("普通增加人")
    // }


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
      console.log("添加家人成员");
      console.log(this.data.array[this.data.index]);
      console.log(this.data.region);

      var Diary = Bmob.Object.extend("note");
      var query = new Diary();
      query.set("name", this.data.array[this.data.index]);
      query.set("province", this.data.region[0]);
      query.set("city", this.data.region[1]);
      query.set("district", this.data.region[2]);
      //query.set("openid",)
      query.save(null, {
        success: function (result) {
          console.log(result);
        },
        error: function (result, error) {
          // 添加失败
          console.log('error save');
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