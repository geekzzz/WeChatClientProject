// pages/share/share.js
//share.js
Page({
  data: {
    imagePath: "/image/shareimg_bg.jpg",
    imageTx: "http://img0.imgtn.bdimg.com/it/u=1079555585,1801783759&fm=27&gp=0.jpg",
    imageEwm: "/image/ewm.jpg",
    maskHidden: true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    // this.createNewImg();
    //创建初始化图片
  },
  //适配不同屏幕大小的canvas    生成的分享图宽高分别是 750  和940，老实讲不知道这块到底需不需要，然而。。还是放了，因为不写这块的话，模拟器上的图片大小是不对的。。。
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750;//画布宽度
      var scaleH = 940 / 750;//生成图片的宽高比例
      var width = res.windowWidth;//画布宽度
      var height = res.windowWidth * scaleH;//画布的高度
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //将1绘制到canvas的固定
  settextFir: function (context) {
    let that=this;
    var size = that.setCanvasSize();
    var textFir = "发了一个红包";
    console.log(textFir);
    context.setFontSize(24);
    context.setTextAlign("center");
    context.setFillStyle("#fee6b5");
    context.fillText(textFir, size.w / 2, size.h * 0.25);
    context.stroke();
  },
  //将2绘制到canvas的固定
  settextSec: function (context) {
    let that = this;
    var size = that.setCanvasSize();
    var textSec = "长按识别小程序，领奖金";
    context.setFontSize(14);
    context.setTextAlign("center");
    context.setFillStyle("#fee6b5");
    context.fillText(textSec, size.w / 2, size.h * 0.88);
    context.stroke();
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    var path = "/images/shareimg_bg.jpg";
    var imageTx = that.data.imageTx;
    var imageEwm = that.data.imageEwm;
    var imageZw = "/images/xcxewm.png";
    context.drawImage(path, 0, 0, size.w, size.h);
    context.drawImage(imageTx, size.w / 2 - 25, size.h * 0.02, size.w * 0.14, size.w * 0.14);
    context.drawImage(imageEwm, size.w / 2 - 60, size.h * 0.32, size.w * 0.33, size.w * 0.33);
    context.drawImage(imageZw, size.w / 2 - 25, size.h * 0.7, size.w * 0.14, size.w * 0.14);
    this.settextFir(context);
    this.settextSec(context);
    console.log(size.w, size.h)
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: false,
            maskHidden: true,
          });
　　　　　　　　//将生成的图片放入到《image》标签里
          var img = that.data.imagePath;
          wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
          })
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 2000);
  },

})