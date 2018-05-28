//app.js

var QQMapWX=require('./utils/qqmap-wx-jssdk.js')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)

        var qqmapsdk = new QQMapWX({
          key: 'PO3BZ-IMCCO-S5PWK-SSNVS-PZDFQ-WYBLQ'
        });
       /* 
        wx.getLocation({
          success: function (res) {
            console.log(res.longitude, res.latitude);

          

            qqmapsdk.reverseGeocoder({
              location: {
                latitude:res.latitude,
                longitude:res.longitude
              },
              success: function (addressRes) {
                console.log(addressRes);
                console.log(addressRes.result.formatted_addresses.recommend);
                console.log('successfully');
              },
              fail:function(addRes){
                console.log('failure');
                console.log(addRes);
              }
        })

            qqmapsdk.search({
              keyword: '酒店',
              success: function (res) {
                console.log(res);
                console.log('success');
              },
              fail: function (res) {
                console.log(res);
              },
              complete: function (res) {
                console.log(res);
              }
            });


          }
        })*/
    }
})