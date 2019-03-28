var app = getApp();
Page({

  /**
   * 页面的初始数据
   * keyboard1:首页键盘,显示省的简称
   * keyboard2:第二页键盘，显示数字和大写字母
   */
  data: {
    carownerId:'',
    banner: '../../img/logginNumber.png',
    isKeyboard: false,//是否显示键盘
    specialBtn: false,
    tapNum: false,//数字键盘是否可以点击
    keyboardNumber: ['1','2','3','4','5','6','7','8','9','0'],
    keyboardAlph: ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','del','Z','X','C','V','B','N','M'],
    keyboard1: ['粤','京','津','沪','冀','豫','云','辽','黑','湘','皖','鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕','吉','闽','贵','川','青','藏','琼','宁','渝'],
    keyboard2: '',
    keyboard2For: ['完成'],
    keyboardValue: '',
    textId:9,
    oneColor:'#000',
    twoColor:'#000',
    threeColor:'#000',
    fourColor:'#000',
    fiveColor:'#000',
    sixColor:'#000',
    sevenColor:'#000',
    eightColor:'#000',
    oneValue:'苏',
    twoValue:'',
    threeValue:'',
    fourValue:'',
    fiveValue:'',
    sixValue:'',
    sevenValue:'',
    eightValue:'',
  },

  onLoad: function (options) {
    //生命周期函数--    
    app.userInfoReadyCallback = res => {
      if (res != '') {
        my.httpRequest({
                url: app.globalData.url+'login/getCarNumber',
                method: 'GET',
                header:{
                  'content-type': 'application/json'
                },
                dataType: 'json',
                data:{carOwnerId:app.globalData.carOwnerId},//获取输入的内容
                success: (res) => {
                  if(res.data.carNumber != 0){
                    my.navigateTo({
                      url: '../platenumbers/platenumbers' 
                    });
                  }
                },                  
                fail: (err) => {
                  my.alert({
                  title: "错误信息",
                  content: JSON.stringify(err)
                  })
                },               
              });
      }
    }
  },
  onShow:function(){
    
  },
  /**
     * 输入框聚焦触发，显示键盘
     */
  showKeyboard(e) {
    var that = this;
      if(e.currentTarget.id == 1){
        this.setData({
            oneColor:"#169bd5",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#000',
            textId:1,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 2){
        this.setData({
            oneColor:"#000",
            twoColor:'#169bd5',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#000',
            textId:2,
            isKeyboard:true,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: false
        });
      }else if(e.currentTarget.id == 3){
        this.setData({            
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#169bd5',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#000',
            textId:3,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 4){
        this.setData({
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#169bd5',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#000',
            textId:4,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 5){
        this.setData({           
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#169bd5',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#000',
            textId:5,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 6){
        this.setData({            
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#169bd5',
            sevenColor:'#000',
            eightColor:'#000',
            textId:6,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 7){
        this.setData({          
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#169bd5',
            eightColor:'#000',
            textId:7,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }else if(e.currentTarget.id == 8){
        this.setData({           
            oneColor:"#000",
            twoColor:'#000',
            threeColor:'#000',
            fourColor:'#000',
            fiveColor:'#000',
            sixColor:'#000',
            sevenColor:'#000',
            eightColor:'#169bd5',
            textId:8,
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: true,
            isKeyboard:true
        });
      }
    },
  tapSpecBtn: function (e) {
    //点击页面隐藏键盘事件
        this.setData({
          isKeyboard: false
        })
    },
  tapKeyboard(e) {
    //键盘事件
    var that = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var textId = that.data.textId;  
    if(textId ==8 && that.data.eightValue != '' && tapVal !='del'){
      return false;
    }  
    if (tapVal === 'del') {
      //说明是删除
      if(textId == 8) {
        if(that.data.eightValue !=''){
          this.setData({
            eightValue: '',
          })
        }else if(that.data.eightValue == ''){
          this.setData({
            sevenValue: '',
            textId:7,
            eightColor:'#000',
            sevenColor:'#169bd5'
          })
        }        
      }else if(textId == 7) {
        if(that.data.sevenValue !=''){
          this.setData({
            sevenValue: '',
          })
        }else if(that.data.sevenValue == ''){
          this.setData({
            sixValue: '',
            textId:6,
            sevenColor:'#000',
            sixColor:'#169bd5'
          })
        }        
      }else if(textId == 6) {
        if(that.data.sixValue !=''){
          this.setData({
            sixValue: '',
          })
        }else if(that.data.sixValue == ''){
          this.setData({
            fiveValue: '',
            textId:5,
            sixColor:'#000',
            fiveColor:'#169bd5'
          })
        }        
      }else if(textId == 5) {
        if(that.data.fiveValue !=''){
          this.setData({
            fiveValue: '',
          })
        }else if(that.data.fiveValue == ''){
          this.setData({
            fourValue: '',
            textId:4,
            fiveColor:'#000',
            fourColor:'#169bd5'
          })
        }        
      }else if(textId == 4) {
        if(that.data.fourValue !=''){
          this.setData({
            fourValue: '',
          })
        }else if(that.data.fourValue == ''){
          this.setData({
            threeValue: '',
            textId:3,
            fourColor:'#000',
            threeColor:'#169bd5'
          })
        }        
      }else if(textId == 3) {
        if(that.data.threeValue !=''){
          this.setData({
            threeValue: '',
          })
        }else if(that.data.threeValue == ''){
          this.setData({
            twoValue: '',
            textId:2,
            threeColor:'#000',
            twoColor:'#169bd5',
            keyboardValue: that.data.keyboard2,
            specialBtn: true,
            tapNum: false
          })
        }        
      }else if(textId == 2) {
        if(that.data.twoValue !=''){
          this.setData({
            twoValue: '',
          })
        }else if(that.data.twoValue == ''){
          this.setData({
            oneValue: '',
            textId:1,
            twoColor:'#000',
            oneColor:'#169bd5',
            keyboardValue: that.data.keyboard1,
            specialBtn: false,
            tapNum: false
          })
        }        
      }else  if(textId == 1) {
          this.setData({
            oneValue: '',
            keyboardValue: that.data.keyboard1,
            specialBtn: false,
            tapNum: false
          })    
      }
      return false;
  }
    if(textId == 1) {
        this.setData({
          oneValue: tapVal,
          keyboardValue: that.data.keyboard2,
          specialBtn: true,
          tapNum: false,
          textId:2,
          oneColor:"#000",
          twoColor:'#169bd5'
        })
      }else if(textId == 2){
        this.setData({
          twoValue: tapVal,
          keyboardValue: that.data.keyboard2,
          specialBtn: true,
          tapNum: true,
          textId:3,
          twoColor:"#000",
          threeColor:'#169bd5',
        })
      }else if(textId == 3){
        this.setData({
          threeValue: tapVal,
          textId:4,
          threeColor:"#000",
          fourColor:'#169bd5',
        })
      }else if(textId == 4){
        this.setData({
          fourValue: tapVal,
          textId:5,
          fourColor:"#000",
          fiveColor:'#169bd5',
        })
      }else if(textId == 5){
        this.setData({
          fiveValue: tapVal,
          textId:6,
          fiveColor:"#000",
          sixColor:'#169bd5',
        })
      }else if(textId == 6){
        this.setData({
          sixValue: tapVal,
          textId:7,
          sixColor:"#000",
          sevenColor:'#169bd5',
        })
      }else if(textId == 7){
        this.setData({
          sevenValue: tapVal,
          textId:8,
          sevenColor:"#000",
          eightColor:'#169bd5',
        })
      }else if(textId == 8){
        this.setData({
          eightValue: tapVal,
        })
      }
  },
  onReady: function () {
  },
  jumpPlatenumbers:function(){
     // 特殊键盘事件（删除和完成）
    var that = this;
    var plateNumber = that.data.oneValue+that.data.twoValue+that.data.threeValue+that.data.fourValue+that.data.fiveValue+that.data.sixValue+that.data.sevenValue+that.data.eightValue;
      //说明是完成事件
      var carreg = /^(([\u4e00-\u9fa5][a-zA-Z]|[\u4e00-\u9fa5]{2}\d{2}|[\u4e00-\u9fa5]{2}[a-zA-Z])[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/;
      if (!carreg.test(plateNumber)) {
        my.alert({
          title: '车牌号不正确' ,
        });
      } else {
        my.httpRequest({
          url: app.globalData.url+'djalipay/addPlateNumbers',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{orgId:app.globalData.orgId,
                  plateNumber:plateNumber,
                  carownerId:app.globalData.carOwnerId},//获取输入的内容
          success: (res) => {
            console.log("添加："+JSON.stringify(res))
            my.navigateTo({
                url: '../platenumbers/platenumbers' 
              });
          },
          fail: (err) => {
            my.alert({
            title: "错误信息",
            content: JSON.stringify(err)
        })
      } 
    });
  }
  },

})
