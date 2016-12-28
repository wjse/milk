define(['jquery','util','userToken','api','date'],function ($,util,userToken,api) {
    var api = requirejs('api'),plugins = requirejs('plugins'),util = requirejs('util');
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

    //render search
    util.getScript('/common/search-view').then(function () {
        window.searchView('store','创建店铺优惠券',function (searchStr) {
            renderList(1,searchStr);
        });
    });

    //render content
    renderList(1);

    function renderList(pageNum,searchStr) {
        var search = '?p=' + pageNum;
        if(searchStr){
            search += searchStr;
        }
        $('#listContent').html('');
        $('#pageNav').html('');
        var pageResult = api.getStorePage(search);

        if(!pageResult){
            $('#listContent').html('<li><div class="alert alert-warning">请求失败!</div></li>');
            return;
        }
        util.getScript('/store-coupons/view/coupons-list-view').then(function () {
            window.couponsListView(pageResult.list);
        });
        //renderPager
        util.getScript('/common/pager').then(function () {
            window.pager(pageResult.page.totalPage,pageResult.page.currentPage,function (pageNum) {
                var pageSearch = getSearch();
                renderList(pageNum,pageSearch);
            });
        });

    };

    function getSearch() {
        var title = $('#title').val(),
            days = $('#days').val(),
            pageSearch = '';
        if(util.isEmpty(title) && util.isEmpty(days)){
            return;
        }
        if(util.isNotEmpty(title)){
            pageSearch += '&title=' + title;
        }
        if(util.isNotEmpty(days)){
            pageSearch += '&days=' + days;
        }
        return pageSearch;
    };


});
/**
 * Created by Administrator on 2016/5/31 0031.
 */
