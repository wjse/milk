define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var path = config.v4.concat('/goods');

    var api = window.basicApi = {};
    var storage = util.storage('session');

    api.basicPage = function (pageNum) {
        var templatePage;
        $.ajax({
            url : path.concat('/basic?p=',pageNum,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    templatePage = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return templatePage;
    };

    api.templateSelect = function (category_id) {
        var templates;
        $.ajax({
            url : path.concat('/basic?category_id=',category_id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    templates = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return templates;
    };

    api.get = function (goods_common_id) {
        var template;
        $.ajax({
            url : path.concat('/basic?goods_common_id=',goods_common_id,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    template = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return template;
    };

    api.save = function (data) {
        var result;
        $.ajax({
            url : path.concat('/basic?token=',storage.get('token')),
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

    api.update = function (data) {
        var result;
        $.ajax({
            url : path.concat('/basic?token=',storage.get('token')),
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

    api.del = function (goods_common_id) {
        var result;
        $.ajax({
            url : path.concat('/basic?goods_common_id=',goods_common_id,'&token=',storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.getSpecList = function () {
        var specs;
        $.ajax({
            url : path.concat('/spec?token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    specs = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return specs;
    };

    api.getSpecOption = function (title_id) {
        var spec;
        $.ajax({
            url : path.concat('/spec/option?title_id=',title_id,'&token=',storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp.status == 200 && resp.data){
                    spec = resp.data;
                }else if(resp.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }
            }
        });
        return spec;
    };

    api.convertStatusStr = function (is_on_sale) {
        if(!is_on_sale || '0' == is_on_sale){
            return '上架商品';
        }else if('1' == is_on_sale){
            return '下架商品';
        }
    };

    return api;
});
/**
 * Created by Administrator on 2016/5/7 0007.
 */
