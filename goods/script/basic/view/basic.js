define(['jquery','util','tree','categoryApi','brandApi','userToken','note'],function ($,util,tree,categoryApi,brandApi,userToken) {

    //getToken
    userToken.setToken();
    var moduleName = '型号管理';
    /**
     * head
     * @see common/header-view.js
     */
    util.getScript('/common/header-view').then(function () {
        window.headerView(moduleName);
    });

    /**
     * aside
     * @see common/aside-view.js
     */
    util.getScript('/common/aside-view',false).then(function(){
        window.asideView('basic');
    });

    /**
     * mainbox minheight
     */
    $("#mainBox").css('minHeight',$(window).height()-100);

    /**
     * load list
     * @see list-view.js
     */
    util.getScript('/basic/view/basic-view').then(function(){
        window.basicView();
    });

});
/**
 * Created by Administrator on 2016/5/7 0007.
 */
