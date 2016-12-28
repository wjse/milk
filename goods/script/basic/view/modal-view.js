function modalView(type,callback,updateData) {
    var $ = requirejs('jquery'), util = requirejs('util'),api = requirejs('api');
    var modalTitle = '', modalBody = '';
    var specList = api.getSpecList();

    // init modal event
    initModal();

    /**
     * init modal
     */

    function initModal() {
        var alreadyExistTitleArr = calculateAlreadyExistTitle();
        $('#specTitleChoose').html(renderSpecSelect(specList));
        if(updateData){
            $('#specCheckbox').html(renderSpecCheckbox(api.getSpecOption(updateData.title_id)));
        }
        if('specAdd' == type){
            $('#myModalLabel').html('创建规格模板');
            $('#specTitleChoose').attr('disabled',false);
            disabledAlreadyExistTitle(alreadyExistTitleArr);
            var title_id = $('#specTitleChoose').val();
            var titleName = $('#specTitleChoose option:selected').attr('data');
            var initSpecCheckbox = api.getSpecOption(title_id);
            $('#specCheckbox').html(renderSpecCheckbox(initSpecCheckbox));
            if('lease_year' == titleName){
                checkedAllYearInput();
            }

        }else if('specUpdate' == type){
            $('#myModalLabel').html('修改规格模板');
            $('#specTitleChoose').val(updateData.title_id);
            $('#specTitleChoose').attr('disabled',true);
            var options = updateData.option_id;
            for(var i in options){
                $('input[name=spec][value=' + options[i] + ']').prop('checked',true);
            }
        }
        titleChangeEvent();
        confirmEvent();
    };
    
    function confirmEvent() {
        $('#confirmBtn').unbind().bind('click',function () {
            var options = [];
            var title_id = $('#specTitleChoose').val();
            var title_code = $('#specTitleChoose option:selected').attr('data');
            var title_name = $('#specTitleChoose option:selected').text();
            var checkedArr = $('input[name=spec]:checked');
            for(var i = 0 ; i < checkedArr.length; i ++){
                var option = {
                    option_id : $(checkedArr[i]).val(),
                    option_name : $(checkedArr[i]).parent('label').text()
                }
                options.push(option);
            }
            if(options.length == 0){
                util.showErrorInfo('#modalAlertInfo','请选择规格值！');
                return;
            }
            var data = {
                id : title_id,
                title_code : title_code,
                title_name : title_name,
                options : options
            };
            $(this).unbind();
            $('#myModal').modal('hide');
            callback.call(this,data);
        });
    };

    /**
     * render modal
     */

    function renderSpecSelect(specArr) {
        var html = '';
        if(specArr && specArr.length > 0){
            for(var i in specArr){
                html += '<option value="' + specArr[i].id + '" data="' + specArr[i].title_code + '">' + specArr[i].title_name + '</option>';
            }
        }
        return html;
    };

    function renderSpecCheckbox(optionArr) {
        var html = '';
        if(optionArr && optionArr.length > 0){
            for(var i in optionArr){
                html += '<label class="checkbox-inline">';
                html += '<input type="checkbox" name="spec" value="' + optionArr[i].option_id + '">' + optionArr[i].option_name;
                html += '</label>';
            }
        }
        return html;
    };

    /**
     * select change event
     */
    function titleChangeEvent() {
        $('#specTitleChoose').change(function () {
            var title_id = $(this).val();
            var titleName = $('#specTitleChoose option:selected').attr('data');
            var chooseSpecOptions = api.getSpecOption(title_id);
            var option = renderSpecCheckbox(chooseSpecOptions);
            $('#specCheckbox').html(option);
            if('lease_year' == titleName){
               checkedAllYearInput();
            }
        });
    };

    /**
     * modal close event
     */

    $('#myModal').on('hide.bs.modal',function () {
        $('#myModalLabel').html('');
        $('#specTitleChoose').html('');
        $('#specCheckbox').html('');
        $('#modalAlertInfo').addClass('hide').html('');
    });

    function calculateAlreadyExistTitle() {
        var titles = [];
        var specListLiArr = $('#specListBox > li');
        if(specListLiArr && specListLiArr.length > 0){
            for(var i = 0 ; i < specListLiArr.length ; i++){
                var title_code = $(specListLiArr).eq(i).children('.spec-title-name').attr('data-code');
                titles.push(title_code);
            }
        }
        return titles;

    };
    
    function disabledAlreadyExistTitle(alreadyExistTitleArr) {
        if(alreadyExistTitleArr.length  == 0){
            return;
        }
        for(var i = 0 ; i < alreadyExistTitleArr.length; i++){
            $('#specTitleChoose option[data=' + alreadyExistTitleArr[i] + ']').attr('disabled',true);
        }
    };
    
    function checkedAllYearInput() {
        var specArr = $('#specCheckbox input[name=spec]');
        for(var i = 0 ; i <specArr.length; i++){
            $(specArr).eq(i).prop('checked',true);
        }
    };


};
/**
 * Created by Administrator on 2016/5/5 0005.
 */
