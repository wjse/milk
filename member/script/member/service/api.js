define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var userPath = config.v4.concat('/manage/user');
    var yizuUserPath = config.v4.concat('/manage/Yizu');

    var api = window.memberApi = {};
    var storage = util.storage('session');

    api.memberPage = function (dataStr) {
        var pageResult;
        $.ajax({
            url : userPath.concat(dataStr,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    pageResult = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return pageResult;
    };
    
    api.getUser = function (id) {
        var member;
        $.ajax({
            url : userPath.concat('?id=',id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    member = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return member;
    };

    api.updateYizu = function (data) {
        var result;
        $.ajax({
            url : yizuUserPath.concat('?token=',storage.get('token')),
            type : 'put',
            data : data,
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.pointsLog = function (id,pageNum) {
        var pointsLog;
        $.ajax({
            url : config.v4.concat('/manage/pointsLog?id=',id,'&p=',pageNum,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    pointsLog = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return pointsLog;
    };

    api.coinLog = function (id,pageNum) {
        var coinLog;
        $.ajax({
            url : config.v4.concat('/manage/coinLog?id=',id,'&p=',pageNum,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    coinLog = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return coinLog;
    };

    api.customers = function (id,pageNum) {
        var customers;
        $.ajax({
            url : config.v4.concat('/manage/user/customer?parent_id=',id,'&p=',pageNum,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    customers = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });

        return customers;
    };

    api.convertIsLock = function (is_lock) {
        if('0' == is_lock || !is_lock){
            return '冻结';
        }else if('1' == is_lock){
            return '解冻';
        }
    };

    api.convertIsLockStatus = function (is_lock) {
        if('0' == is_lock || !is_lock){
            return '正常';
        }else if('1' == is_lock){
            return '冻结';
        }
    };

    return api;
    
});
/**
 * Created by Administrator on 2016/5/19 0019.
 */
