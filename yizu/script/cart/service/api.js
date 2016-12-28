define(['jquery','config','util','loading'],function($,config,util,loading){
    var api = {},
        path = config.v4.concat('/yizu');

    api.on = function(callback){
        var token = util.storage().get('user');
        $.ajax({
            url : path.concat('/cart?uToken=',token),
            type : 'get',
            beforeSend : function(){
                loading.start();
            },
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    callback.call(this,resp.data);
                }else{
                    callback.call();
                }
                loading.end();
            }
        });
    };

    api.remove = function(cartId){
        var token = util.storage().get('user');
        var result = {ok:true};

        $.ajax({
            url : path.concat('/cart?cart_id=',cartId,'&uToken=',token),
            type : 'delete',
            async : false,
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.msg = resp.err;
                }
            }
        });

        return result;
    };

    api.update = function(cart){
        var token = util.storage().get('user');
        var result = {ok:true};

        $.ajax({
            url : path.concat('/cart?uToken=',token),
            type : 'put',
            async : false,
            data : cart,
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.msg = resp.err;
                }
            }
        });

        return result;
    };

    api.recommend = function(){
        var obj = [];

        $.ajax({
            url : path.concat('?recommend'),
            type : 'get',
            async : false,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    obj = resp.data;
                }
                loading.end();
            }
        });

        return obj;
    };

    return api;
});
