// pages/note/note.js
//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
Page({

  data: {
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    diaryList: [],
    modifyDiarys: false,

    map:{},
    family:[{location:"",members:[{relation:"",score:0}]}],
    location:["杭州","广州"],
    members: [[{ relation: "爸爸", score: 80 }, { relation: "妈妈", score: 80 }],[{ relation: "妹妹", score: 80 }]]
  },
  onReady: function (e) {

  },
  onLoad: function () {
    var a=this.data.map;
    a["hangzhou"]=["爸爸","妈妈"];
    a["guangzhou"]=["妹妹"];
    that = this;
    console.log("this.data.map");
    console.log(this.data.map);
    // wx.showShareMenu({
    //   withShareTicket: true //要求小程序返回分享目标信息
    // })

    // var k = 'http://bmob-cdn-12917.b0.upaiyun.com/2017/07/18/d99d3bb7400cb1ed808f34896bff6fcc.jpg';

    // var newUrl = k.replace("http://bmob-cdn-12917.b0.upaiyun.com", "https://bmob-cdn-12917.bmobcloud.com")

    // console.log(newUrl);

  },
  noneWindows: function () {
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  onShow: function () {

    getNote(this);


    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
})


/*
* 获取数据
*/

function getNote(t, k) {
  that = t;
  var Note = Bmob.Object.extend("note");
  var query = new Bmob.Query(Note);
  var query1 = new Bmob.Query(Note);

  //会员模糊查询
  if (k) {
    query.equalTo("title", { "$regex": "" + k + ".*" });
    query1.equalTo("content", { "$regex": "" + k + ".*" });
  }

  //普通会员匹配查询
  // query.equalTo("title", k);

  query.descending('createdAt');
  // 查询所有数据
  query.limit(that.data.limit);
  var app = getApp();
  var openidMy = app.globalData.openid;  
  var mainQuery = Bmob.Query.or(query, query1);
  mainQuery.equalTo("openid", openidMy);
  mainQuery.find({
    success: function (results) {
      // 循环处理查询到的数据
      console.log(results);
      that.setData({
        noteList: results
      })
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}