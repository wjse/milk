define(['jquery','util','api','userToken'],function($,util,api,userToken){
    $(function(){
        //getToken
        userToken.setToken();
        
        //head
        util.getScript('/common/header-view',false).then(function () {
            window.headerView('品类管理');
        });

        //aside
        util.getScript('/common/aside-view').then(function(){
            new asideView('category');
        });

        /**
         * mainbox minheight
         */
        $("#mainBox").css('minHeight',$(window).height()-100);
        /**
         * listBox minheight
         */
        $("#listBox").height($(window).height()-184);

        util.getScript('/category/view/list-view',false).then(function () {
            new listView(api.list());
        });
    });
});
