// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // MainSrc:"/image/qietu/tianqibeijin",
    MainSrc:"https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu/tianqibeijin",
    Info: [{ Location: "广州",Name:[], Temperature: "35°C", Weather: "晴",WeatherId:"100" ,CardId:5,OtherInfo:{aqi:"",qlt:"",pm25:""}, Date: "2018.7.28--Sunday", Warning: "20号西瓜台风将登陆广州",hasWarning:true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜",forecast:[] },
      { Location: "杭州", Name: [], Temperature: "35°C", Weather: "晴转多云", WeatherId: "100", CardId: 5, OtherInfo: { aqi: "", qlt: "", pm25: "" }, Date: "2018.7.28--Sunday", Warning: "", hasWarning: false, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜", forecast: [] }],
    // Info: [{ Location: "广州", Name: "我", Temperature: "35°C", Weather: "晴", OtherInfo: "AQI 15 空气质量 优", Date: "2018.7.28--Sunday", Warning: "20号西瓜台风将登陆广州", hasWarning: true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜" }],
  WeatherIcon:["test1.png","iconsnow.png","iconrain.png",""],
  WeatherCard: ["snow.png", "rain.png","cloud.png", "frog.png", "hot.png",  "sunny.png", "wind.png"],
  WeatherCardReverse: ["snowReverse.png", "rainReverse.png", "cloudReverse.png", "frogReverse.png", "hotReverse.png", "sunnyReverse.png", "windReverse.png"],
  BottomBg:"bottomBg.png",
  AddButton:"addButton.png"
  
  },
navigate:function(event){
  console.log(event);
  //event.currentTarget.id;
  var i=parseInt(event.currentTarget.id);
var that=this;
wx.navigateTo({
  url: '../mainWeather/mainWeather?Info='+JSON.stringify(that.data.Info[i]),
})
},
Add:function(){
  console.log("AddNumber");
  wx.navigateTo({
    url: '../addMember/addMember',
  })
},


PullData:function(){
  var test = getApp().globalData;
  //console.log(this.data.Info);
  var that = this;
  for (var i = 0; i < this.data.Info.length; i++) {
    var url = test.heWeather + 'weather?key=' + test.key + '&location=' + this.data.Info[i].Location;
    //console.log(url);

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
        var j;
        for (j = 0; j < that.data.Info.length; j++)
          if (that.data.Info[j].Location == basic.location)
            break;

        var tmp = that.data.Info[j];
        tmp.Temperature = now.tmp + "°C"
        tmp.Weather = daily_forecast_today.cond_txt_d;
        tmp.WeatherId = daily_forecast_today.cond_code_d;
//根据天气确定卡片背景
        var a=parseInt(tmp.WeatherId);
        var b;
        if(a==100||a==103||(a>=200&&a<=204))
        b=5;
        else if(a==213||a==900)
        b=4;
        else if(a>=205&&a<=212)
        b=6;
        else if(a>=500&&a<=515)
        b=3;
        else if((a>=400&&a<=410)||a==499||a==901)
        b=0;
        else if((a>=300&&a<=318)||a==399)
        b=1;
        else if(a==101||a==104||a==102)
        b=2;
        else
        b=6;
        tmp.CardId=b;


        tmp.Cloth = lifestyle[1].brf;
        tmp.Cold = lifestyle[2].brf;
        tmp.Date = daily_forecast_today.date;
        tmp.Rays = lifestyle[5].brf;
        tmp.Sports = lifestyle[3].brf;
        tmp.forecast = res.data.HeWeather6[0].daily_forecast;
        var t="Info["+j+"]";
        that.setData({
          [t]:tmp,
        })
        console.log("tmp");
        console.log(tmp);
       // console.log(that.data.Info[j]);
        //flag=true;
      }
    })
    var urlair = 'https://free-api.heweather.com/s6/air/now?key=' + test.key + '&location=' + this.data.Info[i].Location;
    console.log(urlair);
    wx.request({
      url: urlair,
      data: {},
      method: 'GET',
      success: function (res) {
        //console.log(res);
        var basic = res.data.HeWeather6[0].basic;
        var air_now_city = res.data.HeWeather6[0].air_now_city;
        var aqi = air_now_city.aqi;
        var quality = air_now_city.qlty;
        var pm25 = air_now_city.pm25;
        var j;
        for (j = 0; j < that.data.Info.length; j++)
          if (that.data.Info[j].Location == basic.location)
            break;
        var tmp = that.data.Info[j];
        tmp.OtherInfo.aqi=aqi;
        tmp.OtherInfo.qlt = quality;
        tmp.OtherInfo.pm25 = pm25;
        var t="Info["+j+"]";
that.setData({
[t]:tmp,
})

      }
    })

  }

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.PullData();
    
      console.log("onLoad");
  //      var test = getApp().globalData;
  //      console.log(this.data.Info);
  //     var that = this;
  //     for(var i=0;i<this.data.Info.length;i++)
  //    {
  //      var url = test.heWeather + 'weather?key=' + test.key + '&location=' + this.data.Info[i].Location;
  //      console.log(url);
   
  //     wx.request({
  //     url: url,
  //     data: {},
  //     method: 'GET',
  //     success: function (res) {
  //       console.log(res.data);

  //       var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
  //       var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
  //       var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
  //       var basic = res.data.HeWeather6[0].basic;
  //       var update = res.data.HeWeather6[0].update.loc;//更新时间
  //       var now = res.data.HeWeather6[0].now;
  //       var lifestyle = res.data.HeWeather6[0].lifestyle;
  //       var j;
  //       for (j = 0; j < that.data.Info.length;j++)
  //          if(that.data.Info[j].Location==basic.location)
  //              break;
               
  //       var tmp=that.data.Info[j];
  //       tmp.Temperature=now.tmp+"°C"
  //       tmp.Weather=daily_forecast_today.cond_txt_d;
  //       tmp.WeatherId=daily_forecast_today.cond_code_d;
  //       tmp.OtherInfo=//aqi qlt
  //       tmp.Cloth=lifestyle[1].brf;
  //       tmp.Cold=lifestyle[2].brf;
  //       tmp.Date=daily_forecast_today.date;
  //       tmp.Rays=lifestyle[5].brf;
  //       tmp.Sports=lifestyle[3].brf;
  //       console.log("tmp");
  //       console.log(tmp);
  //       console.log(that.data.Info[j]);
  //      //flag=true;
  //     }
  //   })
  //   var urlair = 'https://free-api.heweather.com/s6/air/now?key=' + test.key + '&location=' +  this.data.Info[i].Location;
  //     console.log(urlair);
  //   wx.request({
  //     url: urlair,
  //     data: {},
  //     method: 'GET',
  //     success: function (res) {
  //       console.log(res);
  //       var basic = res.data.HeWeather6[0].basic;
  //       var air_now_city = res.data.HeWeather6[0].air_now_city;
  //       var aqi = air_now_city.aqi;
  //       var quality = air_now_city.qlty;
  //       var pm25 = air_now_city.pm25;
  //       var j;
  //       for (j = 0; j < that.data.Info.length; j++)
  //        if (that.data.Info[j].Location == basic.location)
  //            break;
  //       var tmp=that.data.Info[j];
  //       tmp.OtherInfo="AQI"+aqi+"空气质量"+quality;


  //     }
  //   })

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
    var test = getApp().globalData;
    if(test.WeatherNeedRefresh==true)
    {
      
    }
    console.log("onshow");
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
    console.log("onUnload");
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
  
  }
})