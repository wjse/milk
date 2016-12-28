define(['jquery','util','userToken','api'],function ($,util,userToken) {
    //getToken
    userToken.setToken();

    var moduleName = '会员管理';

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
        window.asideView('member');
    });

    $('#mainBox').css('minHeight',$(window).height()-100);

    /**
     * get content view
     */
    var url = window.location.href;
    if(url.indexOf('member-view') != -1){
        util.getScript('/member/view/member-get').then(function () {
            window.memberGet();
        });
    }else {
        util.getScript('/member/view/member-list').then(function () {
            window.memberList();
        });
    }

});
/**
 * Created by Administrator on 2016/5/19 0019.
 */
