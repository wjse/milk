function basicSpecView(spec_tpl) {
    var $ = requirejs('jquery'),util = requirejs('util');

    var html = '';
    if(spec_tpl && spec_tpl.length > 0){
        for(var i in spec_tpl){
            html += renderSpecListLi(spec_tpl[i]);
        }
    }

    return html;
};

function renderSpecListLi(spec) {
    var html = '';
        html += '<li>';
        html += '<span class="spec-title-name" data="' + spec.id + '" data-code="' + spec.title_code + '">' + spec.title_name + '：</span>';
        html += specOptionsHtml(spec.options);
        html += '<span class="glyphicon glyphicon-edit spec-edit"></span>';
        html += '<span class="glyphicon glyphicon-trash spec-delete"></span>';
        html += '</li>';

    return html;
};

function specOptionsHtml(options) {
    var option = '';
    if(options && options.length > 0){
        for(var i in options){
            option += '<span class="spec-option" data="' + options[i].option_id + '">' + options[i].option_name + '</span>';
            if(i != options.length - 1){
                option += '<span>、</span>';
            }
        }
    }
    return option;
};

function buildSpecOptionData(optionArr) {
    var option_id = [];
    if(optionArr && optionArr.length > 0){
        for(var i = 0 ; i < optionArr.length; i ++){
            var singleOptionId = $(optionArr).eq(i).attr('data');
            option_id.push(parseInt(singleOptionId));
        }
    }
    return option_id;
};

function appendSpecLi(spec) {
    var $ = requirejs('jquery');
    var specLiHtml = renderSpecListLi(spec);
    $('#specListBox').append(specLiHtml);
    updateSpec();
    deleteSpec();

};

function updateSpec() {
    var $ = requirejs('jquery'),util = requirejs('util');
    $('.spec-edit').off().on('click',function () {
        var parentLi = $(this).parent('li');
        var specOptions = $(this).siblings('.spec-option');
        var updateData = {
            title_id : $(this).siblings('.spec-title-name').attr('data'),
            option_id : buildSpecOptionData(specOptions)
        };
        $('#myModal').modal('show');
        util.getScript('/basic/view/modal-view').then(function () {
            window.modalView('specUpdate',function (spec) {
                $(parentLi).remove();
                appendSpecLi(spec);
            },updateData);
        });
    });
};

function deleteSpec() {
    var $ = requirejs('jquery'),util = requirejs('util');
    $('.spec-delete').off().on('click',function () {
        $(this).parent('li').remove();
    });
};

function calculateTitleIsExist(title) {
    var result = false;
    var specListLiArr = $('#specListBox > li');
    if(specListLiArr && specListLiArr.length > 0){
        for(var i = 0 ; i < specListLiArr.length ; i++){
            var title_code = $(specListLiArr).eq(i).children('.spec-title-name').attr('data-code');
            if(title_code == title){
                $(specListLiArr).eq(i).children('.spec-title-name').nextAll('span').remove();
                result = true;
            }
        }
    }
    return result;
};


/**
 * Created by Administrator on 2016/5/15 0015.
 */
