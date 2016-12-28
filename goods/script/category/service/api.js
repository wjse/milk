define(['jquery','config','util','userToken'],function($,config,util,userToken){
    const path = config.v4.concat('/goods/category');
    var api = window.categoryApi = {};
    var storage = util.storage('session');

    api.get = function (cid) {
        var category = [];
        $.ajax({
            url : path.concat('?cid=' + cid,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    category = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return category;
    };

    api.getTree = function () {
        var categoryTree = [];
        $.ajax({
            url : path.concat('/tree?token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    categoryTree = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return categoryTree;
    };

    api.next = function (parent_id) {
        var nextCategory = [];
        $.ajax({
            url : path.concat('?parent_id=' + parent_id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    nextCategory = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return nextCategory;
    };

    api.list = function(){
        var categoryList = [];
        $.ajax({
            url : path.concat('?token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    categoryList = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return categoryList;
    };

    api.save = function(data){
        // var result = false;
        var result;
        $.ajax({
            url : path.concat('?token=',storage.get('token')),
            type : 'post',
            data : data,
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200){
                    result = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return result;
    };

    api.update = function(data){
        var result;
        $.ajax({
            url : path.concat('?token=',storage.get('token')),
            type : 'put',
            data : data,
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200){
                    result = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return result;
    };

    api.remove = function(cid){
        var result = false;
        $.ajax({
            url : path.concat('?cid=',cid,'&token=',storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200){
                    result = true;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return result;
    };

    api.buildTree = function (list,boxId,callback) {
        $(boxId).tree({
            data : list,
            autoOpen : false,
            dragAndDrop: true,
            slide: false
        }).bind(
            'tree.click',
            callback//function
        );
    };

    return api;
});

