function loginView() {
    var $ = requirejs('jquery'),api = requirejs('api'),util = requirejs('util');


    const enter_keycode = 13;
    var username = $('#username'),
        password = $('#password');

    $('#subBtn').on('click',function(){
        login(username,password);
    });

    $('input').bind('change',function(){
        hideErrorInfo('.'+ $(this).attr('for'));
        if(!$("#loginErr").parent().hasClass('hide')){
            hideErrorInfo($('#loginErr').parent())
        }
    });

    $(this).on('keydown',function(e){
        if(e.keyCode == enter_keycode){
            login(username,password);
        }
    });

    /**
     * login function
     * @param username username input obj
     * @param password password input obj
     */
    function login(username,password){

        if(util.isEmpty(username.val())){
            showErrorInfo(username,'请输入用户名!');
            return;
        }

        if(util.isEmpty(password.val())){
            showErrorInfo(password,'请输入密码!');
            return;
        }

        try{
            var resp = api.login(username.val(),password.val());
            if(resp.status == 200){
                api.go(resp.data);
            }else{
                showLoginError('登录失败，失败原因：' + resp.msg + '！');
            }
        }catch(e){
            showLoginError('登录失败,系统错误！');
        };
    };

    function hideErrorInfo(id){
        $(id).addClass('hide');
    };

    function showErrorInfo(obj,msg){
        $('.'.concat(obj.attr('for'))).html(msg).removeClass('hide');
    };

    function showLoginError(msg){
        $('#loginErr').parent().removeClass('hide');
        $('#loginErr').html(msg);
    };
};


