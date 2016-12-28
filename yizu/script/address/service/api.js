define(['jquery','util','config','loading'],function($,util,config,loading){

    var path = config.v4.concat('/yizu/'),
        token = util.storage().get('user');

    this.on = function(){
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

    this.formTransToJson = function(formStr){
        var array = formStr.split('&'),
            obj = {};
        for(var i = 0 ; i < array.length ; i++){
            var tmp = array[i].split('=');
            obj[tmp[0]] = decodeURI(tmp[1]);
        }

        return obj;
    };

    this.updateAddress = function(data){
        var result = {ok : true};
        $.ajax({
            url : path.concat('address?uToken=',token),
            type : 'put',
            async : false,
            data : data,
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.err = resp.err;
                }
            }
        });

        return result;
    };

    this.newAddress = function(data){
        var result = {ok : true};
        data.is_default = 1;
        $.ajax({
            url : path.concat('address?uToken=',token),
            type : 'post',
            async : false,
            data : data,
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.err = resp.err;
                }
            }
        });

        return result;
    };

    this.deleteAddress = function(id){
        var result = {ok : true};

        $.ajax({
            url : path.concat('address?uToken=',token,'&id=',id),
            type : 'delete',
            async : false,
            success : function(resp){
                if(resp.status != 200){
                    result.ok = false;
                    result.err = resp.err;
                }
            }
        });

        return result;
    };

    return this;
});
