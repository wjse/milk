define(['jquery','util','api','userToken'],function ($,util,api,userToken) {
    //set token
    // userToken.setToken();

    var moduleName = '规格模板管理';

    //render aside
    util.getScript('/common/aside-view').then(function () {
        window.asideView('spec');
    });

    //render header
    util.getScript('/common/header-view').then(function () {
        window.headerView(moduleName);
    });

    //main box height set
    $("#mainBox").css('minHeight',$(window).height()-100);

    //main content spec title list
    util.getScript('/spec/view/spec-title-view').then(function () {
        window.specTitleView();
    });

});
/**
 * Created by Administrator on 2016/6/2 0002.
 */
