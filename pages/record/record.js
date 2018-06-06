// pages/record/record.js
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

  // /**
  //  * 录制aac音频
  //  */
  // ,startRecordAac: function(){
  //   this.recorderManager.start({
  //     format: 'aac'
  //   });
  // }

  /**
   * 录制mp3音频
  */
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
    this.recorderManager.onStop(
      (res) => {
        var Record = Bmob.Object.extend("record");
        var record = new Record();
        console.log("停止录音", res.tempFilePath)

        var tmpfile = [res.tempFilePath];
        var file = new Bmob.File('123.mp3', tmpfile);
        // console.log(file);
        // record.set("recordurl", file);
        // record.save(null, {
        //   success: function (result) {
        //     console.log("shangchaun chenggong", result)
        //   },
        //   error: function (result) {

        //   }
        // })
        file.save().then(res => {
          console.log(res.length);
          console.log(typeof(res));
          console.log(res["_url"]);
        })
      }
    )
  },

  /**
   * 播放录音
   */
  playRecord: function () {
    var that = this;
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
  },
  /**
   * 上传录音
   */
  upload: function () {
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var Record = Bmob.Object.extend("record");
        var record = new Record();
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: 'https://oggfaqa8.qcloud.la/weapp/upload',
          filePath: tempFilePaths[0],
          name: 'zzzzz123',
          success: function (res) {
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
          },
          fail: function (e) {
            //util.showModel('上传图片失败')
            console.log(e)
          }
        })
      }
    })
  }

})