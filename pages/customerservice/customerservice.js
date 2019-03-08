Page({
  data:{
     showRight: false,
     items2: [
      {
        title: '常见问题',
        arrow: true,
      },
      {
        title: '充值协议',
        arrow: 'up',
      },
      {
        title: '服务协议',
        arrow: 'down',
      },
      {
        title: '隐私政策',
        arrow: 'empty',
      },
      {
        title: '关于我们',
        arrow: 'empty',
      },
    ]
  },
    onItemClick(ev) {
    my.alert({
      content: `点击了第${ev.index}行`,
    });
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