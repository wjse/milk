function basicCategoryTreeView(callback) {
    var $ = requirejs('jquery'),categoryApi = requirejs('categoryApi'),
        plugins = requirejs('plugins');

    initCategoryTree();

    function initCategoryTree() {
        var list = categoryApi.getTree();
        if(!list || list.length == 0){
            $('#multipleChooseBox').html('暂无数据或数据错误！');
            return;
        }
        rebuildTree(list);
        categoryApi.buildTree(list,'#multipleChooseBox',function (event) {
            var select = event.node;
            if(select.children.length > 0){
                alert("请选择最后一级元素！");
                return;
            }
            categoryTreeCallback(select);
        });
    };

    function rebuildTree(list) {
        for(var i in list){
            list[i].label = list[i].category_name;
            if(list[i].children.length > 0){
                rebuildTree(list[i].children);
            }
        }
    };

    function categoryTreeCallback(select) {
        $('#categoryId').val(select.cid);
        $('#categoryName').html(select.name);
        $('#multipleChooseBox').slideUp();
        callback.call(this,select.cid);
    };
};

function initTemplateSelect(templates) {
    var templateOption = renderTemplateSelect(templates);
    $('#templateSelect').html(templateOption);

};

function renderTemplateSelect(templates) {
    var html = '<option value="" selected="selected" disabled="disabled">选择已有商品型号</option>';
    if(!templates){
        return html;
    }
    var templateArr = templates.list;
    if(templateArr && templateArr.length > 0){
        for(var i in templateArr){
            html += '<option value="' + templateArr[i].goods_common_id + '">' + templateArr[i].gc_name + '</option>';
        }
    }
    return html;
};
/**
 * Created by Administrator on 2016/5/15 0015.
 */
