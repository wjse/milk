define(['jquery','util','api','userToken'],function ($,util,api,userToken) {
    //get token
    userToken.setToken();

    var moduleName = '订单管理';

    /**
     * get header view
     */
    util.getScript('/common/header-view').then(function () {
        window.headerView(moduleName);
    });
    /**
     * get aside view
     */
    util.getScript('/common/aside-view').then(function () {
        window.asideView('order');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    //load content
    var url = window.location.href;
    if(url.indexOf('order-view') != -1){
        util.getScript('/order/view/order-get').then(function () {
            window.orderGet();
        });
    }else {
        util.getScript('/order/view/order-list').then(function () {
            window.orderList();
        });
    }

});
/**
 * Created by Administrator on 2016/5/26 0026.
 */
