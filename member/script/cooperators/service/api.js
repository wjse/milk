define(['jquery','config','util','userToken'],function ($,config,util,userToken) {
    var path = config.v4.concat('/manage/business');
    var storage = util.storage('session');

    var api = window.business = {};

    api.getBusiness = function (pageNum) {
        var pageResult;
        $.ajax({
            url : path.concat('?p=',pageNum,'&token=',storage.get('token')),
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
            }
        });
        return pageResult;
    };

    api.delBusiness = function (id) {
        var result;
        $.ajax({
            url : path.concat('?id=',id,'&token=',storage.get('token')),
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
 * Created by Administrator on 2016/6/3 0003.
 */
