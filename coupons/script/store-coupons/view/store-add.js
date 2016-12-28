define(['jquery','util','userToken','upload','date'],function ($,util,userToken) {
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

    util.getScript('/store-coupons/view/store-add-view').then(function () {
        window.storeAddView();
    });
});
/**
 * Created by Administrator on 2016/6/4 0004.
 */
