// pages/mainWeather/mainWeather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message:"",
    
    MainSrc:"	https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu/分享页面/",
yuyinSrc:"语音输入.png",
tuoyuanSrc:"椭圆形.png",
shoucangSrc:"心.png",
animation0:'',
animation1:'',
animation2:'',
animationSrc: ["太阳1.png", "太阳2.png", "太阳3.png"],
  location:"广州",
  weather:"晴",
  temperature:"45°C",
  weatherTomorrow:"晴",
  weatherAfterTomorrow:"多云",
  index:"AQI/63,PM2.5/41",
  forecast: [{ date: "6月1日", weather: "晴", temperature: "43°/35°" }, { date: "6月2日", weather: "晴", temperature: "43°/35°" }, { date: "6月3日", weather: "晴", temperature: "43°/35°" }, { date: "6月4日", weather: "晴", temperature: "43°/35°" }, { date: "6月5日", weather: "晴", temperature: "43°/35°"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.animation0=wx.createAnimation({
    duration:1000,
    timingFunction:"ease",
    delay:0,
    transformOrigin:"100% 0 0"
  });
  this.animation1 = wx.createAnimation({
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
    transformOrigin: "100% 0 0"
  });
  this.animation2 = wx.createAnimation({
    duration: 1000,
    timingFunction: "ease",
    delay: 0,
    transformOrigin: "100% 0 0"
  });
  var n=0;
  setInterval(function(){
n=n+1;
this.translate();
  }.bind(this),3000)
  },
translate:function(){
  this.animation0.scale(1.1,1.1).step({}).scale(1,1).step();
  this.animation1.scale(1.15, 1.15).step({}).scale(1, 1).step();
  this.animation2.scale(1.2, 1.2).step({}).scale(1, 1).step();

  this.setData({
    animation0:this.animation0.export(),
    animation1: this.animation1.export(),
    animation2:this.animation2.export(),
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.animation0 = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: "linear",
    //   delay: 0,
    //   transformOrigin: "100% 0 0"
    // });
    // this.animation1 = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: "linear",
    //   delay: 0,
    //   transformOrigin: "100% 0 0"
    // });
    // this.animation2 = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: "linear",
    //   delay: 0,
    //   transformOrigin: "100% 0 0"
    // });
    // var n = 0;
    // setInterval(function () {
    //   n = n + 1;
    //   this.translate();
    // }.bind(this), 10000)
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
  listenerMessageInput:function(e){
    this.data.Message=e.detail.value;
  },


  yuyin:function(){
    console.log("语音输入");
  },
  share:function(){
    console.log("share");
  }
})