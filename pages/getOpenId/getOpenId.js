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

    //修改
    // var Diary = Bmob.Object.extend("families");
    // var query = new Bmob.Query(Diary);

    var Diary = Bmob.Object.extend("families");
    var query = new Bmob.Query(Diary);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get(that.data.nowId, {
      success: function (result) {

        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('title', modyTitle);
        result.set('content', modyContent);
        result.save();
        common.showTip('日记修改成功', 'success', function () {
          that.onShow();
          that.setData({
            modifyDiarys: false
          })
        });

        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    });
  }
})