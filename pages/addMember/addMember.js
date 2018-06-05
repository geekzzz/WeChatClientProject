// pages/addMember/addMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  MainSrc:"https://wximg-1256782551-1256782551.cos.ap-guangzhou.myqcloud.com/qietu",
  nickname:"",
  location:"",
  time:"12:01",
  region:["浙江省","杭州市","西湖区"],
  array: ["爸爸","妈妈", "儿子", "女儿"],
  index:0
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
  bindTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
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
  cancel:function(){
    wx.navigateBack({
      delta:1
    })
  },
  submit:function(){
    console.log("添加家人成员");
    wx.navigateBack({
      delta:1
    });
    wx.navigateTo({
      url: '../collect/collect',
      success:(result)=>{
console.log("111");
      },
      fail: (result) => {
        console.log(result);
      },
    })
  }
})