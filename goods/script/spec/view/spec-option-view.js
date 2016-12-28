function specOptionView(optionList) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'), userToken = requirejs('userToken');

    if($('#specOptionListBox').hasClass('hide')){
        $('#specOptionListBox').removeClass('hide');
    }

    renderOptionList(optionList);

    //add option event
    $('#addOptionBtn').off().on('click',function () {
        var title_id = $(this).attr('data-for');
        var model = {};
        util.getScript('/spec/view/spec-add-model').then(function () {
            model = window.specAddModel('option',title_id);
        });

        util.getScript('/spec/view/spec-add-view').then(function () {
            window.specAddView(model,'option');
        });

        // util.getScript('/spec/view/spec-option-add-view').then(function () {
        //     window.specOptionAddView(title_id);
        // });
    });

    function renderOptionList(optionList) {
        var html = '';
        if(!optionList){
            return;
        }
        for(var i in optionList){
            html += renderOptionRow(optionList[i]);
        }
        $('#specOptionContent').html(html);
    };

    //modify event
    $('#specOptionContent .update').off().on('click',function () {

        $(this).parent('.modify-box').addClass('hide')
               .siblings('.save-box').removeClass('hide');

        var option_id = $(this).attr('data-for');
        changeToModifyStyle(option_id);
    });

    //delete event
    $('#specOptionContent .delete').off().on('click',function () {
        if(confirm('确认删除该规格选项？')){
            var option_id = $(this).attr('data-for');
            var result  = api.delOption(option_id);
            if(result){
                if(result.status == 200){
                    window.location.reload();
                }else if(result.status == 401){
                    alert('用户登录失效，请重新登录！');
                }else if(result.status == 503){
                    alert('删除规格选项失败，失败状态：503，错误原因：' + result.err);
                }else {
                    alert('删除规格选项失败，失败状态：' + result.status + '，错误原因：' + result.msg);

                }
            }else {
                alert('服务器错误，返回undefined！');
            }
        }
    });

    //confirmModifyEvent
    $('#specOptionContent .confirm-modify-btn').off().on('click',function () {
        var option_id = $(this).attr('data-for');
        var title_id = $(this).attr('data-title');
        var data = {
            title_id : title_id,
            option_id : option_id,
            option_name : $('#' + option_id + '_option_name_input').val(),
            option_value : $('#' + option_id + '_option_value_input').val(),
            param_1 : parseFloat($('#' + option_id + '_option_param1_input').val())
        };

        if(util.isEmpty(data.option_name)){
            alert('规格选项名称不能为空！');
            return;
        }
        updateEvent(data);

    });

    //cancelModifyEvent
    $('#specOptionContent .cancel-modify-btn').off().on('click',function () {
        var option_id = $(this).attr('data-for');
        $(this).parent('.save-box').addClass('hide').siblings('.modify-box').removeClass('hide');
        backToNormalStyle(option_id);
    });


    function renderOptionRow(option) {
        var html = '<li>';
            html += '<div class="col-set">';
            html += '<span id="' + option.option_id + '_option_name_span">' + option.option_name + '</span>';
            html += '<input class="input-set hide" id="' + option.option_id + '_option_name_input" type="text" value="' + option.option_name + '">';
            html += '</div>';
            html += '<div class="col-set">';
            html += '<span id="' + option.option_id + '_option_value_span">' + (option.option_value ? option.option_value : '') + '</span>';
            html += '<input class="input-set hide" id="' + option.option_id + '_option_value_input" type="text" value="' + (option.option_value ? option.option_value : '') + '">';
            html += '</div>';
            html += '<div class="col-set">';
            html += '<span id="' + option.option_id + '_option_param1_span">' + (option.param_1 ? option.param_1 : '') + '</span>';
            html += '<input class="input-set hide" id="' + option.option_id + '_option_param1_input" type="text" value="' + (option.param_1 ? option.param_1 : '') + '">';
            html += '</div>';
            html += '<div class="col-set big-col-set">';
            html += '<div class="modify-box">';
            html += '<span class="update" data-type="option" data-for="' + option.option_id + '">修改</span>';
            html += '<span class="delete" data-type="option" data-for="' + option.option_id + '">删除</span>';
            html += '</div>';
            html += '<div class="save-box hide">';
            html += '<div class="confirm-modify-btn" data-type="option" data-for="' + option.option_id + '" data-title="' + option.title_id + '">保存</div>';
            html += '<div class="cancel-modify-btn" data-type="option" data-for="' + option.option_id + '">取消</div>';
            html += '</div>';
            html += '</div>';
            html += '</li>';

        return html;

    };
    
    function changeToModifyStyle(option_id) {
        $('#' + option_id + '_option_name_span').addClass('hide');
        $('#' + option_id + '_option_name_input').removeClass('hide');
        $('#' + option_id + '_option_value_span').addClass('hide');
        $('#' + option_id + '_option_value_input').removeClass('hide');
        $('#' + option_id + '_option_param1_span').addClass('hide');
        $('#' + option_id + '_option_param1_input').removeClass('hide');
    };

    function backToNormalStyle(option_id) {
        var option_name = $('#' + option_id + '_option_name_span').html();
        var option_value = $('#' + option_id + '_option_value_span').html();
        var param_1 = $('#' + option_id + '_option_param1_span').html();

        $('#' + option_id + '_option_name_span').removeClass('hide');
        $('#' + option_id + '_option_name_input').addClass('hide').val(option_name);
        $('#' + option_id + '_option_value_span').removeClass('hide');
        $('#' + option_id + '_option_value_input').addClass('hide').val(option_value);
        $('#' + option_id + '_option_param1_span').removeClass('hide');
        $('#' + option_id + '_option_param1_input').addClass('hide').val(param_1);
    };
    
    function updateEvent(data) {
        var result = api.modifyOption(data);
        if(result){
            if(result.status == 200){
                alert('修改规格选项成功!');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('修改规格选项失败，失败状态：503，错误原因：' + result.err);
            }else {
                alert('修改规格选项失败，失败状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回undefined！');
        }
    };
}
/**
 * Created by Administrator on 2016/6/2 0002.
 */
