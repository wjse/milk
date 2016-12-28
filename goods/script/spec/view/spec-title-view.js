function specTitleView() {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'), userToken = requirejs('userToken');

    var titleList = api.getTitleList();
    renderTitleContent(titleList);


    function renderTitleContent(titleList) {
        var html = '';
        if(!titleList){
            return;
        }
        for(var i in titleList){
            html += renderTitleRow(titleList[i]);
        }

        $('#titleContent').html(html);
    };

    // title add event
    $('#addTitleBtn').off().on('click',function () {
        var model = {};
        util.getScript('/spec/view/spec-add-model').then(function () {
            model = window.specAddModel('title');
        });

        util.getScript('/spec/view/spec-add-view').then(function () {
            window.specAddView(model,'title');
        });
    });

    //title modify event
    $('#titleContent .update').off().on('click',function (event) {
        event.stopPropagation();
        var title_id = $(this).attr('data-for');
        $(this).parent('.modify-box').addClass('hide').siblings('.save-box').removeClass('hide');

        changeToModifyStyle(title_id);
    });

    //title delete event
    $('#titleContent .delete').off().on('click',function (event) {
        event.stopPropagation();

        if (confirm('确认删除该规格标题？')) {
            var title_id = $(this).attr('data-for');
            var result = api.delTitle(title_id);
            if (result) {
                if (result.status == 200) {
                    window.location.reload();
                } else if (result.status == 401) {
                    alert('用户登录失效，请重新登录！');
                } else if (result.status == 503) {
                    alert('删除规格标题失败，失败状态：503，错误原因：' + result.err);
                } else {
                    alert('删除规格标题失败，失败状态：' + result.status + '，错误原因：' + result.msg);

                }
            } else {
                alert('服务器错误，返回undefined！');
            }
        }
    });
    //confirmModifyEvent
    $('#titleContent .confirm-modify-btn').off().on('click',function (event) {
        event.stopPropagation();

        var title_id = $(this).attr('data-for');
        var data = {
            title_id: title_id,
            title_name: $('#' + title_id + '_title_name_input').val(),
            title_code: $('#' + title_id + '_title_code_input').val()
        };
        if (util.isEmpty(data.title_name)) {
            alert('规格标题不能为空！');
            return;
        }
        if (util.isNotEmpty(data.title_code)) {
            if (!checkWord(data.title_code)) {
                alert('规格标题编码只能为小写字母或下划线！')
                return;
            }
        }
        updateTitleEvent(data);
    });

    //cancelModifyEvent
    $('#titleContent .cancel-modify-btn').off().on('click',function (event) {
        event.stopPropagation();

        var title_id = $(this).attr('data-for');
        $(this).parent('.save-box').addClass('hide').siblings('.modify-box').removeClass('hide');
        backToNormalStyle(title_id);
    });

    //spread event
    $('#titleContent .normal-title-li').off().on('dblclick',function (event) {
        event.preventDefault();
        $('#titleContent li').removeClass('selected-row');
        $(this).addClass('selected-row');

        var title_id = $(this).attr('data-for');
        $('#addOptionBtn').attr('data-for',title_id);
        $('#specOptionContent').html('');
        var optionList = api.getOptionList(title_id);

        util.getScript('/spec/view/spec-option-view').then(function () {
            window.specOptionView(optionList);
        });
    });
    
    function renderTitleRow(title) {
        var html = '<li class="normal-title-li" data-for="' + title.id + '">';
            html += '<div class="col-set">';
            html += '<span id="' + title.id + '_title_name_span">' + title.title_name + '</span>';
            html += '<input class="input-set hide" id="' + title.id + '_title_name_input" type="text" value="' + title.title_name + '">';
            html += '</div>';
            html += '<div class="col-set">';
            html += '<span id="' + title.id + '_title_code_span">' + (title.title_code ? title.title_code : '') + '</span>';
            html += '<input class="input-set hide" id="' + title.id + '_title_code_input" type="text" value="' + (title.title_code ? title.title_code : '') + '">';
            html += '</div>';
            html += '<div class="col-set big-col-set">';
            html += '<div class="modify-box">';
            html += '<span class="update" data-for="' + title.id + '">修改</span>';
            html += '<span class="delete" data-for="' + title.id + '">删除</span>';
            html += '</div>';
            html += '<div class="save-box hide">';
            html += '<div class="confirm-modify-btn" data-for="' + title.id + '">保存</div>';
            html += '<div class="cancel-modify-btn" data-for="' + title.id + '">取消</div>';
            html += '</div>';
            html += '</div>';
            html += '</li>';

        return html;
    };

    function changeToModifyStyle(title_id) {
        $('#' + title_id + '_title_name_span').addClass('hide');
        $('#' + title_id + '_title_name_input').removeClass('hide');
        $('#' + title_id + '_title_code_span').addClass('hide');
        $('#' + title_id + '_title_code_input').removeClass('hide');
    };

    function backToNormalStyle(title_id) {
        var title_name = $('#' + title_id + '_title_name_span').html();
        var title_code = $('#' + title_id + '_title_code_span').html();

        $('#' + title_id + '_title_name_span').removeClass('hide');
        $('#' + title_id + '_title_name_input').addClass('hide').val(title_name);
        $('#' + title_id + '_title_code_span').removeClass('hide');
        $('#' + title_id + '_title_code_input').addClass('hide').val(title_code);
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
    
    function updateTitleEvent(data) {
        var result = api.modifyTitle(data);
        if(result){
            if(result.status == 200){
                alert('修改规格标题成功!');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('修改规格标题失败，失败状态：503，错误原因：' + result.err);
            }else {
                alert('修改规格标题失败，失败状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回undefined！');
        }
    };


};
/**
 * Created by Administrator on 2016/6/2 0002.
 */
