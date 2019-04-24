Page({
  data:{
     showRight: false,
     items2: [
      {
        title: '如何使用',
        arrow: true,
      },
      {
        title: '关于缴费记录',
        arrow: 'up',
      },
      {
        title: '关于费用',
        arrow: 'down',
      },
      {
        title: '寻车引导',
        arrow: 'empty',
      },
      {
        title: '关于支付',
        arrow: 'empty',
      },
      {
        title: '关于我们',
        arrow: 'empty',
      },
    ]
  },
    onItemClick(ev) {
      if(ev.index == 0) {
        my.navigateTo({ url: '../about/about' });
      }else if(ev.index ==1) {
        my.navigateTo({ url: '../nokeypay/nokeypay' });
      }else if(ev.index ==2) {
          my.navigateTo({ url: '../nokeypay/nokeypay' });
      }else if(ev.index ==3) {
          my.navigateTo({ url: '../nokeypay/nokeypay' });
      }else if(ev.index ==4) {
          my.navigateTo({ url: '../nokeypay/nokeypay' });
      }else if(ev.index ==5) {
          my.navigateTo({ url: '../about/about' });
      }
  },
    onScrollToLower() {
    const { items5 } = this.data;
    const newItems = items5.concat(newitems);
    console.log(newItems.length);
    this.setData({
      items5: newItems,
    });
  },
});