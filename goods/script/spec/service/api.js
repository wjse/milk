define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var path = config.v4.concat('/goods/spec');
    var storage = util.storage('session');

    var api = window.specApi = {};

    api.getTitleList = function () {
        var titleList;
        $.ajax({
            url : path.concat('/title?token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        titleList = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }else {
                        alert('获取规格标题列表失败，失败状态：' + resp.status + '，失败原因：' + resp.msg);
                    }
                }
            }
        });

        return titleList;
    };

    api.addTitle = function (data) {
        var result;
        $.ajax({
            url : path.concat('/title?token=' + storage.get('token')),
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

    api.modifyTitle = function (data) {
        var result;
        $.ajax({
            url : path.concat('/title?token=' + storage.get('token')),
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

    api.delTitle = function (title_id) {
        var result;
        $.ajax({
            url : path.concat('/title?title_id=',title_id,'&token=' + storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    api.getOptionList = function (title_id) {
        var optionList;
        $.ajax({
            url : path.concat('/option?title_id=',title_id,'&token=' + storage.get('token')),
            type : 'get',
            dataType : 'json',
            async : false,
            success : function (resp) {
                if(resp){
                    if(resp.status == 200 && resp.data){
                        optionList = resp.data;
                    }else if(resp.status == 401){
                        alert('用户登录失效，请重新登录！');
                        userToken.goLogin();
                    }else {
                        alert('获取规格项列表失败，失败状态：' + resp.status + '，失败原因：' + resp.msg);
                    }
                }
            }
        });

        return optionList;
    };

    api.addOption = function (data) {
        var result;
        $.ajax({
            url : path.concat('/option?token=' + storage.get('token')),
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

    api.modifyOption = function (data) {
        var result;
        $.ajax({
            url : path.concat('/option?token=' + storage.get('token')),
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

    api.delOption = function (option_id) {
        var result;
        $.ajax({
            url : path.concat('/option?option_id=',option_id,'&token=' + storage.get('token')),
            type : 'delete',
            dataType : 'json',
            async : false,
            success : function (resp) {
                result = resp;
            }
        });

        return result;
    };

    return api;
});
/**
 * Created by Administrator on 2016/6/2 0002.
 */
