/**this is menu Module of mp_system,
 *menu , account , message are tied for mp_system
 */
define(["api"],function (api) {

    var menuList;
    var firstDegreeMax = 3;
    var secondDegreeMax = 5;

    this.load = function (module) {

        if(!module) return;

        $("#menuBox").removeClass("hide").siblings().addClass("hide");

        reloadMenu();
    };

    function initMenuBox(){
        var html = '';
        for(var i=0; i<firstDegreeMax; i++) {
            html += getInitGroup(i);
        }
        $("#menuBox").html(html);
        for(var i=0; i<firstDegreeMax;i++){
            bindNewMenu("#menu_"+i);
        }
    };

    function renderMenu(){

        if(!menuList) return;

        $.each(menuList, function (index,group) {
            if(index < firstDegreeMax)
            renderGroup(index,group);
        });

    };
    
    function renderGroup(index,group){

        if(!group.id) return;

        $("#menu_"+index).find(".group-head").html(getOneMenu(group));
        bindNewMenu("#menu_"+index,group.id);
        bindDelMenu();
        bindEditMenu();
        if(group.type != "sub_button")
            $("#menu_"+index).find(".new-btn").addClass("hide");

        if(!group.sub_menu || group.sub_menu.length < 1) return;

        renderSecondDegree(index,group.sub_menu);
    };

    function renderSecondDegree(index,subMenu){
        var html = '<ul>';
        if(subMenu.length >= secondDegreeMax) {
            $("#menu_"+index).find(".new-btn").addClass("hide");
        }
        for(var i=0; i<subMenu.length; i++){
            html += '<li>';
            html += getOneMenu(subMenu[i]);
            html += '</li>';
        }
        html += '</ul>';
        $("#menu_"+index).find(".group-body").html(html);
        bindDelMenu();
        bindEditMenu();
    };

    function getInitGroup(index){
        var html  = '<div class="menu-group col-md-4 col-sm-6" id="menu_'+index+'">';
            html += '   <div class="group-box">';
            html += '       <div class="group-head"></div>';
            html += '       <div class="group-body"></div>';
            html += '       <div class="group-option">';
            html += '           <a class="btn btn-block btn-info new-btn" href="javascript:;" disabled>数据错误</a>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';
        return html;
    };

    function getOneMenu(menu){
        var html = '<div class="menu">';
            html += '<div class="menu-option">';
            html += '<a class="btn btn-xs btn-primary edit-menu" menu-id="'+menu.id+'" href="javascript:;">编辑</a> ';
            html += '<a class="btn btn-xs btn-danger del-menu" menu-id="'+menu.id+'" href="javascript:;">删除</a>';
            html += '</div>';
            html += '<span data-toggle="tooltip" data-placement="top" title="'+menu.name+'">'+menu.name.substr(0,10)+'</span>';
            html += '</div>';
        return html;
    };

    function bindNewMenu(parentElement,parentId){

        parent_id = ( parentId ? parentId : "0");
        $(parentElement).find(".new-btn").html( parent_id == "0" ? "添加一级菜单" : "添加二级菜单").attr({
            "disabled":false,
            "p-id":parent_id
        });
        $(parentElement).find(".new-btn").unbind().bind("click",function(){
            renderMenuForm($(this).attr("p-id"),"new");
        });
    };

    /**
     *
     * @param parentId "new","updata"
     * @param type  "new","updata"
     * @param data  "updata"
     */
    function  renderMenuForm(parent_id,type,data){
        var menu_level;
        var dataName = {"label":"菜单名称","name":"name"};
        var menuBody = {"label":"跳转链接","name":"url"};
        if(type == "new"){
            menu_level = ( parent_id == "0" ? "1" : "2" );
        }
        if(type=="updata"){
            menu_level = data.menu_level;
            dataName.value = data.name;
            switch (data.type){
                case "click": menuBody.label = "关键字";menuBody.name="key"; menuBody.value = data.key; break;
                case "view" : menuBody.label = "跳转链接"; menuBody.value = data.url; break;
                case "sub_button" : menuBody.label = null;  break;
                default : break;
            };
        }

        if(!menu_level) return;

        var title_str_1 = ("new" == type ? "新增": "修改");
        var title_str_2 = ("0" == parent_id?"一级菜单": "二级菜单");

        $("#menuModal").modal("show").find("#modalTitle").html(title_str_1+title_str_2);

        var html  = '<form class="form-horizontal" id="menuOptionForm">';
        if(data && data.id)
            html += '<input type="hidden" name="id" value="'+data.id+'"';
            html += '<input type="hidden" name="parent_id" value="'+parent_id+'">';
            html += '<input type="hidden" name="menu_level" value="'+menu_level+'">';
            html += getMenuInput(dataName);
            html += '<div class="form-group" id="typeSelectGroup">';
            html += '<label class="col-sm-3 control-label">菜单类型:</label>';
            html += getTypeSelect(menu_level,(data ? data.type : null));
            html += '</div>';
            html += '<div class="menu-body-box" id="menuBoxBody">';
        if(menuBody.label){
            html += getMenuInput(menuBody);
        }
            html += '</div>';
            html += '<div class="form-group">';
            html += '<div class="submit-area">';
            html += '<button type="submit" class="btn btn-info">确认提交</button>';
            html += '</div></div>';
            html += '</form>';
        $("#optionBody").html(html);
        submitForm(type);
        bindMenuBoxBody();
    };

    function  getMenuInput(group){
        var html = '<div class="form-group">';
            html += '<label class="col-sm-3 control-label" for="'+group.name+'Input">'+group.label+':</label>';
            html += '<div class="col-sm-9">';
            html += '<input type="text" name="'+group.name+'" class="form-control" id="'+group.name+'Input" value="'+( group.value ? group.value : "" )+'" required>';
            html += '</div></div>';
        return html;
    };

    function getTypeSelect(menu_level,checked_value){

        var list = [
            {"label":"回复消息","value":"click"},
            {"label":"跳转网页","value":"view"}
        ];
        if(menu_level == "1"){
            list.push({"label":"展开子菜单","value":"sub_button"});
        }

        if(checked_value){
            for(var i=0; i<list.length; i++){
                if(list[i].value == checked_value)
                    list[i].checked = true;
            }
        }else {
            list[1].checked = true;
        }

        var html  = '';
        $.each(list,function(index,sel){
            html += '<div class="col-sm-3 menu-type">';
            html += '<label class="radio-inline">';
            html += '<input type="radio" name="type" value="'+sel.value+'" '+(sel.checked ? "checked" : "")+' required> '+sel.label+'</label>';
            html += '</div>';
        });
        return html;
    };

    function bindMenuBoxBody(){
        $("#typeSelectGroup").find("input[type='radio']").on("change", function () {
            // var value = $(this).val();
            var value = $('#typeSelectGroup input[type=radio][name=type]:checked').val();
            var html = '';
            switch (value){
                case "click":
                    html = getMenuInput({"label":"关键字","name":"key"});break;
                case "view":
                    html = getMenuInput({"label":"跳转链接","name":"url"});break;
                default : break;//contain sub_button
            };
            $("#menuBoxBody").html(html);
        });
    };

    function reloadMenu(){
        initMenuBox();
        api.getMenu().then(function (resp) {
            if(resp.status == 200){
                menuList = resp.data;
                renderMenu();
            }
        });

    };

    function submitForm(type){
        var formId = "#menuOptionForm";
        $(formId).ajaxForm(function () {
            var data = $(formId).serialize();
            if(type == "new"){
                api.submitNewMenu(data).then(function (resp) {
                    $("#menuModal").modal("hide");
                    if(resp.status == 200) {
                        alert("创建成功");
                        reloadMenu();
                    }else{
                        if(resp.status == 400){
                            alert("一级菜单名称不能超过4个字，二级菜单名称不能超过8个字")
                        }else {
                            alert("新增失败");
                        }
                    }
                });
            }
            if(type == "updata"){
                api.submitUpdataMenu(data).then(function (result) {
                    $("#menuModal").modal("hide");
                    if(result.status == 200){
                        alert("修改成功");
                        reloadMenu();
                    }else {
                        alert("操作失败");
                    }
                });
            }
        });
    };

    function  bindDelMenu(){
        var formId = "#menuBox";
        $(formId).find(".del-menu").unbind().bind("click", function () {
            if(!confirm("确认删除")) return;
            var delId = $(this).attr("menu-id");
            api.delMenu(delId).then(function (result) {
                if(result.status == 200){
                    alert("删除成功");
                    reloadMenu();
                }
            });
        });
    };

    function bindEditMenu(){
        var formId = "#menuBox";
        $(formId).find(".edit-menu").unbind().bind("click", function () {
            var editId = $(this).attr("menu-id");
            editMenu(editId);
        });
    };

    function  editMenu(menu_id){
        if(!menu_id) return;
        api.getOneMenu(menu_id).then(function (resp) {
            if(resp.status == 200){
                $("#menuModal").modal("show");
                renderMenuForm(resp.data.parent_id,"updata",resp.data);
            }
        });
    };

    return this;
});
