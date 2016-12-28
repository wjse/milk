define(['jquery','config','date','util','userToken'],function ($,config,date,util,userToken) {
    var path = config.v4.concat('/goods');

    var api = window.goodsApi = {};
    var storage = util.storage('session');
    
    api.get = function (goods_id) {
        var goods;
        $.ajax({
            url : path.concat('?goods_id=',goods_id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    goods = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        })

        return goods;
    };

    api.getCommonGoods = function (goods_common_id) {
        var commonGoods;
        $.ajax({
            url : path.concat('?goods_common_id=',goods_common_id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    commonGoods = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        })
    
        return commonGoods;
    };

    api.saveGoods = function (goods) {
        var result;
        $.ajax({
            url : path.concat('?token=',storage.get('token')),
            type : 'post',
            data : goods,
            dataType : 'json',
            async : false,
            success : function(resp){
                result = resp;
            }
        });
        return result;
    };

    api.updateGoods = function (goods) {
        var result;
        $.ajax({
            url : path.concat('?token=',storage.get('token')),
            type : 'put',
            data : goods,
            dataType : 'json',
            async : false,
            success : function(resp){
                result = resp;
            }
        });
        return result;
    };

    api.del = function (goods_id) {
        var result;
        $.ajax({
            url : path.concat('?goods_id=',goods_id,'&token=',storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.convertStatusStr = function (is_on_sale) {
        if(!is_on_sale || '0' == is_on_sale){
            return '上架';
        }else if('1' == is_on_sale){
            return '下架';
        }
    };

    return api;
})
/**
 * Created by Administrator on 2016/5/5 0005.
 */
