function specAddView(model,type) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'), userToken = requirejs('userToken'),
        addLiHtml = '',addLi;

    if('option' == type){
        addLi = $('#specOptionContent').find('.add-option-li');
        if(addLi.length == 0){
            addLiHtml = renderAddHtml(model);
            $('#specOptionContent').append(addLiHtml);
        }
    }else if('title' == type){
        addLi = $('#specOptionContent').find('.add-option-li');
        if(addLi.length == 0){
            addLiHtml = renderAddHtml(model);
            $('#titleContent').append(addLiHtml);
        }
    }

// confirm add title event
    $('#titleConfirmSaveBtn').off().on('click',function () {
        var data = {
            title_name : $('#title_name').val(),
            title_code : $('#title_code').val(),
        };

        if(util.isEmpty(data.title_name)){
            alert('规格选项名称不能为空！');
            return;
        }
        if(util.isNotEmpty(data.title_code)){
            if(!checkWord(data.title_code)){
                alert('规格标题编码只能为小写字母或下划线！')
                return;
            }
        }
        titleAddEvent(data);
    });

    // cancle add title event
    $('#titleCancelSaveBtn').off().on('click',function () {
        $('#titleContent .add-title-li').remove();
    });

    // confirm add option event
    $('#optionConfirmSaveBtn').off().on('click',function () {
        var title_id = $(this).attr('data-title');
        var data = {
            title_id : title_id,
            option_name : $('#option_name').val(),
            option_value : $('#option_value').val(),
            param_1 : $('#param_1').val(),
        };

        if(util.isEmpty(data.option_name)){
            alert('规格选项名称不能为空！');
            return;
        }
        optionAddEvent(data);
    });

    // cancle add option event
    $('#optionCancelSaveBtn').off().on('click',function () {
        $('#specOptionContent .add-option-li').remove();
    });


    function renderAddHtml(model) {
        var addItem = model.addItem;
        var html = '<li class="' + model.liClass + '">';
        for(var i in addItem){
            html += '<div class="col-set">';
            html += '<input class="input-set" type="text" id="' + addItem[i] + '" maxlength="10">';
            html += '</div>';
        }
        html += '<div class="col-set big-col-set">';
        html += '<div class="confirm-btn" id="' + model.saveBtn + '" data-title="' + model.title_id + '">保存</div>';
        html += '<div class="cancel-btn" id="' + model.cancelBtn + '">取消</div>';
        html += '</div>';
        html += '</li>';

        return html;
    };

    function titleAddEvent(data) {
        var result = api.addTitle(data);
        if(result){
            if(result.status == 200){
                alert('规格标题添加成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('规格标题添加失败，错误状态：' + result.status + '，错误原因：' + result.err);
            }else {
                alert('规格标题添加失败，错误状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为undefined！');
        }
    };

    function checkWord(s){
        var patrn = new RegExp("^[a-z_]+$");
        if(!patrn.exec(s))
        {
            return false;
        }else{
            return true;
        }
    };

    function optionAddEvent(data) {
        var result = api.addOption(data);
        if(result){
            if(result.status == 200){
                alert('规格选项添加成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('规格选项添加失败，错误状态：' + result.status + '，错误原因：' + result.err);
            }else {
                alert('规格选项添加失败，错误状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为undefined！');
        }

    };

};
/**
 * Created by Administrator on 2016/6/3 0003.
 */
