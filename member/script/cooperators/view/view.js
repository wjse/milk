define(['jquery','util','api','userToken'],function ($,util,api,userToken) {
    var api = requirejs('api');
    //set token
    userToken.setToken();

    var moduleName = '加盟申请信息';

    //render header
    util.getScript('/common/header-view').then(function () {
        window.headerView(moduleName);
    });
    //render aside
    util.getScript('/common/aside-view').then(function () {
        window.asideView('cooperator');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    //render main content
    renderPage(1);

    function renderPage(pageNum) {
        var pageResult = api.getBusiness(pageNum);
        if(!pageResult){
            $('#cooperatorList').html('<li><div class="alert alert-warning">请求失败!</div></li>');
            return;
        }
        util.getScript('/cooperators/view/list-view').then(function () {
            window.listView(pageResult.list);
        });

        //renderPager
        util.getScript('/common/pager').then(function () {
            window.memberPager(pageResult.page.totalPage,pageResult.page.currentPage,function (pageNum) {
                renderPage(pageNum);
            });
        });
    };

});
/**
 * Created by Administrator on 2016/6/3 0003.
 */
