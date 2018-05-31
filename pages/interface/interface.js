var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
var grids = [
   {"name":"发送短信","ico":"sms.png","url":"../sendSms/sendSms"},
   {"name":"图片上传","ico":"pic.png","url":"../picasa/picasa"},
   {"name":"微信自动登录","ico":"autologin.png","url":"../sendSms/sendSms","click":"autuLogin"},
   {"name":"获取openid","ico":"openid.png","url":"../getOpenId/getOpenId"},
   {"name":"微信支付","ico":"pay.png","url":"../pay/pay"},
   {"name":"生成二维码","ico":"code.png","url":"code/code"},
   {"name":"登录","ico":"login.png","url":"../login/login"},
   {"name":"注册","ico":"reg.png","url":"../register/register"},
   
   {"name":"退出","ico":"logout.png","url":"../logout/logout"},
   { "name": "群聊", "ico": "liao.png", "url": "../interface/chatroom/chatroom" },
   { "name": "客服处理", "ico": "login.png", "url": "../message/list/index" },
   { "name": "微信手机号", "ico": "phone.png", "url": "getPhone/getPhone" },
  
];
Page({    
    data: {        
        userInfo: {},
        grids: grids
    
    },
    onLoad:function(){
        var that = this 
  
    },
    getUserInfo:function(e){
      var userinfo = e.detail.userInfo;
      // 这里会把头像信息写入到数据库
      var user = new Bmob.User() //实例化对象
      user.getUserInfo(userinfo)
    },
    autuLogin:function(){
        common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
    }

})