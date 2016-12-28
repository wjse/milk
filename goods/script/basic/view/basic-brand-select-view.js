function basicBrandSelectView() {
    var $ = requirejs('jquery'),brandApi = requirejs('brandApi'),brandOption = '';

    initBrandSelect();


    function initBrandSelect() {
        var list = brandApi.list();
        brandOption += renderBrandSelect(list);
        $('#brandChooseSelect').html(brandOption);
    };

    function renderBrandSelect(brandList) {
        var html = '';

        if(brandList && brandList.length > 0){
            html += '<option value="" selected="selected" disabled="disabled">请选择品牌</option>';
            for(var i in brandList){
                html += '<option value="' + brandList[i].bid + '">' + brandList[i].brand_name + '</option>';
            }
        }
        return html;
    };
};
/**
 * Created by Administrator on 2016/5/15 0015.
 */
