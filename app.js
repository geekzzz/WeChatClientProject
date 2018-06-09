//app.js

var Bmob = require('utils/bmob.js')

// var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
// const BmobSocketIo = require('utils/tunnel');
Bmob.initialize(
  '846f94b5d815513ca95979dd5a0b0482',
  '3cf724ab1a2fe92b20d5679aaa0293ee'
)
// Bmob.initialize("983bc08c5a6d2e9bafa83b2c550a8175", "1a388a666e3bf56dedbcdd9d54a60e11");


App({
  onLaunch: function () {
    var user = new Bmob.User() //开始注册用户
    console.log('yonghudenglu')
    user.auth().then(function (obj) {
      console.log('登陆成功')
    },
      function (err) {
        console.log('失败了', err)
      });

    //获取open id，请在官网填写微信小程序key
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
console.log(res);
          Bmob.User.requestOpenId(res.code, {
            success: function (result) {
              that.globalData.openid = result.openid;
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

        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            console.log(that.globalData.userInfo);
          }
        })
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(that.globalData.userInfo);
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    openid: 0,
    heWeather:"https://free-api.heweather.com/s6/",
    key:"366e80dfa0564b88a64d4f9898b427ca",
    WeatherNeedRefresh1: false,
    WeatherNeedRefresh2: false,
  }
})

