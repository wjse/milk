function navView(userType,nickName){
    var $ = requirejs('jquery'),util = requirejs('util'),userToken = requirejs('userToken');
    var html = '<div class="top-nav f-oh" id="nav">';
        html += '<img class="nav-logo f-fl" src="www/image/home_logo.png">';
        html += '<ul class="nav-right f-fr f-oh">';
        html += '<li><span class="point f-ib"></span><span id="currentUser">'+ nickName +'</span>';
        if(userType == 'super'){
            html += '<li><a class="to-management" href="system.html">系统管理</a></li>';
            html += '<li><a class="to-management" href="user.html">系统用户管理</a></li>';
        }
        html += '<li><img class="login-out-icon" src="www/image/loginout.png"></li>';
        html += '</ul></div>';
    $('nav').html(html);

    $('.login-out-icon').off().on('click',function () {
        if(confirm('确认退出系统？')){
            userToken.goLogin();
        }
    });

};/**
 * Created by wujia on 16/4/6.
 */
