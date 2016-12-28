function basicDataVerify(callback) {
    var $ = requirejs('jquery'),util = requirejs('util');

    var data = {
        category_id : $('#categoryId').val(),
        brand_id : $('#brandChooseSelect').val(),
        gc_name : $('#gc_name').val(),
        gc_desc : $('#gc_desc').val(),
        display_price : $('#display_price').val(),
        gc_sort : $('#gc_sort').val(),
        gc_thumb : $('#gc_thumb').attr('src'),
        detail_img : buildDetailImgData(),
        common_body : buildCommonBodyData()
    };

    var verifyResult = verifyData(data);
    if(verifyResult){
        var goods_common_id = $('#templateSelect').val();
        if(util.isEmpty(goods_common_id)){
            callback.call(this,verifyResult);
        }else {
            verifyResult.goods_common_id = goods_common_id;
            callback.call(this,verifyResult);
        }
    }

    function buildDetailImgData() {
        var detail_img = [];
        var detailArrObj =  $('.goods-preview-img');
        if(detailArrObj && detailArrObj.length > 0){
            for (var i = 0; i < detailArrObj.length; i++){
                var img = {
                    img_url : $(detailArrObj).eq(i).children('img').attr('src')
                }
                detail_img.push(img);
            }
        }
        return detail_img;
    };
    
    function buildCommonBodyData() {
        var imgArrObj = $('#common_body img');
        var divIsExist = $('#common_body div');
        var brIsExist = $('#common_body br');
        var html = '';
        if(divIsExist.length > 0 || brIsExist.length > 0){
            if(imgArrObj){
                for(var i = 0 ; i < imgArrObj.length ; i ++){
                    var path = $(imgArrObj).eq(i).attr('src');
                    html += '<img src="' + path + '">';
                }
            }
        }else {
            html += $('#common_body').html();
        }

        return html;
    };

    function verifyData(data) {
        if(util.isEmpty(data.category_id)){
            util.showErrorInfo('#templateAlertInfo','品类不能为空！');
            return false;
        }
        if(util.isEmpty(data.brand_id)){
            util.showErrorInfo('#templateAlertInfo','商品品牌不能为空！');
            return false;
        }
        if(util.isEmpty(data.gc_name)){
            util.showErrorInfo('#templateAlertInfo','型号名称不能为空！');
            return false;
        }
        if(util.isEmpty(data.display_price)){
            util.showErrorInfo('#templateAlertInfo','展示价格不能为空！');
            return false;
        }
        if(util.isNotEmpty(data.gc_sort) && isNaN(data.gc_sort)){
            util.showErrorInfo('#templateAlertInfo','型号排序不能为非数字！');
            return false;
        }


        return data;
    };
};
/**
 * Created by Administrator on 2016/5/15 0015.
 */
