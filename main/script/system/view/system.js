define(['jquery','api','util','config','colorHandler','upload','userToken'],
    function ($,api,util,config,colorHandler,userToken) {
    $(function(){
        var storage = util.storage('session');
        var user = storage.get('user');

        if(!user){
            return;
        }
        if('super' != user.admin_type){
            alert('对不起，您没有操作权限！');
            return;
        }

        var systems = api.list(),
            index = systems.length/api.systemColNum;

        if(systems.length % api.systemColNum != 0){
            index += 1;
        }

        //nav
        util.getScript('/home/view/nav-view',false).then(function(){
            window.navView(user.admin_type,user.admin_nickname);
        });

        //返回首页和添加
        util.getScript('/system/view/back-add-view',false).then(function(){
            window.backAndAddView();
        });

        //system list
        util.getScript('/system/view/system-view',false).then(function(){
            if(!systems || systems.length == 0){
                window.systemView(systems,colorHandler,true);
            }else{
                for(var i = 1 ; i <= index ; i++){
                    var rowSystems = api.getRowSystems(i,systems);
                    colorHandler.resetColor();
                    window.systemView(rowSystems,colorHandler,true);
                }
            }
        });

        //modal
        $('.modal-icon').off().on('click',function(){
            var id = $(this).attr('data-for');
            util.getScript('/system/view/modal-view',false).then(function(){
                window.modalHtml(id);
            });
        });

        //delete
        $('.remove-icon').off().on('click',function(){
            if(!confirm('确定删除该系统模块？')){
                return;
            }
            var id = $(this).attr('data-for');

            try{
                api.del(id).then(function(resp){
                    if(resp.status == 200){
                        window.location.reload();
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }
                });
            }catch(e){
                alert('系统错误');
            }
        });
    });
});