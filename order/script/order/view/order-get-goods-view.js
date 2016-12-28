function orderGoodsView(goodsList) {
    var $ = requirejs('jquery'),util = requirejs('util');


    var html = renderGoodsBox(goodsList);
    $('#orderGoodsInfoBox').html(html);
    
    
    function renderGoodsBox(goodsList) {
        var html = '<div class="info-head">商品清单</div>';
        html += '<div class="goods-info-box">';
        html += renderGoodsInfoTitle();
        html += renderGoodsList(goodsList);
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '';
        html += '</div>';
        return html;
    };
    
    function renderGoodsInfoTitle() {
        var title = '<ul class="goods-info-title">';
        title += '<li class="box-col box-big-row">商品名称</li>';
        title += '<li class="box-col">押金</li>';
        title += '<li class="box-col">租金总额</li>';
        title += '<li class="box-col">规格描述</li>';
        title += '<li class="box-col">数量</li>';
        title += '</ul>';
        return title;
    };

    function renderGoodsList(goods) {
        var html = '<ul class="goods-info-list">';
        if(goods && goods.length > 0){
            for(var i in goods){
                html += '<li>';
                html += '<div class="box-col box-big-row">';
                html += '<img class="goods-img" src="' + goods[i].goods_thumb + '" alt="商品图片">';
                html += '<div class="goods-name">' + goods[i].goods_name + '</div>';
                html += '</div>';
                html += '<div class="box-col">&yen;' + goods[i].goods_amount + '</div>';
                html += '<div class="box-col">&yen;' + goods[i].rent_amount + '</div>';
                html += '<div class="box-col">' + goods[i].spec_desc + '</div>';
                html += '<div class="box-col">&times;' + goods[i].goods_num + '</div>';
                html += '</li>';
            }
        }else {
            return;
        }
        html += '</ul>';

        return html;
    };


};
/**
 * Created by Administrator on 2016/5/27 0027.
 */
