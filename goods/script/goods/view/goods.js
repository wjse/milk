define(['jquery','util','userToken','api','tree','upload'],function ($,util,userToken,api) {
    //getToken
    userToken.setToken();
    
    var moduleName = '商品管理';

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

    /**
     * mainbox minheight
     */
    $("#mainBox").css('minHeight',$(window).height()-100);

    /**
     * get url 
     */
    var url = window.location.href;
    if(url.indexOf('goods-add') != -1){
        util.getScript('/goods/view/goods-add').then(function () {
            window.goodsAdd();
        });
    }else if(url.indexOf('goods-view') != -1){
        util.getScript('/goods/view/goods-get').then(function () {
            window.goodsGet();
        });
    }else if(url.indexOf('goods-list') != -1){
        $('#listContent').css('minHeight',$(window).height()-300);
        util.getScript('/goods/view/goods-list').then(function () {
            window.goodsList();
        });
    }else {
        $('#listContent').css('minHeight',$(window).height()-300);
        util.getScript('/goods/view/goods-list').then(function () {
            window.goodsList();
        });
    }

})
    /**
     * Created by Administrator on 2016/5/5 0005.
     */

