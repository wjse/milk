function asideModel(moduleName){
    var util = requirejs('util');
    var storage = util.storage('session');
    var token = storage.get('token');

    var list = [{
        active : false,
        module : "member",
        title : "会员管理",
        img : "www/image/user.png",
        link : 'member-list.html?token=' + token
    },{
        active : false,
        module : "cooperator",
        title : "加盟申请信息",
        img : "www/image/business.png",
        link : 'cooperators.html?token=' + token
    },{
        active : false,
        module : "suggestion",
        title : "投诉建议信息",
        img : "www/image/complain.png",
        link : 'suggestions.html?token=' + token
    }];

    for(var i = 0 ; i < list.length ; i ++ ){
        if(list[i].module == moduleName){
            list[i].active = true;
            break;
        }
    }

    return list;
};

/**
 * Created by Administrator on 2016/4/12.
 */
