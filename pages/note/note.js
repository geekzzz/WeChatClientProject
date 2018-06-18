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
    MainSrc: "https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu/",
    map: {},
    //family: [{ location: "", members: [{ relation: "", score: 0 }] }],
    family: [],
    location: ["杭州", "广州"],
    members: [[{ relation: "爸爸", score: 80}, { relation: "妈妈", score: 80 }], [{ relation: "女儿", score: 80 }]],
  },
  onReady: function (e) {

  },
  onLoad: function () {

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
   // tmp.WeatherNeedRefresh2 = false;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  /*
*修改note
*/
  ModifyNote: function (event) {
    console.log(event)
    console.log('modify')
    
    wx.navigateTo({
      url: './detail/index?Data=' + JSON.stringify(event.target.dataset),
    })
  },

  DeleteNote: function (event) {
    console.log(event.target.dataset.objid)
    console.log('delete')
    var Note = Bmob.Object.extend("note");
    var query = new Bmob.Query(Note);
    var objid = event.target.dataset.objid
    //query.equalTo("objectId",objid);
    query.get(objid, {
      success: function (result) {
        console.log(result, result.id);
        result.destroy()
      },
      error: function (result, error) {
        
      }
    });
    // wx.navigateTo({
    //   url: './detail/index?Data=' + JSON.stringify(event.target.dataset),
    // })
  },

  Add:function(){
    wx.navigateTo({
      url: '../addMember/addMember',
    })
  }
})


/*
* 获取数据
*/

function getNote(t, k) {
  that = t;
  that.data.family = []
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
      var that2 = that
    //  console.log(results);
      if (results.length > 0) {
     //   console.log('...........', results[0].attributes.city)
        var set = new Set();
        for (var i = 0; i < results.length; i++) {
      //    console.log(results[i].attributes.city)
          set.add(results[i].attributes.city)
        }
      //  console.log(set)
        for (var x of set) {
          //console.log(x)
          var LName = [];
          for (var i = 0; i < results.length; i++) {
            if (results[i].attributes.city == x) {
              var member =
                {
                  relation: results[i].attributes.name,
                  score: 80,
                  objid : results[i].id,
                  province: results[i].attributes.province,
                  city: results[i].attributes.city,
                  district: results[i].attributes.district,
                };
              //LName.push(results[i].attributes.name)
              LName.push(member)
            }
          }
        //  console.log(LName)
          var obj =
            {
              location: x,
              members: LName,
            };
          that2.data.family.push(obj)
        }
     //   console.log(that2.data.family)
        that2.setData({
          family: that2.data.family
        })
      }
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

