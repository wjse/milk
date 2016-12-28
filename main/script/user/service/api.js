define(['jquery','util','config','userToken'],
    function($,util,config,userToken){
        var storage = util.storage('session');

        return {

            login : function(username,password){
                var result;
                $.ajax({
                    type : 'post',
                    url : config.v4.concat('/system/login'),
                    data : {
                        admin_name:username,
                        password : util.sha(password)
                    },
                    dataType : 'json',
                    async:false,
                    success : function (resp) {
                        result = resp;
                    }
                });

                return result;
            },

            go : function(data){
                if(!data){
                    throw new Error('There is no response data');
                }
                storage.put('user',data);
                storage.put('token',data.token);
                window.location.href = userToken.mainPath();
            },

            page : function (page) {
                var pageResult = {};
                $.ajax({
                    url : config.v4.concat('/system/admin?token=',storage.get('token')),
                    type : 'get',
                    dataType : 'json',
                    async:false,
                    success : function(resp){
                        if(resp.status == 200){
                            pageResult = resp.data;
                        }else if(resp.status == 401){
                            alert('用户登录失效，请重新登录！');
                            userToken.goLogin();
                        }
                    }
                });
                return pageResult;
            },

            getUser : function (id) {
                var user;
                $.ajax({
                    url : config.v4.concat('/system/admin?admin_id=' , id ,'&token=' , storage.get('token')),
                    type : 'get',
                    dataType : 'json',
                    async:false,
                    success : function (resp) {
                        if(resp.status = 200){
                            user = resp.data;
                        }else if(resp.status == 401){
                            alert('用户登录失效，请重新登录！');
                            userToken.goLogin();
                        }else {
                            alert('请求出错');
                        }
                    }
                });
                return user;
            },

            save : function (data) {
               return $.ajax({
                    url: config.v4.concat('/system/admin?token=',storage.get('token')),
                    type: "post",
                    data: data,
                    dataType: "json",
                    error: function (e) {
                        throw e;
                        alert('系统错误，请退出重新登录！');
                    }
                });
            },

            update : function(data) {
                return $.ajax({
                    url: config.v4.concat('/system/admin?token=',storage.get('token')),
                    type: "put",
                    data: data,
                    dataType: "json",
                    async: false,
                    error: function (e) {
                        throw e;
                       alert('系统错误，请退出重新登录！');
                    }
                });
            },

            delete : function(id){
                return $.ajax({
                    url: config.v4.concat('/system/admin/admin_id=',id,'&token=',storage.get('token')),
                    type: "delete",
                    dataType: "json",
                    error: function (e) {
                        throw e;
                        alert('系统错误，请退出重新登录！');
                    }
                });
            },

            convertType : function (type) {
                if('super' == type){
                    return '超级管理员';
                }else if('normal' == type){
                    return '普通用户';
                }
            }
        };
});
