// pages/other/other.js
var that;
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
Page({
  data: {
    loading: true
  },
  onLoad: function () {
    that = this;
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getOpenId: function () {
    //获取open id，请在官网填写微信小程序key
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)

          Bmob.User.requestOpenId(res.code, {
            success: function (result) {
              that.setData({
                loading: true,
                url: result.openid
              })
              console.log(result)
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          common.showTip('获取用户登录态失败！', 'loading');
        }
      }
    });


    //存储
    // var Diary = Bmob.Object.extend("families");
    // var query = new Diary();
    // query.set("relation","bababab");
    // query.set("name","131");
    // query.save(null, {
    //   success: function (result) {
    //     console.log(result);
    //   },
    //   error: function (result, error) {
    //     // 添加失败
    //     console.log('error save');
    //   }
    // });


    //查询
    // var Diary = Bmob.Object.extend("families");
    // var query = new Bmob.Query(Diary);
    // query.equalTo("relation","爸爸");
    // query.find({
    //   success: function (results) {
    //     console.log(results)
    //   },
    //   error: function (error) {
    //     console.log("查询失败: " + error.code + " " + error.message);
    //   }
    // });
  }
})