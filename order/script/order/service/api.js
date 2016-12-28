define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var path = config.v4.concat('/order');

    var api = window.orderApi = {};
    var storage = util.storage('session');

    api.orderPage = function (dataStr) {
        var pageResult;
        $.ajax({
            url : path.concat('/index',dataStr,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        pageResult = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }
                }
            },
            error : function (e) {
                alert('服务器错误！');
            }
        });

        return pageResult;
    };

    api.getOrder = function (oid) {
        var order;
        $.ajax({
            url : path.concat('?oid=',oid,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success :function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        order = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }
                }
            },
            error : function (e) {
                alert('服务器错误!');
            }
        });

        return order;
    };

    api.track = function (oid) {
        var trackList;
        $.ajax({
            url : path.concat('/trace?order_id=',oid,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success :function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        trackList = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }
                }
            },
            error : function (e) {
                alert('服务器错误!');
            }
        });

        return trackList;
    };

    api.shipCompany = function () {
        var companys;
        $.ajax({
            url : path.concat('/ship/company?token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success :function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        companys = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }else {
                        alert('请求错误，错误状态：' + resp.status + '，错误原因：' + resp.msg);
                    }
                }
            },
            error : function (e) {
                alert('服务器错误!');
            }
        });

        return companys;
    };
    
    api.ship = function (data) {
        var result ;
        $.ajax({
            url : path.concat('/ship?token=',storage.get('token')),
            type : 'put',
            data : data,
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            },
            error : function (e) {
                alert('服务器错误！');
            }
        });
        
        return result;
    };

    api.convertState = function (state) {
        if('10' == state){
            return '待付款';
        }else if('20' == state){
            return '待发货';
        }else if('30' == state){
            return '已发货';
        }else if('40' == state){
            return '已完成';
        }else if('0' == state){
            return '已取消';
        }
    };


    return api;

});

/**
 * Created by Administrator on 2016/5/26 0026.
 */
