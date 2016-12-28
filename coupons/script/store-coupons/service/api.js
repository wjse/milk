define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var storage = util.storage('session');
    var path = config.v4.concat('/Coupon/couponTemplate');

    var api = window.storeCouponsApi = {};

    api.getStorePage = function (searchStr) {
        var couponsList;
        $.ajax({
            url : path.concat(searchStr,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        couponsList = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }else {
                        alert('获取店铺优惠券列表失败，失败状态：' + resp.status + '，失败原因：' + resp.msg);
                    }
                }
            }
        });

        return couponsList;
    };

    api.getStore = function (id) {
        var coupons;
        $.ajax({
            url : path.concat('?id=',id,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        coupons = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }else {
                        alert('获取店铺优惠券失败，失败状态：' + resp.status + '，失败原因：' + resp.msg);
                    }
                }
            }
        });

        return coupons;
    };

    api.saveStore = function (data) {
        var result;
        $.ajax({
            url : path.concat('?token=' + storage.get('token')),
            type : 'post',
            data : data,
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.modifyStore = function (data) {
        var result;
        $.ajax({
            url : path.concat('?token=' + storage.get('token')),
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

    api.delStore = function (id) {
        var result;
        $.ajax({
            url : path.concat('?id=',id,'&token=' + storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.convertPromotionType = function (type) {
        if('S' == type){
            return '商家发放';
        }else if('S' == type){
            return '买家领取';
        }
    };


    return api;
});
/**
 * Created by Administrator on 2016/5/31 0031.
 */
