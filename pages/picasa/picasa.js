// pages/other/other.js
var that;
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
Page({
  data: {
    urlArr: [],
    loading: true
  },
  onLoad: function () {

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  delImg: function () {//图片删除
    var path;
    //删除第一张
    path = this.data.urlArr[0].url;
    var s = new Bmob.Files.del(path).then(function (res) {
      if (res.msg == "ok") {
        console.log('删除成功');
        common.showModal("删除成功");
      }
      console.log(res);
    }, function (error) {
      console.log(error)
    }
    );


  },
  upImg: function () {
    var that = this;


  // 注释这块是上传视频代码
    // wx.chooseImage({
    //   count: 9, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     wx.showNavigationBarLoading()
    //     that.setData({
    //       loading: false,
    //       src: res.tempFilePath
    //     })
    //     var urlArr = new Array();
    //     // var urlArr={};
    //     console.log("res= " + res)
    //     var tempFilePath = res.tempFilePaths;
    //     console.log("tempFilePath= " + tempFilePath)

    //     var newDate = new Date();
    //     var newDateStr = newDate.toLocaleDateString();


    //     var extension = /\.([^.]*)$/.exec(tempFilePath);
    //     if (extension) {
    //       extension = extension[1].toLowerCase();
    //     }
    //     var name = "test." + extension;//上传的图片的别名      
    //     console.log(tempFilePath)
    //     var file = new Bmob.File(name, tempFilePath);
    //     console.log("name= " + name)
    //     file.save().then(function (res) {

    //       wx.hideNavigationBarLoading()
    //       var url = res.url();
    //       console.log("第1张Url" + url);

    //       urlArr.push({ "url": url });

    //       // if (imgLength == j) {
    //       //   console.log(imgLength, urlArr);
    //       //如果担心网络延时问题，可以去掉这几行注释，就是全部上传完成后显示。
    //       showPic(urlArr, that)
    //       // }

    //     }, function (error) {
    //       console.log(error)
    //     });

    //   console.log(file);


    //     //如果你突然发现这个文件传了又想立即删了，可以直接执行
    //     // file.destroy();


    //   }
    // })

    // return;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading: false
        })
        var urlArr = new Array();
        // var urlArr={};
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        var imgLength = tempFilePaths.length;
        if (imgLength > 0) {
          var newDate = new Date();
          var newDateStr = newDate.toLocaleDateString();

          var j = 0;
          for (var i = 0; i < imgLength; i++) {
            var tempFilePath = [tempFilePaths[i]];
            var extension = /\.([^.]*)$/.exec(tempFilePath[0]);
            if (extension) {
              extension = extension[1].toLowerCase();
            }
            var name = newDateStr + "." + extension;//上传的图片的别名      

            var file = new Bmob.File(name, tempFilePath);
            file.save().then(function (res) {
              console.log(res)
              // return
              wx.hideNavigationBarLoading()
              var url = res.url();
              console.log("第" + i + "张Url" + url);

              urlArr.push({ "url": url });
              j++;
              console.log(j, imgLength);
              // if (imgLength == j) {
              //   console.log(imgLength, urlArr);
              //如果担心网络延时问题，可以去掉这几行注释，就是全部上传完成后显示。
                showPic(urlArr, that)
              // }

            }, function (error) {
              console.log(error)
            });

          }







          //如果你突然发现这个文件传了又想立即删了，可以直接执行
          // file.destroy();
        }

      }
    })
  }
})

//上传完成后显示图片
function showPic(urlArr, t) {
  t.setData({
    loading: true,
    urlArr: urlArr
  })
}