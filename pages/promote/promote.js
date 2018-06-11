// pages/addMember/addMember.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MainSrc: "https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu",
    region: ["浙江省", "杭州市", "西湖区"],
    Mood: ["狂喜", "抓狂", "开心", "伤心", "抑郁", "轻松", "元气", "疲惫", "生气", "平淡"],
    index: 0,  
    

    Info: [
      { Location: "牡丹市", Name: [], Temperature: "35°C", Weather: "晴", WeatherId: "100", CardId: 5, OtherInfo: { aqi: "15", qlt: "优秀", pm25: "15" }, Tips: [], Date: "2018.7.28  Sunday", Week: "", Warning: "", hasWarning: true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜", forecast: [] }, { Location: "广州市", Name: [], Temperature: "35°C", Weather: "晴", WeatherId: "100", CardId: 5, OtherInfo: { aqi: "", qlt: "", pm25: "" }, Tips: [], Date: "2018.7.28 Sunday", Week: "", Warning: "", hasWarning: true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜", forecast: [] }
    ],
    Color: ["#a1b3c0", "#7ac7db", "#7baac7", "#b7b7b7", "#ff7b2e", "#ffba2e", "#7991bd", "#427099"],
    StringWord: ["ε٩(๑> ₃ <)۶з", "(／‵Д′)／~", "( ≧∀≦ )ゞ", "(╥﹏╥)", "(´Ａ｀。)", "(ㄏ￣▽￣)ㄏ", "٩(。·ω·。)و", "_(:3 ⌒ﾞ)_", "ヽ(#`Д´) ﾉ", "~( *’ｰ’* )~"],
    mood: 0,
    IsHidden:true,
    canvas:"",
    newCanvas:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
      console.log("OnLoad");
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

  createPic:function(){
    this.setData({
      'Info[0].Location': this.data.region[1],
      mood: this.data.index,
      IsHidden:false,
    })
    this.PullData();
    
  },
  yes:function(){
    console.log("yes");
  },

  click: function () {
    
    const ctx = wx.createCanvasContext('myCanvas');
    
    var tmp = this.data;
    var info = tmp.Info[0];
    //ctx.drawImage(tmp.MainSrc + "/" +tmp.WeatherCard[tmp.Info[0].CardId],0,0,375,195);
    var width = wx.getSystemInfoSync().windowWidth;
    console.log(width);
    var k = width / 750.0;
    ctx.drawImage("/image/bg.png", 0, 0, 750 * k, 750 * k);
    console.log(k);
    var c = tmp.Color[info.CardId];
    ctx.setFillStyle(c);

    ctx.setFontSize(80 * k);
    ctx.fillText(tmp.StringWord[tmp.mood], 55 * k, 250 * k);

    ctx.setFontSize(64 * k);
    ctx.fillText(info.Location, 55 * k, 370 * k);

    ctx.setFontSize(50 * k);
    ctx.fillText(info.Temperature, 55 * k, 458 * k);

    ctx.setFontSize(37 * k);
    ctx.fillText(info.Weather, 222 * k, 458 * k);

    ctx.setFontSize(25 * k);
    ctx.fillText("AQI" + info.OtherInfo.aqi + " 空气质量 " + info.OtherInfo.qlt, 55 * k, 507 * k);

    ctx.setFontSize(21 * k);
    ctx.fillText(info.Date + " " + info.Week, 55 * k, 556 * k);


    ctx.draw();
this.setData({
  canvas:ctx
})


    const ctx1 = wx.createCanvasContext('newCanvas');
  
ctx1.scale(2,2);
    ctx1.drawImage("/image/bg.png", 0, 0, 750 * k, 750 * k);
    console.log(k);
    var c = tmp.Color[info.CardId];
    ctx1.setFillStyle(c);
    ctx1.setFontSize(80 * k);
    ctx1.fillText(tmp.StringWord[tmp.mood], 55 * k, 250 * k);
    ctx1.setFontSize(64 * k);
    ctx1.fillText(info.Location, 55 * k, 370 * k);
    ctx1.setFontSize(50 * k);
    ctx1.fillText(info.Temperature, 55 * k, 458 * k);
    ctx1.setFontSize(37 * k);
    ctx1.fillText(info.Weather, 222 * k, 458 * k);
    ctx1.setFontSize(25 * k);
    ctx1.fillText("AQI" + info.OtherInfo.aqi + " 空气质量 " + info.OtherInfo.qlt, 55 * k, 507 * k);
    ctx1.setFontSize(21 * k);
    ctx1.fillText(info.Date + " " + info.Week, 55 * k, 556 * k);
    ctx1.draw();
    this.setData({
      newCanvas: ctx1
    })
  },
  Save:function(){
    this.setData({
      IsHidden:true
    })
console.log(this.data.canvas);


wx.canvasToTempFilePath({
  x: 0,
  y: 0,
  width: 750,
  height: 750,
  destWidth: 750,
  destHeight: 750,
  canvasId: 'newCanvas',
  success: function (res) {
    wx.saveImageToPhotosAlbum({
      filePath: res.tempFilePath,
    })
  }
})

  },
  PullData: function () {
    var that = this;
    var test = getApp().globalData;
    var i = 0;
    {
      var url = test.heWeather + 'weather?key=' + test.key + '&location=' + this.data.Info[i].Location.replace("市", "");

      console.log(url);

      wx.request({
        url: url,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res.data);

          var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
          var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
          var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
          var basic = res.data.HeWeather6[0].basic;
          var update = res.data.HeWeather6[0].update.loc;//更新时间
          var now = res.data.HeWeather6[0].now;
          var lifestyle = res.data.HeWeather6[0].lifestyle;
          var j=0;
          
          var tmp = that.data.Info[j];
          tmp.Temperature = now.tmp + "°C";
          tmp.Weather = now.cond_txt;
          tmp.WeatherId = now.cond_code;
          //根据天气确定卡片背景
          var a = parseInt(tmp.WeatherId);
          var b;
          if (a == 100 || a == 103 || (a >= 200 && a <= 204))
            b = 5;
          else if (a == 213 || a == 900)
            b = 4;
          else if (a >= 205 && a <= 212)
            b = 6;
          else if (a >= 500 && a <= 515)
            b = 3;
          else if ((a >= 400 && a <= 410) || a == 499 || a == 901)
            b = 0;
          else if ((a >= 300 && a <= 318) || a == 399)
            b = 1;
          else if (a == 101 || a == 104 || a == 102)
            b = 2;
          else
            b = 6;
          tmp.CardId = b;

          tmp.Cloth = lifestyle[1].brf;
          tmp.Cold = lifestyle[2].brf;
          tmp.Date = daily_forecast_today.date;
          var w = new Date(tmp.Date).getDay();
          var a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          tmp.Week = a[w];
          tmp.Rays = lifestyle[5].brf;
          tmp.Sports = lifestyle[3].brf;
          tmp.forecast = res.data.HeWeather6[0].daily_forecast;
          tmp.Tips = lifestyle;
          var t = "Info[" + j + "]";
          that.setData({
            [t]: tmp,
          })
          console.log("tmp");
          console.log(tmp);
          // console.log(that.data.Info[j]);
          //flag=true;


          var urlair = 'https://free-api.heweather.com/s6/air/now?key=' + test.key + '&location=' + that.data.Info[i].Location.replace("市", "");
          console.log(urlair);
          var that2=that;//??
          wx.request({
            url: urlair,
            data: {},
            method: 'GET',
            success: function (res) {
              console.log(res.data);
              var basic = res.data.HeWeather6[0].basic;
              var air_now_city = res.data.HeWeather6[0].air_now_city;
              var aqi = air_now_city.aqi;
              var quality = air_now_city.qlty;
              var pm25 = air_now_city.pm25;
              var j;
              for (j = 0; j < that2.data.Info.length; j++)
                if (that2.data.Info[j].Location.replace("市", "") == basic.location)
                  break;
              var tmp = that2.data.Info[j];
              tmp.OtherInfo.aqi = aqi;
              tmp.OtherInfo.qlt = quality;
              tmp.OtherInfo.pm25 = pm25;
              var t = "Info[" + j + "]";
              that2.setData({
                [t]: tmp,
              })
              that2.click();

            }
          })



        }
      })
      // var urlair = 'https://free-api.heweather.com/s6/air/now?key=' + test.key + '&location=' + this.data.Info[i].Location.replace("市", "");
      // console.log(urlair);
      // wx.request({
      //   url: urlair,
      //   data: {},
      //   method: 'GET',
      //   success: function (res) {
      //     console.log(res.data);
      //     var basic = res.data.HeWeather6[0].basic;
      //     var air_now_city = res.data.HeWeather6[0].air_now_city;
      //     var aqi = air_now_city.aqi;
      //     var quality = air_now_city.qlty;
      //     var pm25 = air_now_city.pm25;
      //     var j;
      //     for (j = 0; j < that.data.Info.length; j++)
      //       if (that.data.Info[j].Location.replace("市", "") == basic.location)
      //         break;
      //     var tmp = that.data.Info[j];
      //     tmp.OtherInfo.aqi = aqi;
      //     tmp.OtherInfo.qlt = quality;
      //     tmp.OtherInfo.pm25 = pm25;
      //     var t = "Info[" + j + "]";
      //     that.setData({
      //       [t]: tmp,
      //     })
      //     that.click();

      //   }
      // })

    }

  },
})