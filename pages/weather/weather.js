// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // MainSrc:"/image/qietu/tianqibeijin",
    MainSrc:"https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu/tianqibeijin",
    Info: [{ Location: "广州",Name:[], Temperature: "35°C", Weather: "晴", OtherInfo: "AQI 15 空气质量 优", Date: "2018.7.28--Sunday", Warning: "20号西瓜台风将登陆广州",hasWarning:true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜" },
     { Location: "广州", Name:[],Temperature: "35°C", Weather: "晴转多云", OtherInfo: "AQI 15 空气质量 优", Date: "2018.7.28--Sunday", Warning: "",hasWarning:false, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜" }],
    // Info: [{ Location: "广州", Name: "我", Temperature: "35°C", Weather: "晴", OtherInfo: "AQI 15 空气质量 优", Date: "2018.7.28--Sunday", Warning: "20号西瓜台风将登陆广州", hasWarning: true, Cloth: "冷", Rays: "最强", Cold: "极易发", Sports: "不适宜" }],
  WeatherIcon:["test1.png","iconsnow.png","iconrain.png",""],
  WeatherCard: ["snow.png", "rain.png","cloud.png", "frog.png", "hot.png",   "sunny.png", "wind.png"],
  WeatherCardReverse: ["snowReverse.png", "rainReverse.png", "cloudReverse.png", "frogReverse.png", "hotReverse.png", "sunnyReverse.png", "windReverse.png"],
  BottomBg:"bottomBg.png",
  AddButton:"addButton.png"
  
  },
navigate:function(){
wx.navigateTo({
  url: '../mainWeather/mainWeather',
})
},
Add:function(){
  console.log("AddNumber");
  wx.navigateTo({
    url: '../addMember/addMember',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log("onLoad");
  var test = getApp().globalData;
  var url = test.heWeather+'weather?key='+test.key +'&location='+this.data.Info[0].Location;
  console.log(url);
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    success: function (res) {
      // var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
      // var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
      // var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
      // var basic = res.data.HeWeather6[0].basic;
      // var update = res.data.HeWeather6[0].update.loc;//更新时间
      console.log(res);
    }

    })


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