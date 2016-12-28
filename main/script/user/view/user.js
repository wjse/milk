require(['jquery','api','util'],function($,api,util) {
    var url = window.location.href;

    if(url.indexOf('user') != -1){
        util.getScript('/user/view/user-list').then(function () {
            window.userList();
        });
    }else{
        util.getScript('/user/view/login').then(function () {
            window.loginView();
        });
    }
});
/**
 * Created by Administrator on 2016/5/20 0020.
 */
