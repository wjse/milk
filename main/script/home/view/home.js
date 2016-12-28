define(['jquery','system','util','userToken','colorHandler','config'], function ($,system,util,userToken,colorHandler,config) {

    $(function(){

        var storage = util.storage('session');
        var user = storage.get('user');

        if(!user){
            alert('对不起，您的用户已经失效，请重新登录');
            userToken.goLogin('index.html');
        }

        //nav
        util.getScript('/home/view/nav-view',false).then(function(){
            window.navView(user.admin_type,user.admin_nickname);
        });

        //system list
        var systems = system.userSystems();
        if(!systems){
            return;
        }
        var index = systems.length/system.systemColNum;

        if(systems.length % system.systemColNum != 0){
            index += 1;
        }
        util.getScript('/system/view/system-view',false).then(function(){
            for(var i = 1 ; i <= index ; i++){
                var rowSystems = system.getRowSystems(i,systems);
                colorHandler.resetColor();
                window.systemView(rowSystems,colorHandler,false);
            }
        });

        $('#logout').click(function(){
            userToken.goLogin();
        });
    });
});