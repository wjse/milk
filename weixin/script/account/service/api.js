define(['jquery','util','config'],function($,util,config){
    // const create_url = "http://wxshop.vcoola.cn/mafu_v4/wechat/menu/create";
    // const regist_url = "http://wxshop.vcoola.cn/mafu_v4/manage/admin/register";
    var path = config.v4.concat('/manage');
    var wPath = config.v4.concat('/wechat');
    var token = util.getUrlParam("token");
    return {

        "SubmitNewRecord" : function(data,isAgent){
            var url = isAgent ? path.concat('/wechat'): path.concat('/wxMessage');
            return $.ajax({
                type : 'post',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "GetTableList" : function (page,search,isAgent) {
            var url = isAgent ?path.concat('/wechat'): path.concat('/wxMessage');
            var data = {p:page};
            if(search){
                data.search = search.type;
                data.value = search.value;
            }
            return $.ajax({
                type : 'get',
                url : url+"?token="+token,
                data : data,
                dataType : 'json'
            });
        },

        "UpdateRecord" : function(data,isAgent) {
            var url = isAgent ? path.concat('/wechat'): path.concat('/wxMessage');
            return $.ajax({
                type : 'put',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "DeleteRecord" : function(delId,isAgent) {
            var key = isAgent ? "appid" : "id";
            var url = isAgent ? path.concat('/wechat'): path.concat('/wxMessage');
            url = url + "?"+key+"=" + delId;
            return $.ajax({
                type : 'delete',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "getMenu" : function(){
            var url = path.concat('/WxMenu?ask=combine');
            return $.ajax({
                type : 'get',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "getOneMenu" : function(id){
            var url = path.concat('/WxMenu?id=',id);
            return $.ajax({
                type : 'get',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "submitNewMenu" : function (data) {
            var url = path.concat('/WxMenu');
            return $.ajax({
                type : 'post',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "submitUpdataMenu" : function(data){
            var url = path.concat('/WxMenu');
            return $.ajax({
                type : 'put',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "delMenu" : function(id){
            var url = path.concat('/WxMenu?id=',id);
            return $.ajax({
                type : 'delete',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "getAgentList" : function (appid) {
            var url = path.concat('/AreaAgent?agent_appid=',appid);
            return $.ajax({
                type : 'get',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },
        
        "getAreaList" : function (parent_id) {
            var url = path.concat('/area?parent_id=',parent_id);
            return $.ajax({
                type : 'get',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "bindAgentArea" : function (data) {
            var url = path.concat('/AreaAgent');
            return $.ajax({
                type : 'post',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "delAgentArea" : function (area_id) {
            var url = path.concat('/AreaAgent?area_id=',area_id);
            return $.ajax({
                type : 'delete',
                url : url+"&token="+token,
                dataType : 'json'
            });
        },

        "submitBuildMenu" : function (data) {
            var url = wPath.concat('/menu/create');
            return $.ajax({
                type : 'post',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "submitNewAccount" : function (data) {
            var url = path.concat('/admin/register');
            return $.ajax({
                type : 'post',
                url : url+"?token="+token,
                dataType : 'json',
                data : data
            });
        },

        "getOneAccountRecord" : function (appid) {
            var url = path.concat('/wechat?appid=',appid);
            return $.ajax({
                type : 'get',
                url : url+"&token="+token,
                dataType : 'json'
            });
        }

    };
});