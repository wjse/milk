function editView(id){

    var optType = !id ? 'save' : 'update',
        $ = requirejs('jquery'),
        userToken = requirejs('userToken'),
        system = requirejs('system'),
        util = requirejs('util'),
        api = requirejs('api'),
        systems = system.list(),
        initData = {
            admin_name : '',
            admin_nickname : '',
            admin_type : 'normal',
        };

    render();

    $('#resetPasswordBtn').off().on('click',function () {
        $('#reset_password').val('123456');
    });

    $('#saveBtn').off().on('click',function () {
        var data = {
            admin_name : $('#userName').val(),
            admin_nickname : $('#nickName').val(),
            admin_type : $('#admin_type').val(),
            systems : buildUserSystems()
        }
        var user = verifyData(data);
        if(id){
            user.admin_id = id;
            if(util.isNotEmpty($('#reset_password').val())){
                user.admin_password = hex_sha1($('#reset_password').val());
            }
            updateUser(user);
        }else {
            user.admin_password = hex_sha1($('#default_password').attr('data-password'));
            saveUser(user);
        }

    });

    function render(){
        resetAllErrorInfo();
        util.getScript('/system/view/system-view',false).then(function(){
            window.systemView(systems,null,null,true);
        });
        if(id){
            getUserInfo(id);
        }else {
            $('#userName').attr('disabled',false);
            $('#default_password').removeClass('hide');
            $('#resetPasswordBtn').addClass('hide');
        }
        console.log(initData);
        $('#userName').val(initData.admin_name);
        $('#nickName').val(initData.admin_nickname);
        $('#admin_type').val(initData.admin_type);
        $('#reset_password').val('');
    };

    function getUserInfo(id){
        var user = api.getUser(id);
            initData = user;
            $('#userName').attr('disabled',true);
            $('#default_password').addClass('hide');
            $('#resetPasswordBtn').removeClass('hide').val(initData.admin_password);
            setUserSystems(initData.systems);
    };

    function setUserSystems(systems){
        if(!systems){
            return;
        }
        for(var i = 0 ; i < systems.length ; i++){
            $('#systems input[type=checkbox][value='+ systems[i].id +']').prop('checked','checked');
        }
    };
    
    function verifyData(user) {
        if(util.isEmpty(user.admin_name)){
            showDataErrorInfo('userName','用户名不能为空！');
            return false;
        }
        if(util.isEmpty(user.admin_nickname)){
            showDataErrorInfo('nickName','用户昵称不能为空！');
            return false;
        }
        if(user.systems.length == 0){
            showDataErrorInfo('systems','用户业务模块不能为空！');
            return false;
        }

        return user;
    };
    
    function buildUserSystems() {
        var systemArr = $('input[type=checkbox][name=system]');
        var systems = [];
        if(systemArr && systemArr.length > 0){
            for(var i = 0 ; i < systemArr.length; i++){
                var system = $(systemArr).eq(i);
                if($(system).prop('checked') == true){
                    systems.push(parseInt($(system).val()));
                }
            }
        }
        return systems;
    };

    function updateUser(user) {
        console.log(user);
        api.update(user).then(function(resp){
            console.log(resp);
            if(resp.status == 200){
                debugger;
                window.location.reload();
            }else if(resp.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(resp.status == 503){
                showErrorInfo('修改失败,错误信息：' + resp.err);
            }else{
                showErrorInfo('修改失败！');
            }
        });
    };
    
    function saveUser(user) {
        api.save(user).then(function(resp){
            console.log(resp);
            if(resp.status == 200){
                window.location.reload();
            }else if(resp.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(resp.status == 503){
                showErrorInfo('添加失败,错误信息：' + resp.err);
            }else {
                showErrorInfo('添加失败!');
            }
        });
    };

    function showDataErrorInfo(id,msg){
        $('.'.concat(id,'-error')).removeClass('hide').html(msg);
    };

    function showErrorInfo(msg){
        $('#alertInfo').removeClass('hide').html(msg);
    };

    function resetAllErrorInfo(){
        $('.error-info').addClass('hide');
        $('#alertInfo').addClass('hide');
    };

};/**
 * Created by wujia on 16/4/9.
 */
