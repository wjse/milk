define(['jquery','util','userToken','upload'],function ($,util,userToken) {
    //getToken
    userToken.setToken();
    var moduleName = '店铺优惠券管理'

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
        window.asideView('store');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    //adjust add or modify
    var id = util.getUrlParam('id');
    util.getScript('/store-coupons/view/store-get-view').then(function () {
        window.storeGetView(id);
    });
});
/**
 * Created by Administrator on 2016/6/6 0006.
 */
