function formView (data,callback) {//depend on jqeury,jquery.form

    renderForm();
    submitForm();

    function renderForm(){

        var html = '<form id="'+data.formId+'">';

        $.each(data.groupList, function (index,value) {
           html += getGroup(value);
        });

        html+= getCustom();

        html+= '<p class="form-opt-area" id="formOpt"><button type="submit" class="btn btn-info" id="confirmForm">提交</button></p>';

        html+= '</form>';

        $(data.container).html(html);

        switchType();

        EvaluateForm();
    };

    function switchType(){

        $("select").on("change", function () {

            var value = $(this).val();

            var isFullText = (2 == value);

            $(".fulltext").attr({
                "disabled":isFullText,
                "required": !isFullText
            });
        });
    };

    function submitForm(){
        $("#"+data.formId).ajaxForm(function () {
            checkForm(data.formId);
        });
    };

    function checkForm(formId){

        $("#warnInfo").html("").addClass("hide");

        var inputList = $("#"+formId).find("input");
        for(var i=0;i<inputList.length;i++){
            $(inputList[i]).closest(".form-group").removeClass("has-error");
        }

        if( $("input[type='tel']").length > 0 && isNotMobile($("input[type='tel']").val())) {
            $("input[type='tel']").focus().closest(".form-group").addClass("has-error");
            $("#warnInfo").removeClass("hide").html("手机号码输入有误");
            return;
        }

        var datas = $("#"+formId).serialize();

        callback.call(this,datas);
    };

    function getGroup(group){
        var html = '';
        var inputType = group.type;
        if(!inputType) return;

        switch (inputType){
            case "text":
                html = getTextInput(group);
                break;
            case "tel":
                html = getTextInput(group);
                break;
            case "number":
                html = getTextInput(group);
                break;
            case "select":
                html = getSelectInput(group);
                break;
            case "textarea":
                html = getTextAreaInput(group);
                break;
            default : break;
        };

        return html;
    };

    function getCustom(){
        var html = '<p id="warnInfo" class="warn-info"></p>';
        if(data.custom){
            html = '';
        }
        return html;
    };

    function getTextInput(group){

        var html = '<div class="form-group">';
            html+= '<label for="Input'+group.name+'">'+group.label+'</label>';
            html+= '<input '+ ( group.required ? "required" : "") +' type="'+group.type+'" class="form-control ';
            if(group.klass) html += group.klass;
            html+= '" maxlength="'+group.maxlength+'" id="Input'+group.name+'" name="'+group.name+'" placeholder="'+group.placeholder+'">';
            html+= '</div>';

        return html;
    };

    function getSelectInput(group){

        if(!group.options) return;
        var html = '<div class="form-group">';
            html+= '<label>'+group.label+'</label>';
            html+= '<select value="'+group.default+'" class="form-control ';
            if(group.klass) html += group.klass;
            html+= '" required name="'+group.name+'">';

        $.each(group.options, function (name, value) {
            html+= '<option value="'+value.value+'">'+value.name+'</option>';
        });

        html+= '</select></div>';

        return html;
    };

    function getTextAreaInput(group){

        var html = '<div class="form-group">';
        html+= '<label>'+group.label+'</label>';
        html+= '<textarea class="form-control ';
        if(group.klass) html += group.klass;
        html+= '" rows="'+group.row+'" name="'+group.name+'" required placeholder="'+group.placeholder+'" maxlength="'+group.maxlength+'"></textarea>';
        html+= '</div>';

        return html;

    };

    function EvaluateForm() {

        if(!data.editRecord) return;

        var editRecord = data.editRecord;
        var curForm = "#" + data.formId;

        var inputList = $(curForm).find("input");
        EvaluateFormGroup(inputList,editRecord);

        var textAreaList = $(curForm).find("textarea");
        EvaluateFormGroup(textAreaList,editRecord);

        var selectList = $(curForm).find("select");
        EvaluateFormGroup(selectList,editRecord);

        $(".readonly").attr("readonly",true);

        var value = $("select").val();
        if("2" == value){
            $(".fulltext").attr({
                "disabled":true,
                "required":false
            });
        }

    };

    function EvaluateFormGroup(list,editRecord){
        for(var j=0; j<list.length; j++){
            var textareaName = $(list[j]).attr("name");
            $(list[j]).val(editRecord[textareaName]);
        }
    };

    function isNotMobile(str){
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return !reg.test(str);
    };
};