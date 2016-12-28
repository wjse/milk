define(['jquery','util','userToken'],function ($,util,userToken) {
    //getToken
    userToken.setToken();
    var moduleName = '商品优惠券管理'

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
        window.asideView('goods');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    //render search
    util.getScript('/common/search-view').then(function () {
        window.searchView('store','创建商品优惠券');
    });
});
/**
 * Created by Administrator on 2016/5/31 0031.
 */
