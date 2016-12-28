define(['jquery','config','util','loading'],function($,config,util,loading){

    var path = config.v4.concat('/yizu/'),
        goodsApi = {};

    goodsApi.on = function(params,callback){
        $.ajax({
            url : path.concat('category'),
            type : 'get',
            data : params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    callback.call(this,resp.data);
                }
                loading.end();
            }
        });
    };

    goodsApi.queryGoodsByCategoryCallback = function(callback,params){
        if(params && params.cid && params.cid != $('.nav-box li[class=active]').attr('for')){
            return;
        }
        $.ajax({
            url : path.concat('category'),
            type : 'get',
            data : params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    callback.call(this,resp.data);
                }
                loading.end();
            }
        });
    };

    goodsApi.getGoods = function(id,callback){

        $.ajax({
            url : path.concat('goods?common_id=',id),
            type : 'get',
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    callback.call(this,resp.data);
                }
                loading.end();
            }
        });

    };

    goodsApi.search = function(val){
        var obj = [];
        $.ajax({
            url : path.concat('search?keywords=',val),
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

    goodsApi.addCart = function(cart){
        var token = util.storage().get('user');
        var result = {ok : true};
        $.ajax({
            url : path.concat('/cart?uToken=',token),
            type : 'post',
            data : cart,
            async : false,
            success : function(resp){
                if(resp.status != 200) {
                    result.ok = false;
                    result.err = resp.err;
                }
            }
        });
        return result;
    };
    
    return goodsApi;
});
