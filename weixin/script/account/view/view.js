require(['api',"util","menuView","agentSet","jquery"],function (api,util,menuView,agentSet,$){

    var pageNum = 1;
    var TableList = [];
    var Module = "account";//account , message , menu
    var searchType = "";

    $(function () {

        showModulePage();

    });

    function showModulePage(){

        $("#mainHead").addClass("hide");

        if(!Module) return;

        renderAside();

        renderHeader();

        if("menu" != Module){

            $("#mainHead").removeClass("hide");

            $("#mainBox").height($(window).height()-100);
            $(".main-body").css("background-color","#FFF");

            renderNav();

            SwitchBox("tableBox");

        }else {

            $(".main-body").css("background-color","transparent");
            menuView.load(Module);
        }

    };

    function renderAside(){

        if(!Module) return;

        var asideId = Module + "Aside";

        if( $("#"+asideId).length > 0 ) return;

        var list = [{
            active : false,
            module : "account",
            title : "代理商公众号管理",
            img : "www/image/ico-account.png"
        },{
            active : false,
            module : "message",
            title : "自动回复管理",
            img : "www/image/ico-mes.png"
        },{
            active : false,
            module : "menu",
            title : "公众号菜单管理",
            img : "www/image/ico-menu.png"
        }];

        for(var i = 0 ; i < list.length ; i ++ ){
            if(list[i].module == Module)
                list[i].active = true;
        }

        util.getScript('/common/aside-view',false).then(function(){
            window.asideView(asideId,list,function (module) {
                SwitchModule(module);
            });
        });
    };

    function renderHeader(){

        if(!Module) return;

        var headerText = "";

        switch (Module){
            case "account":
                headerText = "公众号管理"; break;
            case "message":
                headerText = "消息回复管理"; break;
            case "menu" :
                headerText = "公众号菜单管理"; break;
            default : break;
        };

        if(!headerText) return;

        util.getScript('/common/header-view',false).then(function(){
            window.headerView(headerText);
        });
    };

    function renderNav(){

        if(!Module) return;

        var navId = "#"+ Module + "Nav";

        if($("#navBox").find(navId).length > 0) return;

        var isAgent = ("account" == Module);

        var data = [{
            active : true,
            id : "tab_1",
            forward : "tableBox",
            name : ( isAgent ? "代理商公众号" : "消息列表" )
        },{
            active : false,
            id : "tab_2",
            forward : "formBox",
            name : "新建/编辑"
        }];

        util.getScript("/common/nav-view",false).then(function () {
            window.navView("#navBox",data, function (forward) {
                SwitchBox(forward,"new");
            });
        });
    };

    function renderSearch(){

        $("#searchBox").removeClass("hide");

        if($("#searchBox").find("input").length > 0) return;

        var typeList = [{
            type : "all",
            name : "全部"
        },{
            type : "appid",
            name : "AppId"
        },{
            type : "agent_name",
            name : "代理商姓名"
        },{
            type : "mobile",
            name : "电话号码"
        },{
            type : "mp_name",
            name : "公众号名称"
        }];

        util.getScript('/common/search-view',false).then(function () {
            window.searchView("#searchBox",searchType,typeList, function (searchData) {

                ShowTable(pageNum,searchData);

                if(searchData) searchType = searchData.type;
            });
        });
    };

    /**
     * switch module function
     * @param module ( "account" or "message" )
     *
     */
    function SwitchModule(module){

        Module = module;

        showModulePage();
    };

    /**
     * switch box function
     * @param forwardId == "tableBox" type => null backKey => null
     *        forwardId == "formBox" type => "new" backKey => null
     *        forwardId == "formBox" type => "new" backKey => cur-callback-key
     * @returns null
     */
    function SwitchBox(forwardId,type,backKey){

        $("#searchBox").addClass("hide");

        $("#"+forwardId).removeClass("hide").siblings("div").addClass("hide");

        $("li[forward='"+forwardId+"']").addClass("active").siblings("li").removeClass("active");

        if (forwardId == "formBox") {
            LoadForm("#formBox",type,backKey);
        }

        if (forwardId == "tableBox") {
            ShowTable(pageNum);
        }

    };

    /**
     * show module table function
     * @param pageIndex,searchData
     *
     */
    function ShowTable(pageIndex,searchData) {

        var isAgent = ("account" == Module);
        var search_data = ( searchData ? searchData : null );

        if(isAgent) renderSearch();

        api.GetTableList(pageIndex,search_data,isAgent).then(function (resp) {
            if(resp.status == 200 && resp.data.list.length > 0){console.log(resp);
                TableList = resp.data.list;
                LoadTablePage(resp.data.page,search_data);
                LoadTableList();
            }else {
                $("#pageNav").html('');
                $("#tableArea").html("<p>没有数据</p>");
            }
        });
    };

    function LoadTableList(){

        var data = {};
        switch (Module){

            case "account":
                data = {
                    head : ["代理商","手机","公众号名称","原始Id","appId","代理商账号","创建时间","操作"],
                    tdOrder : ["agent_name","mobile","mp_name","origin_id","appid","admin","create_time","option"],
                    body : TableList
                };
                break;

            case "message":
                data = {
                    head : ["原始ID","消息类型","标题","描述","图片","创建时间","创建人","操作"],
                    tdOrder : ["origin_id","type","title","description","pic_url","create_time","create_by","option"],
                    body : TableList
                };
                break;
            case "menu" :
                break;

            default : alert("参数错误");
                break;
        };

        util.getScript('/common/table-view',false).then(function(){
            window.tableView(data,"#tableArea", function (backKey,option) {
                updateAndDelete(backKey,option);
            });
        });
    };

    function LoadTablePage(pageObj,searchData){

        if(!pageObj.totalPage) {
            $("#pageNav").html('');
            return;
        }

        util.getScript('/common/pager',false).then(function(){
            window.pager(pageObj.totalPage,pageObj.currentPage,function(pageIndex){
                ShowTable(pageIndex,searchData);
                pageNum = pageIndex;
            });
        });
    };

    function updateAndDelete(backKey,option){

        var isAgent = ("account" == Module);
        switch (option){
            case "delete":
                api.DeleteRecord(backKey,isAgent).then(function (result) {
                    if(result.status == 200){
                        alert("删除成功");
                        ShowTable(1);
                    }
                });
                break;
            case "update":
                SwitchBox("formBox","update",backKey);
                break;
            default : alert("参数错误");
        }
    };

    function LoadForm(container,type,backKey){

        var isAgent = ("account" == Module);

        var formId = isAgent ? "agentForm" : "messageForm";

        if( $("#"+formId).length > 0) {
            $("#"+formId)[0].reset();
        }

        var data = {
            container : container,
            formId : formId,
            groupList: GetFormGroupList()
        };

        if(backKey){

            var key = isAgent ? "appid" : "id";

            for(var i=0;i<TableList.length;i++){
                if(TableList[i][key] == backKey){
                    data.editRecord = TableList[i];
                }
            }
        }

        util.getScript('/common/form-view',false).then(function(){
            window.formView(data, function (subData) {
                if(type == "update"){

                    var idString = isAgent ? "" : "&id="+data.editRecord.id;
                    subData += idString;

                    api.UpdateRecord(subData,isAgent).then(function (result) {
                        if(result.status == 200){
                            alert("修改成功");
                        }else{
                            alert("提交失败");
                        }
                    });
                }
                if(type == "new"){
                    api.SubmitNewRecord(subData,isAgent).then(function (resp) {
                        if(resp.status == 200){
                            alert("提交成功");
                            type = "update";
                            bindNextSet();
                        }else{
                            if(resp.status == 503){
                                alert("该用户已存在(两个公众号appid不能相同)");
                            }else{
                                alert("提交失败");
                            }
                        }
                    });
                }
            });
        });
        if(type == "update"){
            bindNextSet();
        }
    };

    function bindNextSet() {
        $("input[name='appid']").attr("readonly",true);
        var appid = $("input[name='appid']").val();
        $("#formOpt").append(' <button type="button" class="btn btn-primary" id="nextSet">更多设置</button>');
        $("#nextSet").agentSet({appid:appid,container:$("#formBox")});
    }

    function GetFormGroupList(){
        var groupList = [];

        switch (Module){
            case "account":
                groupList = GetAgentGroup();
                break;
            case "message":
                groupList = GetMessageGroup();
        };

        return groupList;
    };

    function GetAgentGroup(){
        return [{
            name : "agent_name",
            label : "代理商姓名",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "代理商姓名(必填)"
        },{
            name : "mobile",
            label : "联系电话",
            required : true,
            type : "tel",
            maxlength : 11,
            placeholder : "代理商手机(必填)"
        },{
            name : "mp_name",
            label : "公众号名称",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "公众号名称(必填)"
        },{
            name : "origin_id",
            label : "公众号原始ID",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "原始ID(必填)"
        },{
            name : "appid",
            label : "AppId",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "AppId(必填)",
            klass: "readonly"
        },{
            name : "appsecret",
            label : "AppSecret",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "AppSecret(必填)"
        },{
            name : "mchid",
            label : "商户ID",
            required : false,
            type : "text",
            maxlength : 30,
            placeholder : "商户ID"
        },{
            name : "key",
            label : "商户密钥",
            required : false,
            type : "text",
            maxlength : 30,
            placeholder : "商户密钥"
        }];
    };

    function GetMessageGroup(){
        return [{
            name : "origin_id",
            label : "原始ID",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "原始ID(必填)"
        },{
            name : "type",
            label : "消息类型",
            required : true,
            type : "select",
            options: [{name : "图文","value" : 1 },{name : "纯文本", value : 2}],
            default: 1,
            placeholder : "公众号appid(必填)"
        },{
            name : "keywords",
            label : "关键字",
            required : true,
            type : "text",
            maxlength : 50,
            placeholder : "用户触发关键字"
        },{
            name : "title",
            label : "标题",
            required : true,
            type : "text",
            maxlength : 30,
            placeholder : "标题(必填)",
            klass : "fulltext"
        },{
            name : "description",
            label : "图文描述",
            required : true,
            type : "textarea",
            maxlength : 255,
            row : 5,
            placeholder : "消息描述(必填)"
        },{
            name : "pic_url",
            label : "图片链接",
            required : false,
            type : "text",
            // maxlength : 100,
            placeholder : "图片链接",
            klass : "fulltext"
        },{
            name : "url",
            label : "跳转地址",
            required : false,
            type : "text",
            // maxlength : 50,
            placeholder : "跳转地址",
            klass : "fulltext"
        }];
    };

});