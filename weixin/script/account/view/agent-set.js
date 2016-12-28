define(['jquery','api'],function ($,api) {

    function agentSet(el,opts) {

        this.opts = $.extend({},agentSet.DEFAULTS,opts);

        var opts = this.opts;

        this.el = el;

        var _this = this;

        $(el).on("click",function () {
            _this.initPage();
        });
    }
    agentSet.DEFAULTS = {
        appid : "not",
        container: $("#formBox")
    };

    agentSet.prototype.initPage = function() {

        var opts = this.opts;

        var el = this.el;

            $(opts.container).html(getHtml(opts));

            initSelect();

            this.bindBuildMenu();

            this.bindSubmitArea();

            this.bindDelArea();

            this.bindSubmitAccount();
    };

    function initSelect(){
        $("#province").on("change",function () {
            var provinceId = $(this).val();
            renderCity(provinceId);
            $("#city").on("change",function () {
                var cityId = $(this).val();
                renderAreaList(cityId);
            })
        });
    };

    agentSet.prototype.bindSubmitArea = function() {

        var appid = this.opts.appid;
        var _agentSet = this;

        $("#bindAreaBtn").on("click",function () {
            var checkedStr = "";
            $("input[type='checkbox']:checked").each(function () {
                checkedStr += this.value+"_";
            });
            var data = {
                "agent_appid" : appid,
                "area_id" : checkedStr
            };
            api.bindAgentArea(data).then(function (result) {
                if(result.status == 200){
                    _agentSet.initPage();
                }
            });
        });
    };
    
    agentSet.prototype.bindDelArea = function () {
        var _agentSet = this;
        $("a.del-area").on("click",function () {
          var area_id = $(this).attr("del-id");
          if(!area_id) return;
          api.delAgentArea(area_id).then(function (result) {
              if(result.status == 200){
                  _agentSet.initPage();
              }
          });
      });
    };

    agentSet.prototype.bindBuildMenu = function () {
        var _agent = this;
        var appid = this.opts.appid;
        $("#buildMenu").bind("click",function () {
            $(this).unbind();
            api.submitBuildMenu({"appid":appid}).then(function (result) {
                if(result.status == 200){
                    $(this).attr("disabled",true).html("菜单已生成");
                }
            });
        });
    };
    
    agentSet.prototype.bindSubmitAccount = function () {

        var appid = this.opts.appid;

        api.getOneAccountRecord(appid).then(function (account) {

            if(account.status != 200) return;

            if(account.data.admin){
                $("#accountSetForm").html('<p>已有账户：'+account.data.admin+'</p>');
            }

            $("#accountSetForm").ajaxForm(function () {
                if($("#inputUserName").val() && $("#inputPass").val() && $("#inputNickName").val()){
                    var data = $("#accountSetForm").serialize();
                    data += "&appId="+appid;
                    var result = api.submitNewAccount(data);console.log(result);
                    if(result.status == 200){
                        $("#accountSetForm").html('<p>已有账户：'+$("#inputUserName").val()+'</p>');
                    }
                    if(result.status == 503){
                        alert("该用户已有账户！");
                    }
                }
            });
        });

    };

    function renderAreaList(cityId) {
        api.getAreaList(cityId).then(function (result) {
            if(result.status != 200) return;
            var list = result.data;
            var html = getCheckedAreaHtml(list);
            $("#checkboxArea").html(html);
        });
    }

    function getHtml(opts) {
        var html  = '';
            html += getHtml_menu();
            html += getHtml_area(opts);
            html += getHtml_account();
            html += getHtml_back();
        return html;
    }

    function getHtml_menu() {
        var html  = '<div class="agent-set-group agent-menu">';
            html += '<p><a href="javascript:;" class="btn btn-primary" id="buildMenu">一键生成公众号菜单</a>';
            html += '</p>';
            html += '</div>';
        return html;
    };

    function getHtml_area(opts) {
        var html  = '<div class="agent-set-group agent-area">';
            html += '<div><strong>已代理区域： </strong>';
            html += getAgentListHtml(opts);
            html += '</div>';
            html += '<div class="area-confirm"><a class="btn btn-primary" href="javascript:;" id="bindAreaBtn">&emsp;绑定&emsp;</a></div>';
            html += '<div id="selectArea"><strong>绑定代理区域  </strong> '+getProviceSelect()+' </div>';
            html += '<div id="checkboxArea"></div>';
            html += '</div>';
        return html;
    };

    function getHtml_account() {
        var html  = '<div class="agent-set-group agent-account">';
            html += '<div><strong>设置代理商账号 </strong></div>';
            html += getAccountForm();
            html += '</div>';
        return html;
    };

    function getProviceSelect() {

        api.getAreaList().then(function (result) {

            if(result.status != 200) return;

            var list = result.data;
            return getSelectHtml("province",list);
        });

    };

    function getAgentListHtml(opts) {

        api.getAgentList(opts.appid).then(function (result) {

            if(result.status != 200) return "无";

            var data = result.data;
            var html  = '<ul>';
            $.each(data,function (index, area) {
                html += '<li>'+area.area_name+' <a class="btn btn-default btn-xs del-area" del-id="'+area.area_id+'" href="javascript:;">删除</a></li>';
            });
            html += '</ul>';

            return html;
        });
    };

    function getSelectHtml(selectId,list) {
        var html = '';
        html += '<select id="'+selectId+'">';
        html += '<option disabled selected>请选择</option>';
        $.each(list,function (index, option) {
            html += '<option value="'+option.area_id+'" '+( option.has_agent != "0" ? "disabled" : "")+'>'+option.area_name+'</option>';
        })
        html += '</select>';
        return html;
    }

    function getCheckedAreaHtml(list) {
        var html = '<div>';
        $.each(list,function (index, area) {
            html += '<label><input type="checkbox" value="'+area.area_id+'" '+( area.has_agent > 0 ? "disabled" : "" )+'>'+area.area_name+'</label> ';
        });
        html += '</div>';

        return html;
    };

    function renderCity(provinceId){
        api.getAreaList(provinceId).then(function (result) {
            if(result.status != 200) return;
            var list = result.data;
            var html = getSelectHtml("city",list);
            $("#city").remove();
            $("#selectArea").append(html);
        });
    };

    function getAccountForm() {

        var html = '';
            html += '<form class="form-inline" id="accountSetForm">';
            html += '<div class="form-group"><label for="inputUserName">用户名： </label><input type="text" class="form-control" id="inputUserName" name="username" placeholder="用户名（不允许汉字）"/></div>';
            html += '<div class="form-group"><label for="inputPass">密码： </label><input type="password" class="form-control" id="inputPass" name="password" /></div>';
            html += '<div class="form-group"><label for="inputNickName">用户昵称： </label><input type="text" class="form-control" id="inputNickName" name="nickName" /></div>';
            html += '<div class="confirm-set-account"><button type="submit" class="btn btn-primary">&emsp;确定&emsp;</button></div>';
            html += '</form>';
        return html;

    };

    function getHtml_back() {
        var html  = '<div class="set-area-back">';
            html += '<a class="btn btn-info" href="javascript:window.location.reload();">返回列表</a>';
            html += '</div>';
        return html;
    };
    
    $.fn.extend({
        agentSet : function (opts) {
            return this.each(function () {
                new agentSet(this,opts);
            });
        }
    });
});