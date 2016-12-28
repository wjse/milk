function modalView(title,category,callback) {

    var $ = requirejs('jquery'),util = requirejs('util');
    var initData = {
        cid : "",
        category_name : "",
        is_show : "1",
        on_nav : '1',
        sort : "0"
    };

    /**
     * init modal
     */
    initModal();
    modalEvent();

    function initModal() {
        if(category){
            initData = category;
        }
        $('#modalTitle').html(title);
        setModal();
    };
    
    function setModal() {
        $('#category_name').val(initData.category_name);
        $('#sort').val(initData.sort);
        $('input[name=is_show][value=' + initData.is_show + ']').prop('checked',true);
        $('input[name=on_nav][value=' + initData.on_nav + ']').prop('checked',true);
        $('.tips').addClass('hide').html('');
    };

    function modalEvent() {
        $('#confirmBtn').unbind().bind('click',function () {
            var data = verifyData();
            if(data){
                if(initData){
                    data.cid = initData.cid;
                }
            }
            callback.call(this,data);
            $('#modal').modal('hide');
        });
    };

    function verifyData() {
        var category_name = $('#category_name').val(),sort = $('#sort').val(),
            is_show = $('input[name=is_show]:checked').val(),on_nav = $('input[name=on_nav]:checked').val();

        if(util.isEmpty(category_name)){
            util.showErrorInfo('.category_name-error','品类名称不能为空！');
            return false;
        }
        if(util.isEmpty(sort)){
            util.showErrorInfo('.sort-error','品类排序不能为空！');
            return false;
        }
        if(isNaN(sort)){
            util.showErrorInfo('.sort-error','品类排序只能位数字！');
            return false;
        }

        var data = {
            category_name : category_name,
            sort : sort,
            is_show : is_show,
            on_nav : on_nav
        };

        return data;

    };


};
/**
 * Created by Administrator on 2016/5/6 0006.
 */
