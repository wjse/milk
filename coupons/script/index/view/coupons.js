define(['jquery','util','userToken'],function ($,util,userToken) {
    //getToken
    userToken.setToken();
    var moduleName = '优惠券管理'

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
        window.asideView('index');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    //render card
    util.getScript('/index/view/card-view').then(function () {
        window.cardView();
    });

});
/**
 * Created by Administrator on 2016/5/31 0031.
 */
