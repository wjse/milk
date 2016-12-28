define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    const col = 4;
    var storage = util.storage('session');
    return {

        userSystems : function(){
            var systems;
            $.ajax({
                type : 'get',
                url : config.v4.concat('/system/login?token=',storage.get('token')),
                dataType : 'json',
                async:false,
                success : function (resp) {
                    if(resp){
                        if(resp.status == 200 && resp.data){
                            systems =  resp.data.systems;
                        }else if(resp.status == 401){
                            alert('用户登录失效，请重新登录！');
                            userToken.goLogin();
                        }else {
                            alert('请求错误，错误状态：' + resp.status + '，错误原因：' + resp.msg);
                        }
                    }else {
                        alert('请求错误，返回数据为空！');
                    }
                }
            });
            return systems;
        },

        list : function(){
            var systems = [];
            $.ajax({
                url : config.v4.concat('/system?token=',storage.get('token')),
                type : 'get',
                async : false,
                dataType : 'json',
                success : function(resp){
                    if(resp){
                        if(resp.status == 200){
                            systems = resp.data;
                        }else if(resp.status == 401){
                            alert('用户登录失效，请重新登录！');
                            userToken.goLogin();
                        }
                    }
                }
            });
            return systems;
        },

        add : function(system){
             return $.ajax({
                 url : config.v4.concat('/system?token=',storage.get('token')),
                 data : system,
                 type : 'post',
                 dataType : 'json',
                 error : function(e){
                     throw e;
                 }
            });
        },

        edit : function(system){
            return $.ajax({
                url : config.v4.concat('/system?token=',storage.get('token')),
                data : system,
                type : 'put',
                dataType : 'json',
                error : function(e){
                    throw e;
                }
            });
        },

        del : function(id){
            return $.ajax({
                url : config.v4.concat('/system?id=' + id,'&token=',storage.get('token')),
                type : 'delete',
                dataType : 'json',
                error : function(e){
                    throw e;
                }
            });
        },

        systemColNum : col,

        getRowSystems : function(start,systems){
            var length = start * col,
                index = length - col,
                newSystems = [];

            if(length > systems.length){
                length = systems.length;
            }

            for(var i = index ; i < length ; i++){
                newSystems.push(systems[i]);
            }
            return newSystems;
        }

    };


});
