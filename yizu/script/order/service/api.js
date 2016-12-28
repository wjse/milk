define(['jquery','util','config','converter','loading'],function($,util,config,converter,loading){

    var token = util.storage().get('user'),
        path = config.v4.concat('/yizu/');

    this.getUserAddress = function(){
        var obj = [];

        $.ajax({
            url : path.concat('address?uToken=',token),
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

    this.order = function(obj){
        var result = {ok : true};
        $.ajax({
            url : path.concat('order?uToken=',token),
            type : 'post',
            async : false,
            data : obj,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200){
                    result.id = resp.data.oid;
                }else{
                    result.ok = false;
                    result.err = resp.err;
                }
                loading.end();
            }
        });

        return result;
    };

    this.on = function(type,callback,params){

        var obj = {},
            state = converter.orderTypeState(type),
            _params = {};

        if(params){
            _params = params;
        }

        $.ajax({
            url : path.concat('order?order_state=',state,'&uToken=',token),
            type : 'get',
            data: _params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    obj.page = resp.data.page;
                    obj.list = resp.data.list;
                }
                callback.call(this,obj);
                loading.end();
            }
        });
    };

    this.getOrderList = function(type,params){
        var obj = {},
            state = converter.orderTypeState(type),
            _params = {};

        if(params){
            _params = params;
        }

        $.ajax({
            url : path.concat('order?order_state=',state,'&uToken=',token),
            type : 'get',
            async : false,
            data : _params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status == 200 && resp.data){
                    obj.page = resp.data.page;
                    obj.list = resp.data.list;
                }
                loading.end();
            }
        });

        return obj;
    };

    this.updateOrder = function(obj){
        var result = {ok : true};

        $.ajax({
            url : path.concat('order?uToken=',token),
            type : 'put',
            data : obj,
            async : false,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.err = resp.err;
                }
                loading.end();
            }
        });

        return result;
    };

    this.getFenXiaoOrderList = function(callback,params){
        var _params = {};
        if(params){
            _params = params;
        }
        $.ajax({
            url : path.concat('fenxiao?uToken=',token),
            type : 'get',
            data : _params,
            beforeSend : function(){
                loading.start();
            },
            success : function(resp){
                var data = {};
                if(resp.status == 200){
                    data = resp.data;
                }
                callback.call(this,data);
                loading.end();
            }
        });
    };

    this.getOrderCoupon = function(price){
        var coupon;
        $.ajax({
            url : path.concat('coupon?uToken=',token),
            type : 'get',
            async : false,
            data : {price:price},
            success : function(resp){
                if(resp.status == 200){
                    coupon = resp.data;
                }
            }
        });
        return coupon;
    };

    return this;
});
