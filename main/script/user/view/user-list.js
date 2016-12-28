function userList() {
    var $ = requirejs('jquery'),api = requirejs('api'),
        util = requirejs('util'),config = requirejs('config'),
        userToken = requirejs('userToken');

        var storage = util.storage('session');
        var user = storage.get('user');

        if(window.location.href.lastIndexOf('/main') != -1){
            return;
        }

        if('super' != user.admin_type){
            alert('对不起，您没有操作权限！');
            return;
        }

        var moduleName = '系统用户管理';
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
            window.asideView('user');
        });

        // mainBox height
        $("#mainBox").css('minHeight',$(window).height()-100);
        //init page
        initPage(1);


        //tab event
        $('.tab').click(function(){
            $('.tab').removeClass('active');
            var forward = $(this).addClass('active').attr('forward');
            $('.tab-body').addClass('hide');
            $('#'.concat(forward)).removeClass('hide');
            if('formBox' == forward){
                util.getScript('/user/view/edit-view').then(function(){
                    window.editView();
                });
            }
        });

    function initPage(pageNum) {
        var pageResult = api.page(pageNum);
        var list = pageResult.list;
        var pager = pageResult.page;

        if(pageResult){
            // list
            buildUserList(list);
            // pager
            util.getScript('/common/pager').then(function () {
                window.pager(pager.totalPage,pager.currentPage,function (pageNum) {
                    initPage(pageNum);
                });
            });
        }
    };

    function buildUserList(list) {
        var userList = {
            title : ['用户名','用户昵称','用户类型','操作'],
            list : list
        };

        util.getScript('/user/view/list-view').then(function () {
            window.userListView(userList);
        });
    };


};/**
 * Created by wujia on 16/4/9.
 */
