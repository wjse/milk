define(['util','jquery','config','loading'],function(util,$,config,loading){
    var path = config.v4.concat('/yizu/'),
        scope = {};

    scope.on = function(){
        var obj = {};

        var token = util.storage().get('user');
        $.ajax({
            url : path.concat('user?uToken=',token),
            type : 'get',
            async:false,
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

    scope.getQRCode = function(callback){
        var token = util.storage().get('user');
        $.ajax({
            url : path.concat('QRCode?uToken=',token),
            type : 'get',
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    callback.call(this,resp.data.ticket);
                }
                loading.end();
            }
        });
    };

    scope.getCouponList = function(callback,params){
        var token = util.storage().get('user'),_params = {};
        if(params){
            _params = params;
        }
        $.ajax({
            url : path.concat('coupon?uToken=',token),
            type : 'get',
            data : _params,
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

    scope.getMyTeam = function(callback,params){
        var token = util.storage().get('user'),data;
        $.ajax({
            url : path.concat('team?uToken=',token),
            type : 'get',
            data : !params ? {} : params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    data = resp.data;
                }
                callback.call(this,data);
                loading.end();
            }
        });
    };

    return scope;
});
