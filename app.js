App({
  globalData: {
    userInfo:{},
    plateNumbers:"",
    userId:'',
    carOwnerId:'',
    orgId:'3',
    receiptNumber:'',
    publicKey: '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCUqJXWr670OTCiijzHTr64bS8hdeJyT1B2fPiHC1jz2tqOxDLRLfcHKgWyGofvVUCC+dvIA8Ko2alO8OM7DXxbdX1phiJjSOzM5e17IPbQDis/uenRit8Aw1fd2QFrmrCPkJYlscBdfmui3XvqhxWWgYKfaYzk0/erbqvnWPf5wIDAQAB-----END PUBLIC KEY-----',
    //url:'http://localhost:13382/parkingInterface/',
    url:'https://njyf.jskingen.com/parkingInterface/' 
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    my.getAuthCode({
      scopes: 'auth_user',
      success: ({ authCode }) => {
        my.request({
            url: this.globalData.url+'djalipay/getAuthorization',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{authCode:authCode},
            success: (res) => {
              if(res.data.code === 500){
                my.alert({
                title: "错误信息",
                content: res.data.msg
                })
              }else{
                this.globalData.carOwnerId = res.data.carOwnerId,
              this.globalData.userId = res.data.userId   
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }   
              }         
            },
            fail: (err) => {
              my.alert({
                title: "错误信息",
                content: JSON.stringify(err)
              })
              }  
          });
      },
    });
  },
});