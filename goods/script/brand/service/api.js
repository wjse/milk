define(['jquery','config','util','userToken'],function($,config,util,userToken){
    const path = config.v4.concat('/goods/brand');

    var api = window.brandApi = {};
    var storage = util.storage('session');

    api.list = function(){
        var brandList = [];
        $.ajax({
            url : path.concat('?token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    brandList = resp.data.list;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return brandList;
    };

    api.get = function(id){
        var brand = {};
        $.ajax({
            url : path.concat('?bid=',id,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    brand = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return brand;
    };

    api.remove = function(id){
        var result = false;
        $.ajax({
            url : path.concat('?bid=',id,'&token=' + storage.get('token')),
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

    api.update = function(brand){
        var result = false;
        if(!brand.bid || brand.bid == ''){
            return result;
        }
        $.ajax({
            url : path.concat('?token=' + storage.get('token')),
            type : 'put',
            data : brand,
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

    api.save = function(brand){
        var result = false;
        $.ajax({
            url : path.concat('?token=' + storage.get('token')),
            type : 'post',
            data : brand,
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

    api.converter = {
        show : function(isShow){
            return isShow == 1 ? '是' : '否';
        },
        img : function(img){
            return '<img src="' + img + '">';
        }
    };

    return api;
});
