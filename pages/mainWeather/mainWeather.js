// pages/mainWeather/mainWeather.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "宝贝女儿",
    Message: "最近升温了，少喝点饮料，都是色素，多吃苦瓜，苦瓜防癌",
    luyinSrc: '',
    Info: null,
    MainSrc: "	https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu/分享页面/",
    yuyinSrc: "语音输入.png",
    tuoyuanSrc: "椭圆形.png",
    shoucangSrc: "心.png",
    animation0: '',
    animation1: '',
    animation2: '',
    animationSrc: ["太阳1.png", "太阳2.png", "太阳3.png"],
    Card: ["snow", "rain", "cloud", "frog", "hot", "sun", "wind"],
    Color: ["#a1b3c0", "#7ac7db", "#7baac7", "#b7b7b7", "#ff7b2e", "#ffba2e", "7991bd"],
    tips: [],
    location: "广州",
    weather: "晴",
    weatherId: "100",
    cardId: 0,
    temperature: "45°C",
    tipsId: 0,
    weatherTomorrow: "晴",
    weatherAfterTomorrow: "多云",
    index: { aqi: "", qlt: "", pm25: "" },
    forecast: [{ date: "6月1日", weather: "晴", temperature: "43°/35°" }, { date: "6月2日", weather: "晴", temperature: "43°/35°" }, { date: "6月3日", weather: "晴", temperature: "43°/35°" }, { date: "6月4日", weather: "晴", temperature: "43°/35°" }, { date: "6月5日", weather: "晴", temperature: "43°/35°" }],
    isStartRecord: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.Info = JSON.parse(options.Info);
    console.log(this.data.Info);
    var left = this.data.forecast;
    var right = this.data.Info.forecast;
    console.log(left);
    console.log(right);
    for (var i = 1; i < 6; i++) {
      var date = new Date(right[i].date);
      var a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      left[i - 1].date = date.getMonth() + 1 + "月" + date.getDate() + "日 ";
      left[i - 1].weather = right[i].cond_txt_d;
      left[i - 1].temperature = right[i].tmp_max + "°/" + right[i].tmp_min + "°";
    }
    if (this.data.Info.luyinSrc) {
      this.setData({
        luyinSrc: this.data.Info.luyinSrc,
        location: this.data.Info.Location,
        temperature: this.data.Info.Temperature,
        weather: this.data.Info.Weather,
        index: this.data.Info.OtherInfo,
        forecast: left,
        weatherId: this.data.Info.WeatherId,
        cardId: this.data.Info.CardId,
        tips: this.data.Info.Tips,
        tipsId: Math.floor(Math.random() * 8 + 1) - 1,
      })
    }
    else
    {
      this.setData({
        location: this.data.Info.Location,
        temperature: this.data.Info.Temperature,
        weather: this.data.Info.Weather,
        index: this.data.Info.OtherInfo,
        forecast: left,
        weatherId: this.data.Info.WeatherId,
        cardId: this.data.Info.CardId,
        tips: this.data.Info.Tips,
        tipsId: Math.floor(Math.random() * 8 + 1) - 1,
      })
    }
    console.log(this.data)
    var that = this;
    // console.log('options.recordurl',options.recordurl)
    // if(typeof(options.recordurl) != undefined)
    // {
    //   this.data.src = options.recordurl;
    // }
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
      that.tip("录音完成！")
      console.log("停止录音", res.tempFilePath)

      var tmpfile = [res.tempFilePath];
      var file = new Bmob.File('123.mp3', tmpfile);
      console.log(file);
      file.save().then(res => {
        console.log(res.length);
        console.log(typeof (res));
        console.log("flie.saveURL", res["_url"]);
        var Record = Bmob.Object.extend("record");
        var record = new Record();
        record.set("recordurl", res["_url"]);
        that.setData({
          //uploadurl: res["_url"]
          luyinSrc: res["_url"]
        })
        console.log('luyinSrc', that.data.luyinSrc)
        record.save(null, {
          success: function (result) {
            console.log("shangchaun chenggong", result)
          },
          error: function (result) {

          }
        })
      })
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation0 = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "100% 0 0"
    });
    this.animation1 = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "100% 0 0"
    });
    this.animation2 = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "100% 0 0"
    });
    var n = 0;
    setInterval(function () {
      n = n + 1;
      this.translate();
    }.bind(this), 5000)
  },
  translate: function () {
    this.animation0.scale(0.9, 0.9).step({}).scale(1, 1).step();
    this.animation1.scale(0.8, 0.8).step({}).scale(1, 1).step();
    this.animation2.scale(0.7, 0.7).step({}).scale(1, 1).step();

    this.setData({
      animation0: this.animation0.export(),
      animation1: this.animation1.export(),
      animation2: this.animation2.export(),
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
    * 提示
    */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
  startRecordMp3: function () {
    this.recorderManager.start({
      format: 'mp3'
    });
  },

  /**
   * 停止录音
   */
  stopRecord: function () {
    this.recorderManager.stop();
  },

  /**
   * 播放录音
   */
  playRecord: function () {
    var that = this;
    var src = this.data.luyinSrc;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.luyinSrc;
    this.innerAudioContext.play()
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
  listenerMessageInput: function (e) {
    this.data.Message = e.detail.value;
  },

  yuyin: function () {
    console.log("语音输入");
    if (this.data.isStartRecord == false) {
      this.startRecordMp3();
      this.data.isStartRecord = true;
    }
    else {
      this.stopRecord();
      this.data.isStartRecord = false;
    }
  },
  share: function () {
    wx.navigateTo({
      url: '../toShare/toShare?Data=' + JSON.stringify(this.data),
    })
    console.log("share");
  }
})